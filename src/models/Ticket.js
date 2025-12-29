import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: Number, required: true },
    movieTitle: { type: String, required: true },
    seats: { type: [String], required: true }, // e.g., ["A1", "A2"]
    showTime: { type: String, required: true } // e.g., "2025-12-31 19:30"
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
