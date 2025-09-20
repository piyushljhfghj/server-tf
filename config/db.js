// db.js

import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://piyush:rawat1807@cluster0.pny6vjq.mongodb.net/INTERN')
 .then (() => (`Connected to MongoDB`));
}
