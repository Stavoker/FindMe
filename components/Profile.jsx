import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import PromptCard from "./PromptCard";
import SocialLinks from "./SocMedia";
import ResumeUpload from "./Resume";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [userInfo, setUserInfo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/users/${user.id}/mongo`);
          const userData = await response.json();
          setUserInfo(userData.AboutMe || ""); // Handle case where AboutMe may be undefined
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUser().then(r => console.log(r));
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}/mongo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ AboutMe: userInfo }),
      });

      if (!response.ok) {
        console.error('Network response was not ok');
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
      <section className='w-full flex'>
        <div className='w-3/4 p-4'>
          <h1 className='head_text text-left'>
            <span className='blue_gradient'>{name} Profile</span>
          </h1>
          <p className='desc text-left mb-[4%]'>{desc}</p>

          <div>
            <label>
            <textarea
                value={userInfo}
                onChange={(e) => setUserInfo(e.target.value)}
                placeholder="What a miracle it is to be able to recognize yourself. Share your testimony, treasures, and whatever motivates you!"
                required
                className='form_aboutme'
                readOnly={!isEditing}
            />
            </label>

            {isEditing ? (
                <button type="button" onClick={handleSubmit} className="btn-dz">Submit</button>
            ) : (
                <button type="button" onClick={handleEditToggle} className="btn-dz">Edit</button>
            )}
          </div>

          {/* Social Links and Resume Upload Section */}
          <div className='flex mt-4 space-x-4'>
            <SocialLinks />
            {/* Resume Upload */}
            <ResumeUpload />
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

export default Profile;
