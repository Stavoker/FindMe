import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request, { params }) => {
    const { id } = params;
    const { newLink } = await request.json();

    try {
        await connectToDB();

        const user = await User.findById(id);
        if (!user) {
            return new Response("User Not Found", { status: 404 });
        }

        user.SocialLinks.push(newLink);
        await user.save();

        return new Response("Social link added successfully", { status: 200 });
    } catch (error) {
        console.error("Error adding social link:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};