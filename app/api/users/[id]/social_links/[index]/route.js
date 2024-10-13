import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PUT = async (request, { params }) => {

    const { id, index } = params;
    const { newLink } = await request.json();

    try {
        await connectToDB();

        const user = await User.findById(id);
        if (!user) {
            return new Response("User Not Found", { status: 404 });
        }

        if (index < 0 || index >= user.SocialLinks.length) {
            return new Response("Invalid index", { status: 400 });
        }

        user.SocialLinks[index] = newLink;
        await user.save();

        return new Response("Social link updated successfully", { status: 200 });
    } catch (error) {
        console.error("Error updating social link:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {

    const { id, index } = params;

    try {
        await connectToDB();

        const user = await User.findById(id);
        if (!user) {
            return new Response("User Not Found", { status: 404 });
        }

        if (index < 0 || index >= user.SocialLinks.length) {
            return new Response("Invalid index", { status: 400 });
        }

        user.SocialLinks.splice(index, 1);
        await user.save();

        return new Response("Social link deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting social link:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

}