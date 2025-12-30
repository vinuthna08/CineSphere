import express from "express";
import Ticket from "../models/Ticket.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Book tickets
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { movieId, movieTitle, seats, showTime } = req.body;

    if (!movieId || !movieTitle || !seats || !showTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ticket = await Ticket.create({
      userId: req.user.id,
      movieId,
      movieTitle,
      seats,
      showTime
    });

    res.status(201).json({ message: "Tickets booked successfully", ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to book tickets" });
  }
});

// Get all tickets of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id });
    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

// Delete a booked ticket
router.delete("/:ticketId", authMiddleware, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (ticket.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await ticket.remove();
    res.status(200).json({ message: "Ticket canceled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel ticket" });
  }
});

export default router;
