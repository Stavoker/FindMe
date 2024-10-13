'use client';

import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";

const SocialLinks = () => {
    const [socialLinks, setSocialLinks] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                try {
                    const response = await fetch(`/api/users/${user.id}/mongo`);
                    const userData = await response.json();
                    setSocialLinks(userData.SocialLinks || []);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUser().then(r => console.log(r));
    }, [user]);

    const handleSocialLinkChange = async (index, value) => {
        const updatedLinks = [...socialLinks];
        updatedLinks[index] = value;
        setSocialLinks(updatedLinks);

        try {
            const response = await fetch(`/api/users/${user.id}/social_links/${index}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newLink: value }),
            });

            if (!response.ok) {
                console.error('Failed to update social link');
            }
        } catch (error) {
            console.error("Error updating social link:", error);
        }

    };

    const addSocialLink = async () => {
        const newLink = "";
        setSocialLinks([...socialLinks, newLink]);
        try {
            const response = await fetch(`/api/users/${user.id}/social_links`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newLink }),
            });

            if (!response.ok) {
                console.error('Failed to add social link');
            }
        } catch (error) {
            console.error("Error adding social link:", error);
        }
    };

    const deleteSocialLink = async (index) => {
        setSocialLinks(socialLinks.filter((_, i) => i !== index));
        try {
            const response = await fetch(`/api/users/${user.id}/social_links/${index}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                console.error('Failed to delete social link');
            }
        } catch (error) {
            console.error("Error deleting social link:", error);
        }
    }

    return (
        <div className='w-1/2 p-4 border rounded bg-gray-50'>
            <h2 className='font-satoshi font-semibold text-lg'>Social Links</h2>

            {socialLinks.map((link, index) => (
                <div key={index} className='flex items-center justify-between mt-2'>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                        placeholder={`Social Link ${index + 1}`} 
                        className='flex-1 border border-gray-300 p-2 rounded'
                    />
                    <button
                        onClick={() => deleteSocialLink(index)}
                        className='ml-2 text-red-500 hover:underline'
                    >
                        Delete
                    </button>
                </div>
            ))}

            {/* Кнопка для додавання нового соціального посилання */}
            <div
                onClick={addSocialLink}
                className='flex items-center justify-center border-dashed border-gray-400 cursor-pointer mt-2'
                style={{
                    width: "100%",
                    height: "50px", 
                }}
            >
                <span className="text-gray-500 text-1xl">+ Social Media</span>
            </div>
        </div>
    );
};

export default SocialLinks; 
