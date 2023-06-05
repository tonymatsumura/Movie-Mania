import axios from 'axios';

import React from 'react'

const dbContext = axios.create({
  baseURL: 'https://sheetdb.io/api/v1/98d2ot9ejgwew'
})

const UseFetch = () => {

  const fetchData = async (httpVerb, id, item) => {

    item = {
      "id": 0,
      "title": "string",
      "description": "string",
      "releaseDate": "2023-05-22T18:55:07.570Z",
      "rating": 0,
      "director": "string",
      "genre": "string"
    }

    console.log("Entered fetchData");
    console.log("httpVerb: " + httpVerb)
    console.log("id: " + id);
    console.log(item);

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

  }

  const handlePostMovies = (item) => {
    fetchData('post', item);
  }

  const handleGetMovies = () => {
    fetchData('get');
  }


  const handleDeleteMovies = () => {
    fetchData('delete', 70);
  }

  const handlePutMovies = () => {
    fetchData();
  }

  return (
    <div>
      <button onClick={handlePostMovies}>PostMovies</button>
      <button onClick={handleGetMovies}>GetMovies</button>
      <button onClick={handleDeleteMovies}>DeleteMovies</button>
      <button onClick={handlePutMovies}>PutMovies</button>
    </div >
  )

}

export default UseFetch;


