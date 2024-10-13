import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const user = await User.findById(params.id)
        console.log(user)
        if (!user) return new Response("User Not Found", { status: 404 });
        return new Response(JSON.stringify(user), { status: 200 })

    } catch (error) {
        console.log(error)
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PUT = async (request, { params }) => {
    const { id } = params;
    const { AboutMe } = await request.json();

    try {
        await connectToDB();

        const user = await User.findById(id);
        if (!user) {
            return new Response("User Not Found", { status: 404 });
        }

        user.AboutMe = AboutMe;
        await user.save();

        return new Response("AboutMe updated successfully", { status: 200 });
    } catch (error) {
        console.error("Error updating AboutMe:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};