import express from "express";
import axios from "axios";

const router = express.Router();

// 🇮🇳 Indian Movies
router.get("/indian", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          region: "IN",
          with_origin_country: "IN",
          sort_by: "popularity.desc",
          page: 1
        }
      }
    );

    res.status(200).json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Indian movies" });
  }
});

// 🇺🇸 English Movies
router.get("/english", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          with_original_language: "en",
          sort_by: "popularity.desc",
          page: 1
        }
      }
    );

    res.status(200).json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch English movies" });
  }
});

export default router;
