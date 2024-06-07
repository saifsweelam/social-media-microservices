import mongoose from 'mongoose';
import app from './app';

const MONGODB_URI =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-media';
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Database Connected...');
        app.listen(4000, () => {
            console.log('Listening on port 4000');
        });
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
