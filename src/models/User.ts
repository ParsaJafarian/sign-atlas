/**
 * Mongoose model User for user collection
 */
import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

export default User;