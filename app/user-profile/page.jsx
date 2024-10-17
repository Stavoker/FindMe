"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import UserProfile from "@components/UserProfile";

const Uprofile = () => {

    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");

    const [userPosts, setUserPosts] = useState([]);
    const [creatorUser, setCreatorUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await fetch(`/api/users/${userId}/mongo`);
            const userData = await response.json();
            setCreatorUser(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchUserPosts = async () => {
        try {
            const response = await fetch(`/api/prompt/users/${userId}/posts`);
            const data = await response.json();
            setUserPosts(data);
        } catch (error) {
            console.error("Error fetching user posts:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUser();
            fetchUserPosts();
            setIsLoading(false); // Stop loading once data is fetched
        }
    }, [userId]);

    if (isLoading) {
        return <p>{userId}</p>;
    }

    return (
        <div>
            <UserProfile
                userId={userId}
                desc={`${creatorUser?.Username}'s profile. See their amazing prompts and contributions to the community.`}
                data={userPosts}
            />
        </div>
    );
};

export default Uprofile;
