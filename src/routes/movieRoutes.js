import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * 🇮🇳 Indian Movies (Popular in India)
 * GET /api/movies/indian
 */
router.get("/indian", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          region: "IN",
          language: "en-IN",
          page: 1
        }
      }
    );

    res.status(200).json(response.data.results);
  } catch (error) {
    console.error("TMDB ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch Indian movies" });
  }
});

/**
 * 🇺🇸 English Movies (Popular)
 * GET /api/movies/english
 */
router.get("/english", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "en-US",
          page: 1
        }
      }
    );

    res.status(200).json(response.data.results);
  } catch (error) {
    console.error("TMDB ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch English movies" });
  }
});

export default router;
/**
 Movie Details by ID
 GET /api/movies/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "en-US"
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("TMDB ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch movie details" });
  }
});
