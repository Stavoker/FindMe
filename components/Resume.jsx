// components/ResumeUpload.js
'use client';

import { useState } from 'react';

const ResumeUpload = () => {
    const [resumes, setResumes] = useState([]); 

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newResume = {
                url: URL.createObjectURL(file),
                name: file.name
            };
            setResumes([...resumes, newResume]); 
        }
    };

    const handleResumeClick = (url) => {
        window.open(url, '_blank'); 
    };

    const handleDeleteResume = (name) => {
        setResumes(resumes.filter(resume => resume.name !== name)); 
    };

    return (
        <div className='w-1/2 p-4 border border-gray-300 rounded bg-gray-50'>
            <label className='block'>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Upload Resume
                </span>
            </label>
            {/* Block for adding new document */}
           
            <input
                id="resumeInput"
                type="file"
                accept=".pdf,.doc,.docx,image/*" 
                onChange={handleFileChange}
                className='hidden' 
            />
            {resumes.map((resume, index) => (
                <div key={index} className='flex items-center justify-between mt-2'>
                    <div
                        onClick={() => handleResumeClick(resume.url)} // Click handler to view resume
                        className='flex-1 border-2 border-gray-300 p-2 cursor-pointer hover:bg-gray-100'
                    >
                        <span className="text-[#000]">{resume.name}</span> {/* Show file name */}
                    </div>
                    <button
                        onClick={() => handleDeleteResume(resume.name)}
                        className='ml-2 text-red-500 hover:underline'
                    >
                        Delete
                    </button>
                </div>
            ))}

<div
                onClick={() => document.getElementById("resumeInput").click()} // Click handler for file input
                className='flex items-center justify-center border-dashed cursor-pointer mt-2'
                style={{
                    width: "100%",  
                    height: "50px", 
                }}
            >
                <span className="text-gray-500 text-1xl">+ Add Document</span> 
            </div>
        </div>
    );
};

export default ResumeUpload; 
