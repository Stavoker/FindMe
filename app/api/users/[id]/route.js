import { clerkClient } from '@clerk/clerk-sdk-node';

export async function GET(req, { params }) {

    const userId = params.id;

    try {
        const user = await clerkClient.users.getUser(userId);
        console.log("Fetched user:", user.id);
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);

        // Check if error is due to user not found
        if (error.status === 404) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ error: 'Error fetching user' }), { status: 500 });
    }

}
