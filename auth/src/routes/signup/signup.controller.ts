import { User } from '../../models';
import { SignUpMiddleware } from './signup.validator';
import { ValidationError } from '../../errors';

const signUpController: SignUpMiddleware = async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        throw new ValidationError([
            {
                path: ['email'],
                message: 'Email already exists',
                code: 'invalid_string',
                validation: 'base64',
            },
        ]);
    }
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    });

    await user.save();
    return res.json({ email: req.body.email });
};

export default signUpController;
