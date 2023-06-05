// Import 
import React, { useEffect, useState } from "react";
import './App.css';


// Import from Netflix
import { Tmdb } from "./components/Netflix/Tmdb";
import MovieRow from "./components/Netflix/Components/MovieRow.js";
import FeaturedMovie from "./components/Netflix/Components/FeaturedMovie"
import Header from "./components/Netflix/Components/Header";

// Import temp
import UseFetch from './components/Training/useFetch'


export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);


  useEffect(() => { // Get Tmdb Movies List
    const loadAll = async () => {
      let list = await Tmdb.getHomelist();
      setMovieList(list);

      // Pegar o feature
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];

      //console.log("chosen: " + JSON.stringify(chosen));
      //console.log("chosen id: " + JSON.stringify(chosen.id));

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

    };
    loadAll();
  }, [])


  useEffect(() => { // Control Scroll Listener
    const scrollListener = () => {
      if (window.scrollY > 5) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">

      {/* Header */}

      < Header black={blackHeader} />

      {/* Destaque */}

      {
        featuredData &&
        <FeaturedMovie item={featuredData} />
      }


      {/* Listas */}
      <section className="lists">
        {movieList.map((item, key) => (
          <div key={key}>
            <MovieRow key={key} title={item.title} items={item.items} />
          </div>
        ))}
      </section>

      <UseFetch />


      {/* Footer */}

      <footer>
        Copywright Dream Software <br />
        Direitos de image para Netflix <br />
        Dados obtidos do site TheMovieDB.org
      </footer>

    </div >
  )

}

















// import "bootstrap/dist/css/bootstrap.min.css";
// import "./pages/Movies/MovieList.js";
// import { SearchBar } from "./components/SearchBar/SearchBar.js";
// import "./style.css";
// import "./index.css";

// import CRUD from "./CRUD.js";
// import { useState } from "react";
// import SearchResultsList from "./components/SearchBar/SearchResultsList.js";

// import { useFetch } from "./components/Training/useFetch.js";

// export default function App() {
//   const [searchBarResults, setSearchBarResults] = useState([]);

//   return (
//     <div className="App">
//       <div className="search-bar-container">
//         <SearchBar
//           setSearchBarResults={setSearchBarResults}
//           className="search-bar-container"
//         />
//       </div>
//       <CRUD searchBarResults={searchBarResults} />
//       {/* <SearchResultsList searchBarResults={searchBarResults} /> */}
//     </div>
//   );
// }


// -------------------- ANOTHER FUNCTION APP 
// export default function App() {
//   const [url, setUrl] = useState(null);
//   const { data } = useFetch({
//     url: "./jack.json",
//   });

//   return (
//     <div className="App">
//       <div>{JSON.stringify(data)}</div>
//     </div>
//   );
// }
