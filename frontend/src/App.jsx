import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import NavBarPc from "./components/NavBarPC";
import SearchBar from "./components/SearchBar";
import "./App.css";
import Header from "./components/Header";
import CardGenre from "./components/CardGenre";
import CardList from "./components/CardList";
import CardListArtiste from "./components/CardListArtiste";
import authParameters from "./data/codesAccesAPI";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  const getToken = () => {
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  };

  const getNewAlbums = () => {
    const albumParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    fetch(
      "https://api.spotify.com/v1/browse/new-releases?country=FR&offset=0&limit=20",
      albumParameters
    )
      .then((response) => response.json())
      .then((albumData) => {
        setAlbums(albumData.albums.items);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (accessToken !== "") {
      getNewAlbums();
    }
  }, [accessToken]);

  return (
    <>
      <NavBar />
      <NavBarPc />
      <Header />
      <SearchBar />
      {albums.length > 0 && <CardList dataAlbums={albums} />}
      {albums.length > 0 && <CardList dataAlbums={albums} />}
      <CardListArtiste />
      <CardGenre />
      {albums.length > 0 && <CardList dataAlbums={albums} />}
      {albums.length > 0 && <CardList dataAlbums={albums} />}
    </>
  );
}

export default App;
