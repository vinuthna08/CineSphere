import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 *  Add to Watchlist
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { movieId, title, posterPath, releaseDate } = req.body;

    const user = await User.findById(req.user.id);

    const alreadyExists = user.watchlist.find(
      movie => movie.movieId === movieId
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    user.watchlist.push({ movieId, title, posterPath, releaseDate });
    await user.save();

    res.status(200).json({ message: "Movie added to watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to watchlist" });
  }
});

/**
 * 📄 Get Watchlist
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch watchlist" });
  }
});

/**
 * Remove from Watchlist
 */
router.delete("/:movieId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.watchlist = user.watchlist.filter(
      movie => movie.movieId !== Number(req.params.movieId)
    );

    await user.save();

    res.status(200).json({ message: "Movie removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove movie" });
  }
});

export default router;
