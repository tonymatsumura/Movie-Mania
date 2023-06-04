// IMPORT

import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "./style.css";


// CRUD

const CRUD = ({ searchBarResults }) => {
  console.log("--> Entered CRUD");

  const baseUrl = "https://localhost:44362/api/Movies";
  const [show, setShow] = useState(false);

  const [editIndex, setEditIndex] = useState(0);
  const [editId, setEditId] = useState(0);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editReleaseDate, setEditReleaseDate] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [editDirector, setEditDirector] = useState("");
  const [editGenre, setEditGenre] = useState("");

  // HANDLE CLOSE; HANDLE SHOW

  const handleClose = () => {
    console.log("--> Entered Handle Close");
    setShow(false);
  };

  const handleShow = () => {
    console.log("--> Entered handleShow")
    setShow(true);
  }

  const clear = () => {
    console.log("--> Entered clear")
    setEditId(0);
    setEditTitle("");
    setEditDescription("");
    setEditReleaseDate("");
    setEditDirector("");
    setEditRating(0);
    setEditGenre("");
  };

  const [data, setData] = useState([]);

  // GET DATA

  const getData = () => {
    console.log("--> Entered getData");
    axios
      .get(baseUrl)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // USE EFFECT

  useEffect(() => {
    getData();
  }, []);

  // HANDLE EDIT

  const handleEdit = (id, index) => {
    if (index === -1) {
      console.log("Entered Handle Edit -> Add Movie");
      clear();
    } else {
      setEditIndex(index);
      setEditTitle(data[index].title);
      setEditDescription(data[index].description);
      setEditReleaseDate(data[index].releaseDate);
      setEditRating(data[index].rating);
      setEditDirector(data[index].director);
      setEditGenre(data[index].genre);
    }

    handleShow();
  };

  const removeSecond = id => {
    setData(current => current.filter(movie => movie.id !== id));
    data.map(movie =>
      console.log("id: " + movie.id + " title: " + movie.title)
    );
  };

  // HANDLEdelete

  const handleDelete = (id, index) => {
    if (window.confirm("Deseja apagar esse filme") === true) {
      console.log("handleDelete -> index: " + index);

      axios.delete("https://localhost:44362/api/Movies/" + id).then(() => {
        console.log("Sucess. Delete " + id);
        data.splice(index, 1);
        removeSecond();
      });

      //window.location.reload(false);
    }
  };

  // HANDLE UPDATE

  const handleUpdateTable = () => {
    let tempData = data;
    tempData[editIndex].id = data[editIndex].id;
    tempData[editIndex].title = editTitle;
    tempData[editIndex].description = editDescription;
    tempData[editIndex].releaseDate = editReleaseDate;
    tempData[editIndex].rating = editRating;
    tempData[editIndex].director = editDirector;
    tempData[editIndex].genre = editGenre;
    console.log(
      "handleUpdateTable -> tempData: " + JSON.stringify(tempData[editIndex])
    );
    setData(tempData);
  };

  const UpdateDb = () => {
    console.log("Entered UpdateDb");
    let _url = baseUrl + "/" + data[editIndex].id;
    console.log("_url: " + _url);
    console.log("data[editIndex]: " + JSON.stringify(data[editIndex]));
    axios.put(_url, data[editIndex]).then(result => {
      console.log("UpdateDb -> Result: " + JSON.stringify(result));
    });
  };

  // CLOSE UPDATE
  const closeUpdate = () => {
    console.log("closeUpdate entered");
    console.log("editIndex: " + editIndex);

    handleClose();

    if (editIndex > -1) {
      handleUpdateTable();
      UpdateDb();
    } else {
      console.log("closeUpdate -> Add new movie");
      let tempData = data[0];
      tempData.id = 0;
      tempData.title = editTitle;
      tempData.description = editDescription;
      tempData.releaseDate = "2023-05-14T22:12:11.678"; // editReleaseDate;
      tempData.rating = editRating;
      tempData.director = editDirector;
      tempData.genre = editGenre;

      console.log("closeUpdate | data: " + JSON.stringify(data));

      axios.post(baseUrl, tempData).then(result => {
        console.log("closeUpdate -> Result: " + JSON.stringify(result));
        tempData.id = result.data.id;
        console.log("closeUpdate -> tempData: " + JSON.stringify(tempData));
        setData([...data, tempData]);
        console.log("closeUpdate -> data: " + JSON.stringify(data));
      });
    }
  };

  // RETURN

  return (
    <Fragment>
      {/* // TABLE */}

      <Table striped bordered hover>
        <thead className="bg-danger">
          <tr>
            <th className="bg-danger text-white">Id</th>
            <th className="bg-danger text-white">Index</th>
            <th className="bg-danger text-white">Título</th>
            <th className="bg-danger text-white">Sinopse</th>
            <th className="bg-danger text-white">Data</th>
            <th className="bg-danger text-white">Avaliação</th>
            <th className="bg-danger text-white">Diretor</th>
            <th className="bg-danger text-white">Gênero</th>
            <th className="bg-danger text-white">Ações</th>
          </tr>
        </thead>

        <tbody className="table-dark">
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{index}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.releaseDate}</td>
                  <td>{item.rating}</td>
                  <td>{item.director}</td>
                  <td>{item.genre}</td>
                  <td colSpan={2}>
                    <ModeEditIcon
                      className="icon"
                      onClick={() => {
                        handleEdit(item.id, index);
                      }}
                    />
                    &nbsp;
                    <DeleteIcon
                      className="icon"
                      onClick={() => handleDelete(item.id, index)}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>

      {/* // MODAL */}

      <Modal show={show} onHide={handleClose}>
        {/* MODAL HEADER */}

        <Modal.Header closeButton>
          <Modal.Title>Editar Filme</Modal.Title>
        </Modal.Header>

        {/* MODAL BODY */}

        <Modal.Body>
          <Col>
            <Row>
              <input
                type="text"
                className="form-control modalRow"
                placeholder="Title"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />
            </Row>
            <Row>
              <input
                type="text"
                className="form-control modalRow"
                placeholder="Description"
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
              />
            </Row>
            <Row>
              <input
                type="text"
                className="form-control modalRow"
                placeholder="Release Date"
                value={editReleaseDate}
                onChange={e => setEditReleaseDate(e.target.value)}
              />
            </Row>
            <Row>
              <input
                type="text"
                className="form-control modalRow"
                placeholder="Rating"
                value={editRating}
                onChange={e => setEditRating(e.target.value)}
              />
            </Row>
            <Row>
              <input
                type="text"
                className="form-control modalRow"
                placeholder="Director"
                value={editDirector}
                onChange={e => setEditDirector(e.target.value)}
              />
            </Row>

            <Row>
              <input
                type="text"
                className="form-control"
                placeholder="Genre"
                value={editGenre}
                onChange={e => setEditGenre(e.target.value)}
              />
            </Row>
          </Col>
        </Modal.Body>

        {/* MODAL FOOTER */}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={closeUpdate}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
      {/* // ADD BUTTON */}
      <div className="addButton">
        <Fab
          onClick={() => {
            handleEdit(-1, -1);
          }}
          size="small"
          color="primary"
          aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </Fragment>
  );
};

export default CRUD;
