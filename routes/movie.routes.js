// routes/movie.routes.js
const express = require("express");
const { MovieModel } = require("../model/movie.model");

const movieRouter = express.Router();

// Get all movies
movieRouter.get("/movies", async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.status(200).send({ msg: "List of Movies", movies });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ msg: "Internal Server Error" }, movies);
  }
});

// Add a new movie
movieRouter.post("/movies", async (req, res) => {
  try {
    const existingMovie = await MovieModel.findOne({ title: req.body.title });
    if (existingMovie) {
      return res.status(400).json({ msg: "Movie already exists" });
    }
    const movie = new MovieModel(req.body);
    await movie.save();
    res.json({ msg: "The new movie has been added", new_movie: movie });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Update a new movie
movieRouter.put("/movies/:movieId", async (req, res) => {
  const { movieId } = req.params;
  try {
    await MovieModel.findByIdAndUpdate({ _id: movieId }, req.body);
    res.status(200).json({
      msg: `The movie with ID:${movieId} has been Updated`,
    });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// Delete a new movie
movieRouter.delete("/movies/:movieId", async (req, res) => {
  const { movieId } = req.params;
  try {
    await MovieModel.findByIdAndDelete({ _id: movieId });
    res
      .status(200)
      .json({ msg: `The movie with ID:${movieId} has been deleted` });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = { movieRouter };
