import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request, { params }) => {

    const { id } = params;
    const { newResume } = await request.json();

    try {
        await connectToDB();

        const user = await User.findById(id);
        if (!user) {
            return new Response("User Not Found", { status: 404 });
        }

        user.Resumes.push(newResume);
        await user.save();

        return new Response("Resume added successfully", { status: 200 });
    } catch (error) {
        console.error("Error adding resume:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};