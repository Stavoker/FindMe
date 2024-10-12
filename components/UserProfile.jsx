import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PromptCard from "./PromptCard";
import UserSocMedia from "./UserSocMedia";
import UserResume from "./UserResume";

const UserProfile = ({ userId }) => {
    const [userInfo, setUserInfo] = useState({ infoAboutMe: "", resume: null });
    const [socialLinks, setSocialLinks] = useState([""]); // Соцмережі
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]); // Пост користувача (промпти)
    const [isEditing, setIsEditing] = useState(false);
    const [hasInfo, setHasInfo] = useState(false); // Чи є інформація про користувача
    const router = useRouter();

    // Отримання даних про користувача
    const fetchUser = async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}`);
            const userData = await response.json();
            setUserInfo(userData);
            setSocialLinks(userData.socialLinks || [""]); // Додаємо соцмережі
            setPosts(userData.posts || []); // Додаємо пости
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId]);

    // Обробка редагування інформації
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("infoAboutMe", userInfo.infoAboutMe);
        if (userInfo.resume) {
            formData.append("resume", userInfo.resume);
        }

        try {
            const response = await fetch("/api/prompt/aboutme", {
                method: hasInfo ? "PUT" : "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to ${hasInfo ? "update" : "create"} user info`);
            }

            setIsEditing(false);
            setHasInfo(true);
        } catch (error) {
            console.error("Error updating user info:", error);
        }
    };

    const handleFileChange = (e) => {
        setUserInfo({ ...userInfo, resume: e.target.files[0] });
    };

    const handleSocialLinkChange = (index, value) => {
        const updatedLinks = [...socialLinks];
        updatedLinks[index] = value;
        setSocialLinks(updatedLinks);
    };

    const addSocialLink = () => {
        setSocialLinks([...socialLinks, ""]);
    };

    if (isLoading) {
        return <p>Loading user profile...</p>;
    }

    if (!userInfo) {
        return <p>User not found</p>;
    }

   
  return (
        <section className='w-full flex'>
            <div className='w-3/4 p-4'>
                <h1 className='head_text text-left'>
                    <span className='blue_gradient'>{userId} Profile</span>
                </h1>
                <p className='desc text-left mb-[4%]'>{desc}</p>

                <form onSubmit={handleSubmit}>
                    <label>

                        <textarea
                            value={userInfo.infoAboutMe}
                            onChange={(e) => setUserInfo({ ...userInfo, infoAboutMe: e.target.value })}
                            placeholder="What a miracle it is to be able to recognize yourself. Share your testimony, treasures, and whatever motivates you!"
                            required
                            className='form_aboutme'
                            readOnly={!isEditing}
                        />
                    </label>
                </form>

                {/* Social Links and Resume Upload Section */}
                <div className='flex mt-4 space-x-4'>

                    <UserSocMedia />

                    {/* Resume Upload */}
                    <UserResume />
                </div>



                <div className='mt-10 prompt_layout'>
                    {data.map((post) => (
                        <PromptCard
                            key={post._id}
                            post={post}
                            handleEdit={() => handleEdit && handleEdit(post)}
                            handleDelete={() => handleDelete && handleDelete(post)}
                        />
                    ))}
                </div>
            </div>


        </section>

    );
};

export default UserProfile;
