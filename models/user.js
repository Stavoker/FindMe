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
        type: Number,
        required: true,
    },
    AboutMe: {
        type: String,
        required: false,
    },
    SocialLinks: {
        type: [String],
        required: false,
    },
    Resumes: {
    type: [{
        url: String,
        name: String
    }],
    required: false, _id: false
    },
});

const User = models.User || model('User', UserSchema);

export default User;