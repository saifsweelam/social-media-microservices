import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoMemoryServer: MongoMemoryServer;

beforeAll(async () => {
    mongoMemoryServer = await MongoMemoryServer.create();
    const mongoUri = mongoMemoryServer.getUri();
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    await Promise.all(
        collections.map((collection) => collection.deleteMany({})),
    );
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoMemoryServer.stop();
});
