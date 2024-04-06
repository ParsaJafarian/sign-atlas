/**
 * Mongoose model User for user collection
 */
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

//connect to the database
connectDB();

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