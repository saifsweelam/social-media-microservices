import mongoose from 'mongoose';
import { validateEmail, validatePassword } from '../../validators';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateEmail,
            message: 'Invalid email',
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: validatePassword,
            message: 'Invalid password',
        },
    },
});

const User = mongoose.model('User', userSchema);

export default User;
export type UserDocument = typeof User.schema.obj & mongoose.Document;
