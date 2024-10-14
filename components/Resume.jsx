'use client';

import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";

const ResumeUpload = () => {
    const [resumes, setResumes] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                try {
                    const response = await fetch(`/api/users/${user.id}/mongo`);
                    const userData = await response.json();
                    setResumes(userData.Resumes || []);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUser().then(r => console.log(r));
    }, [user]);

    const handleFileChange = async (e) => {

        const file = e.target.files[0];
        let newResume;

        if (file) {
            newResume = {
                url: URL.createObjectURL(file),
                name: file.name
            };
            setResumes([...resumes, newResume]);
        }

        try {
            const response = await fetch(`/api/users/${user.id}/resumes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newResume }),
            });

            if (!response.ok) {
                console.error('Failed to update resume');
            }
        } catch (error) {
            console.error('Error updating resume:', error);
        }

    };

    const handleAddResume = () => {
        document.getElementById("resumeInput").click();
    };

    const handleResumeClick = (url) => {
        window.open(url, '_blank'); 
    };

    const handleDeleteResume = async (index) => {

        setResumes(resumes.filter((_, i) => i !== index));

        try {
            const response = await fetch(`/api/users/${user.id}/resumes/${index}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                console.error('Failed to delete resume');
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
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
                        onClick={() => handleDeleteResume(index)}
                        className='ml-2 text-red-500 hover:underline'
                    >
                        Delete
                    </button>
                </div>
            ))}

<div
                onClick={handleAddResume} // Click handler for file input
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
