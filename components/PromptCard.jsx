"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs"; // Clerk's user hook
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { user } = useUser(); // Get current user from Clerk
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const [creatorUser, setCreatorUser] = useState(null);

  // Fetch user by ID
  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setCreatorUser(userData);
    } catch (error) {
      console.error("Error fetching Clerk user:", error);
    }
  };

  useEffect(() => {
    if (post.userId) {
      fetchUser(post.userId); // Fetch the user data for the post creator
    }
  }, [post.userId]);

  const handleProfileClick = () => {
    if (post.userId === user.id) router.push("/profile");
    else router.push(`/user-profile?userId=${post.userId}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
      <div className="prompt_card">

        <div className="flex justify-between items-start gap-5">
            <div
                className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
                onClick={handleProfileClick}
            >
              {/* Use creatorUser's image if it's available */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                    src={creatorUser?.imageUrl || "/assets/icons/default-avatar.svg"}
                    alt="user_image"
                    layout="fill"
                    objectFit="cover" // Ensures the image covers the container
                />
              </div>

              <div className="flex flex-col">
                <h3 className="font-satoshi font-semibold text-gray-900">
                  {creatorUser?.username || "Anonymous"} {/* Display post creator's username */}
                </h3>
                <p className="font-inter text-sm text-gray-500">
                  {creatorUser?.emailAddresses?.[0]?.emailAddress || "No info"} {/* Display post creator's email */}
                </p>
              </div>
            </div>
          <div className="copy_btn" onClick={handleCopy}>
            <Image
                src={
                  copied === post.prompt
                      ? "/assets/icons/tick.svg"
                      : "/assets/icons/copy.svg"
                }
                alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
                width={12}
                height={12}
            />
          </div>

        </div>

        <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
        <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag.join(" ")}
        </p>

        {/* Check if the current user is the owner of the post */}
        {user?._id === post?.creator?._id && pathName === "/profile" && (
            <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
              <p
                  className="font-inter text-sm green_gradient cursor-pointer"
                  onClick={handleEdit}
              >
                Edit
              </p>
              <p
                  className="font-inter text-sm orange_gradient cursor-pointer"
                  onClick={handleDelete}
              >
                Delete
              </p>
            </div>
        )}
      </div>
  );
};

export default PromptCard;