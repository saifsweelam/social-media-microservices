import { User } from '../../models';
import { SignUpMiddleware } from './signup.validator';

const signUpController: SignUpMiddleware = async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    });

    await user.save();
    return res.json({ email: req.body.email });
};

export default signUpController;
