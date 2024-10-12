"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UserProfile from "@components/UserProfile";

const Uprofile = () => {
    const [isMounted, setIsMounted] = useState(false); // Перевірка чи компонент змонтований
    const [userPosts, setUserPosts] = useState([]);
    const [creatorUser, setCreatorUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = isMounted ? searchParams.get("userId") : null;

    // Функція для отримання інформації про користувача за userId
    const fetchUser = async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}`);
            const userData = await response.json();
            setCreatorUser(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Функція для отримання постів (промптів) користувача
    const fetchUserPosts = async (userId) => {
        try {
            const response = await fetch(`/api/prompt/users/${userId}/posts`);
            const data = await response.json();
            setUserPosts(data); // Зберігаємо промпти користувача
        } catch (error) {
            console.error("Error fetching user posts:", error);
        }
    };

    // Перевірка чи компонент змонтований
    useEffect(() => {
        setIsMounted(true); // Встановлюємо, що компонент змонтований
    }, []);

    
    useEffect(() => {
        if (userId) {
            const fetchData = async () => {
                await fetchUser(userId); 
                await fetchUserPosts(userId);
                setIsLoading(false);
            };

            fetchData();
        }
    }, [userId]);

    if (isLoading) {
        return <p>Loading user profile...</p>;
    }

    return (
        <div>
            <UserProfile
                name={creatorUser?.username || "User"} 
                desc={`${creatorUser?.username}'s Profile. See their amazing prompts and contributions to the community.`}
                data={userPosts} 
            />
        </div>
    );
};

export default Uprofile;
