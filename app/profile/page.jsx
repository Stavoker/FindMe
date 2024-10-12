"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const [myPosts, setMyPosts] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const fetchPosts = async () => {
        const response = await fetch(`/api/prompt/users/${user.id}/posts`);
        const data = await response.json();
        setMyPosts(data);
      };
      fetchPosts();
    }
  }, [user]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id.toString()}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
        "Are you sure you want to delete this post?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
      <Profile
          name='My'
          desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
          data={myPosts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
      />
  );
};

export default MyProfile;
