import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function MovieInsert() {
  const [movie, setMovie] = useState(null);
  const baseUrl = "https://localhost:44362/api/Movies/1";

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setMovie(response.data);
    });
  }, []);

  movie.id = 0;
  movie.title = "Matrix";

  console.log(movie);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // RETURN
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={movie.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={movie.description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="releaseDate">
        <Form.Label>Release Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter release date"
          value={movie.releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="rating">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter rating"
          value={movie.rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="director">
        <Form.Label>Director</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter director"
          value={movie.director}
          onChange={(e) => setDirector(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="genre">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter genre"
          value={movie.genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
