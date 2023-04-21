import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import NavBar from "./components/NavBar";
import NavBarPc from "./components/NavBarPC";

import "./App.css";
import Header from "./components/Header";

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
      <NavBarPc />
      <Header />
      <Routes>
        <Route path="/" element={<Home albumsArray={albums} />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <NavBar />
    </>
  );
}

export default App;
