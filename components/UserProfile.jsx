import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import UserSocMedia from "./UserSocMedia";
import UserResume from "./UserResume";

const UserProfile = ({ userId, desc, data }) => {
    const [userInfo, setUserInfo] = useState("");
    const [resumes, setResumes] = useState([""]);
    const [socialLinks, setSocialLinks] = useState([""]); // Соцмережі
    const [isLoading, setIsLoading] = useState(false);

    // Отримання даних про користувача
    const fetchUser = async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}/mongo`);
            const userData = await response.json();
            setUserInfo(userData.AboutMe || "");
            setSocialLinks(userData.SocialLinks);
            setResumes(userData.Resumes);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
            setIsLoading(false);
        }
    }, [userId]);

    if (isLoading) {
        return <p>Loading user profile...</p>;
    }

    return (
        <section className='w-full flex'>
            <div className='w-3/4 p-4'>
                <h1 className='head_text text-left'>
                    <span className='blue_gradient'>Profile</span>
                </h1>
                <p className='desc text-left mb-[4%]'>{desc}</p>

                {userInfo.length > 0 && (
                <label>
                    <textarea
                        value={userInfo}
                        placeholder="What a miracle it is to be able to recognize yourself. Share your testimony, treasures, and whatever motivates you!"
                        required
                        className='form_aboutme'
                        readOnly={true}
                    />
                </label>)}

                {/* Social Links and Resume Upload Section */}
                <div className='flex mt-4 space-x-4'>
                    {socialLinks.length > 0 && (
                        <UserSocMedia
                            links={socialLinks}
                        />
                    )}
                    {/* Resume Upload */}
                    {resumes.length > 0 && (
                        <UserResume
                            resumes={resumes}
                        />
                    )}
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