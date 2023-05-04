import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Search from "./pages/Search";
import NavBar from "./components/NavBar";
import NavBarPc from "./components/NavBarPC";
import Footer from "./components/Footer";
import "./App.css";
import "./LightModeCSS/LightMode.css";
import "./LightModeCSS/ButtonLightMode.css";
import "./LoadingPage/loading.css";
import authParameters from "./data/codesAccesAPI";
import SearchAll from "./pages/SearchAll";
import SearchArtist from "./pages/SearchArtist";
import SearchAlbum from "./pages/SearchAlbum";
import SearchTitle from "./pages/SearchTitle";
import ArtistDetail from "./pages/ArtistDetail";
import AlbumTitreDetails from "./pages/AlbumTitreDetails";
import TitreDetails from "./pages/TitreDetails";
import Radio from "./pages/Radio";
import GenreDetails from "./pages/GenreDetails";
import Video from "./components/Video";

export const TokenContext = createContext("");

function App() {
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || "";
  });
  const [albums, setAlbums] = useState([]);

  const getToken = () => {
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
        localStorage.setItem("accessToken", data.access_token);
      });
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
    <TokenContext.Provider value={accessToken}>
      <main>
        <NavBarPc />
        <Header />
        <Routes>
          <Route index element={<Home albumsArray={albums} />} />
          <Route
            path="search/artist/4siBlVknVhh8jtVy9jHsDG"
            element={<Video albumsArray={albums} />}
          />
          <Route
            path="search/artist/:id"
            element={<ArtistDetail token={accessToken} />}
          />
          <Route
            path="search/album/:id"
            element={<AlbumTitreDetails token={accessToken} />}
          />
          <Route
            path="search/title/:id"
            element={<TitreDetails token={accessToken} />}
          />
          <Route
            path="search/genre/:genre"
            element={<GenreDetails token={accessToken} />}
          />
          <Route path="search" element={<Search token={accessToken} />}>
            <Route index element={<SearchAll />} />

            <Route path="artist" element={<SearchArtist />} />
            <Route path="album" element={<SearchAlbum />} />
            <Route path="title" element={<SearchTitle />} />
          </Route>
          <Route path="radio" element={<Radio />} />
          <Route
            path="*"
            element={
              <h2 className="text-center text-4xl text-white pt-60">
                Cette page n'existe pas...
              </h2>
            }
          />
        </Routes>
        <NavBar />
        <Footer />
      </main>
    </TokenContext.Provider>
  );
}

export default App;
