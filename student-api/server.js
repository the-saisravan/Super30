import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import studentRoutes from './routes/studentRoutes.js';

const app = express();
app.use(express.json());

// Connect to MongoDB
const connectDB= await mongoose.connect(process.env.MongoDB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err.message));

app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});