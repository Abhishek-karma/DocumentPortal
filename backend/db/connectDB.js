import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected: " + connection.connection.name + "\n\r")
    } catch (error) {
        console.log(`${error}. Please add a server name to your environment variables, then run this command again.`)
        process.exit(1)
    }
}