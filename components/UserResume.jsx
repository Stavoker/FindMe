'use client';

const UserResume = ({resumes}) => {

    const handleResumeClick = (url) => {
        window.open(url, '_blank'); // Open the resume in a new tab
    };

    return (
        <div className='w-1/2 p-4 border border-gray-300 rounded bg-gray-50'>
            <label className='block'>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Resumes
                </span>
            </label>
            {/* Block for adding new document */}

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
        </div>
    );
};

export default UserResume; // Ensure it's exported as default