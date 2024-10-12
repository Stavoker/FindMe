// components/SocialLinks.js
'use client';

import { useState } from 'react';

const UserSocMedia = () => {
    const [socialLinks, setSocialLinks] = useState([]); // Ініціалізуємо з порожнім масивом

    const handleSocialLinkChange = (index, value) => {
        const updatedLinks = [...socialLinks];
        updatedLinks[index] = value;
        setSocialLinks(updatedLinks);
    };

    const addSocialLink = () => {
        setSocialLinks([...socialLinks, ""]); // Додаємо нове пусте посилання
    };

    return (
        <div className='w-1/2 p-4 border rounded bg-gray-50'>
            <h2 className='font-satoshi font-semibold text-lg'>Social Media</h2>

            {socialLinks.map((link, index) => (
                <div key={index} className='flex items-center justify-between mt-2'>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                        placeholder={`Social Link ${index + 1}`} // Placeholder для кращого UX
                        className='flex-1 border border-gray-300 p-2 rounded'
                    />
                
                </div>
            ))}

            {/* Кнопка для додавання нового соціального посилання */}
            <div
                onClick={addSocialLink}
                className='flex items-center justify-center border-dashed border-gray-400 cursor-pointer mt-2'
                style={{
                    width: "100%", // Розмір блоку
                    height: "50px", // Висота блоку
                }}
            >
                
            </div>
        </div>
    );
};

export default UserSocMedia; // Переконайтесь, що експортовано за замовчуванням
