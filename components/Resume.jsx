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
                    const parsedResumes = userData.Resumes.map((resume) => {
                        try {
                            return JSON.parse(resume);
                        } catch (error) {
                            console.error('Error parsing resume:', error);
                            return null;
                        }
                    }).filter(Boolean);
                    setResumes(parsedResumes || []);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUser().then((r) => console.log('Fetch completed', r));
    }, [user]);

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        let newResume;
        const MAX_FILE_SIZE = 1024 * 1024;
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                alert('File size exceeds 1MB. Please select a smaller file.');
                return;
            }
            try {
                const base64String = await toBase64(file);
                newResume = {
                    base64String: base64String,
                    name: file.name,
                    type: file.type
                };
                setResumes([...resumes, newResume]);

                const response = await fetch(`/api/users/${user.id}/resumes/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ newResume: JSON.stringify(newResume) }),
                });

                if (!response.ok) {
                    console.error('Failed to update resume');
                }
            } catch (error) {
                console.error('Error updating resume:', error);
            }
        }
    };

    const handleAddResume = () => {
        document.getElementById("resumeInput").click();
    };


    const handleResumeClick = (base64, fileName, fileType) => {
        const byteString = atob(base64.split(',')[1]);
        const mimeType = fileType || 'application/octet-stream';
        const byteNumbers = new Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            byteNumbers[i] = byteString.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });
        const url = URL.createObjectURL(blob);
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
                        onClick={() => handleResumeClick(resume.base64String, resume.name, resume.type)} // Click handler to view resume
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
                onClick={handleAddResume}
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
