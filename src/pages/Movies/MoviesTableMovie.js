//#region IMPORTS
import { Fragment, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "../../style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
//#endregion

// FUNCTION MOVIES TABLE MOVIE
export default function MoviesTableMovie({
  movies,
  setMovies,
  lastId,
  setLastId,
}) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [show, setShow] = useState(false);
  // handleClose
  const handleClose = () => setShow(false);
  const handleShow = index => {
    setCurrentIndex(index);
    setShow(true);
  };

  const [editOrAdd, setEditOrAdd] = useState("");

  //#region title, description, etc
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState(0);
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  //#endregion title, description
  //#region editTitle, etc
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editReleaseDate, setEditReleaseDate] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [editDirector, setEditDirector] = useState("");
  const [editGenre, setEditGenre] = useState("");
  //#endregion editTitle, etc.
  //#region functions

  // CLEAR
  const clear = () => {
    setTitle("");
    setDescription("");
    setReleaseDate("");
    setRating("");
    setDirector("");
    setGenre("");
    setEditTitle("");
    setEditDescription("");
    setEditReleaseDate("");
    setEditRating(0);
    setEditGenre("");
  };
  // handleEdit
  const handleEdit = index => {
    var moviesLength = movies.length;

    if (index > -1) {
      setEditTitle(movies[index].title);
      setEditDescription(movies[index].description);
      setEditReleaseDate(movies[index].releaseDate);
      setEditRating(movies[index].rating);
      setEditDirector(movies[index].director);
      setEditGenre(movies[index].genre);
    } else {
      setEditOrAdd("add");
      clear();
    }

    handleShow(index);
  };
  // handleDelete
  const handleDelete = id => {
    console.log("Deletar id: " + id);

    var isToDelete = window.confirm("Are you sure to delete this movie?");

    if (isToDelete) {
      axios.delete("https://localhost:44362/api/Movies/" + id).then(() => {
      });

      window.location.reload(false);
    }
  };
  const handleUpdate = () => {

  };

  // handleSave
  const handleSave = () => {

    const url = "https://localhost:44362/api/Movies";
    let _id = -1;

    if (lastId < 0) lastId = -1;


    editOrAdd === "edit" ? (_id = movies[currentIndex].id) : (_id = "");

    const data = {
      title: editTitle,
      description: editDescription,
      releaseDate: "2023-05-14T22:12:11.678Z",
      rating: editRating,
      director: editDirector,
      genre: editGenre,
    };

    if (editOrAdd === "add") {

      setMovies([...movies, data]);

      axios.post(url, data).then(result => {
        console.log(result);
      });
    } else {
      let _url = url + "/" + _id;
      data["id"] = _id;

      axios.put(_url, data).then(result => {
        console.log(result);
      });
    }
    window.location.reload(false);
    clear();
    setLastId(lastId + 1);
  };

  //#endregion

  return (
    <div>
      {/* TABLE  */}
      <table className="table table-striped table-bordered">
        <thead className="bg-danger">
          <tr>
            {/* <th className="bg-danger text-white">Id</th> */}
            <th className="bg-danger text-white">Título</th>
            <th className="bg-danger text-white">Descrição</th>
            <th className="bg-danger text-white">Data de lançamento</th>
            <th className="bg-danger text-white">Avaliação</th>
            <th className="bg-danger text-white">Diretor</th>
            <th className="bg-danger text-white">Genero</th>
            <th className="bg-danger text-white">Ação</th>
          </tr>
        </thead>

        <tbody className="table-dark">
          {movies && movies.length > 0
            ? movies.map((movie, index) => {
              return (
                <tr key={movie.id}>
                  {/* <td>{movie.id}</td> */}
                  <td>{movie.title}</td>
                  <td>{movie.description}</td>
                  <td>{movie.releasedate}</td>
                  <td>{movie.rating}</td>
                  <td>{movie.director}</td>
                  <td>{movie.genre}</td>
                  <td>
                    {/* ModeEditIcon */}
                    <ModeEditIcon
                      className="icon"
                      onClick={() => {
                        setEditOrAdd("edit");
                        // alert("ModeEditIcon Current Index: " + index);
                        setCurrentIndex(index);
                        handleEdit(index);
                      }}
                    />
                    {/* DeleteIcon */}
                    <DeleteIcon
                      className="icon"
                      onClick={() => handleDelete(movie.id)}
                    />
                  </td>
                </tr>
              );
            })
            : "Loading ..."}
        </tbody>
      </table>

      {/* MODAL */}
      <Modal show={show} onHide={handleClose}>
        {/* MODAL HEADER */}
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Movie</Modal.Title>
        </Modal.Header>

        {/* MODAL BODY */}
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />

              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
              />

              <input
                type="text"
                className="form-control"
                placeholder="Release Date"
                value={editReleaseDate}
                onChange={e => setEditReleaseDate(e.target.value)}
              />

              <input
                type="text"
                className="form-control"
                placeholder="Rating"
                value={editRating}
                onChange={e => setEditRating(e.target.value)}
              />

              <input
                type="text"
                className="form-control"
                placeholder="Director"
                value={editDirector}
                onChange={e => setEditDirector(e.target.value)}
              />

              <input
                type="text"
                className="form-control"
                placeholder="Genre"
                value={editGenre}
                onChange={e => setEditGenre(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>

        {/* MODAL FOOTER */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ADD BUTTON */}
      <div className="addButton">
        <Fab
          onClick={() => {
            handleEdit(-1);
          }}
          size="small"
          color="primary"
          aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}
