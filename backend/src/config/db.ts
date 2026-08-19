import mongoose, { type Mongoose } from "mongoose";

const connectionTimeoutMs = 5_000;
let connectionPromise: Promise<Mongoose> | null = null;

/**
 * Opens one shared MongoDB connection. Concurrent callers reuse the same
 * in-flight request, while a failed attempt can be retried on the next call.
 */
const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === mongoose.ConnectionStates.connected) {
    return;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is required to connect to MongoDB.");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(mongoUri, {
        maxPoolSize: 10,
        minPoolSize: 0,
        serverSelectionTimeoutMS: connectionTimeoutMs,
      })
      .then((mongooseInstance) => {
        console.log(`MongoDB connected: ${mongooseInstance.connection.host}`);
        return mongooseInstance;
      })
      .catch((error: unknown) => {
        connectionPromise = null;
        const reason = error instanceof Error ? error.message : String(error);
        throw new Error(`MongoDB connection failed: ${reason}`, { cause: error });
      });
  }

  await connectionPromise;
};

export default connectDB;
