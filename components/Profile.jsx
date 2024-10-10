import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import SocialLinks from "./SocMedia";
import ResumeUpload from "./Resume";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [userInfo, setUserInfo] = useState({ infoAboutMe: "", resume: null });
  const [isEditing, setIsEditing] = useState(false);
  const [hasInfo, setHasInfo] = useState(false);
  const [socialLinks, setSocialLinks] = useState([""]); // Додано для соціальних мереж

  useEffect(() => {
    if (data.length > 0 && data[0].infoAboutMe) {
      setUserInfo({ infoAboutMe: data[0].infoAboutMe });
      setHasInfo(true);
    }
  }, [data]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle resume upload (you'll need to implement the backend logic for this)
    const formData = new FormData();
    formData.append("infoAboutMe", userInfo.infoAboutMe);
    if (userInfo.resume) {
      formData.append("resume", userInfo.resume); // Додаємо резюме
    }

    const userId = data.length > 0 ? data[0]._id : null;

    try {
      const response = await fetch("/api/prompt/aboutme", {
        method: hasInfo ? "PUT" : "POST",
        body: formData, // Зміна на FormData
      });

      if (!response.ok) {
        throw new Error(`Failed to ${hasInfo ? "update" : "create"} user info`);
      }

      const result = await response.json();
      console.log(result.message);

      setIsEditing(false);
      setHasInfo(true);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleFileChange = (e) => {
    setUserInfo({ ...userInfo, resume: e.target.files[0] }); // Зберігаємо файл резюме
  };

  const handleSocialLinkChange = (index, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = value;
    setSocialLinks(updatedLinks);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, ""]); // Додаємо новий порожній рядок для соціального посилання
  };

  return (
    <section className='w-full flex'>
      <div className='w-3/4 p-4'>
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{name} Profile</span>
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


          {isEditing ? (
            <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
          ) : (
            <button type="button" onClick={handleEditToggle} className="btn-dz">Edit</button>
          )}
        </form>

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
