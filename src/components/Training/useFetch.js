import axios from 'axios';

import React from 'react'

const dbContext = axios.create({
  baseURL: 'https://localhost:44362/api/Movies'
})

const UseFetch = () => {

  //#region fetchData
  const fetchData = async (httpVerb, id, item) => {
    //#region Sample Data
    item = {
      "id": 0,
      "title": "string",
      "description": "string",
      "releaseDate": "2023-05-22T18:55:07.570Z",
      "rating": 0,
      "director": "string",
      "genre": "string"
    }
    //#endregion
    //#region show "Entered fetchdata", "httpverb"
    console.log("Entered fetchData");
    console.log("httpVerb: " + httpVerb)
    console.log("id: " + id);
    console.log(item);
    //#endregion show "Entered fetchdata", "httpverb"
    //#region try catch get, post
    let response = null;
    try {
      switch (httpVerb) {

        case 'get':
          response = await dbContext({
            headers: {
              Accept: 'application/json',
            },
          });
          break;

        case 'post':
          response = await dbContext.post('/', item)
          break;

        case 'delete':
          let url = dbContext.baseURL + id;
          console.log("url to delete: " + url)
          response = await dbContext.delete('/' + id)
          break;

        default: response = null;
      }
      if (response != null) {
        const data = response.data;
        console.log(data);
      }
    } catch (error) {
      console.log(error.response);
    }
    //#endregion try catch get, post
  }
  //#endregion fetchData
  //#region handlePostMovies
  // const handlePostMovies = (item) => {
  //   fetchData('post', item);
  // }
  //#endregion handlePostMovies
  //#region handleGetMovies
  const handleGetMovies = () => {
    fetchData('get');
  }
  //#endregion handleGetMovies
  //#region handleDeleteMovies
  const handleDeleteMovies = () => {
    fetchData('delete', 70);
  }
  //#endregion handleDeleteMovies
  //#region handlePutMovies
  const handlePutMovies = () => {
    fetchData();
  }
  //#endregion handlePutMovies
  //#region return
  return (
    <div>
      {/* <button onClick={handlePostMovies}>PostMovies</button>
      <button onClick={handleGetMovies}>GetMovies</button>
      <button onClick={handleDeleteMovies}>DeleteMovies</button>
      <button onClick={handlePutMovies}>PutMovies</button> */}
    </div >
  )
  //#endregion return
}

export default UseFetch;