import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    watchlist: [
      {
        movieId: Number,
        title: String,
        posterPath: String,
        releaseDate: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
