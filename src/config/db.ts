import mongoose from 'mongoose';

export async function connectDb(): Promise<boolean> {
  const mongoUri = process.env.MONGODB_URI?.trim();

  if (!mongoUri) {
    console.log('MONGODB_URI not set; using in-memory data store for local development.');
    return false;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully.');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    return false;
  }
}
