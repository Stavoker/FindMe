import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
    },
    NumberOfTokens: {
        type: [String],
        required: true,
    },
    AboutMe: {
        type: String,
        required: true,
    },
    SocialLinks: {
        type: [String],
        required: true,
    },
    Resumes: {
    type: [{
        url: String,
        name: String
    }],
    required: true,
    },
});

const User = models.User || model('User', UserSchema);

export default User;