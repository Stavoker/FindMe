import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PUT = async (request, { params }) => {

    const { id, index } = params;
    const { newResume } = await request.json();

    try {
        await connectToDB();

        const user = await User.findById(id);
        if (!user) {
            return new Response("User Not Found", { status: 404 });
        }

        if (index < 0 || index >= user.Resumes.length) {
            return new Response("Invalid index", { status: 400 });
        }

        user.Resumes[index] = newResume;
        await user.save();

        return new Response("Resume updated successfully", { status: 200 });
    } catch (error) {
        console.error("Error updating resume:", error);
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

        if (index < 0 || index >= user.Resumes.length) {
            return new Response("Invalid index", { status: 400 });
        }

        user.Resumes.splice(index, 1);
        await user.save();

        return new Response("Resume deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting resume:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

}