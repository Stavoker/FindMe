// components/ResumeUpload.js
'use client';

import { useState } from 'react';

const UserResume = () => {
    const [resumes, setResumes] = useState([]); // Store multiple resumes

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newResume = {
                url: URL.createObjectURL(file),
                name: file.name
            };
            setResumes([...resumes, newResume]); // Add new resume to the list
        }
    };

    const handleResumeClick = (url) => {
        window.open(url, '_blank'); // Open the resume in a new tab
    };


    return (
        <div className='w-1/2 p-4 border border-gray-300 rounded bg-gray-50'>
            <label className='block'>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    User`s Resume
                </span>
            </label>
            {/* Block for adding new document */}
           
            <input
                id="resumeInput"
                type="file"
                accept=".pdf,.doc,.docx,image/*" // Accept image files too for better visibility
                onChange={handleFileChange}
                className='hidden' // Hide default input
            />
            {resumes.map((resume, index) => (
                <div key={index} className='flex items-center justify-between mt-2'>
                    <div
                        onClick={() => handleResumeClick(resume.url)} // Click handler to view resume
                        className='flex-1 border-2 border-gray-300 p-2 cursor-pointer hover:bg-gray-100'
                    >
                        <span className="text-[#000]">{resume.name}</span> {/* Show file name */}
                    </div>
                
                </div>
            ))}

<div
                onClick={() => document.getElementById("resumeInput").click()} // Click handler for file input
                className='flex items-center justify-center border-dashed cursor-pointer mt-2'
                style={{
                    width: "100%",  // Block size
                    height: "50px", // Block height
                }}
            >
               
            </div>
        </div>
    );
};

export default UserResume; // Ensure it's exported as default
