import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import SearchBar from "../components/SearchBar";
import SearchNavBar from "../components/SearchNavBar";

export default function Search({ token }) {
  const [searchResultArtist, setSearchResultArtist] = useState([]);
  const [searchResultAlbum, setSearchResultAlbum] = useState([]);
  const [searchResultTracks, setSearchResultTracks] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // appel API pour récupérer 20 résultats (20 artistes, 20 albums, 20 titres) selon la recherche effectuée

  const getAllResults = () => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist,album,track&market=FR&limit=20&offset=0`,
      searchParameters
    )
      .then((response) => response.json())
      .then((SearchData) => {
        setSearchResultArtist(SearchData.artists.items);
        setSearchResultAlbum(SearchData.albums.items);
        setSearchResultTracks(SearchData.tracks.items);
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  // la fonction est appelée à chaque changement dans la barre de recherche

  useEffect(() => {
    if (searchInput !== "") {
      getAllResults();
    }
  }, [searchInput]);

  return (
    <main className="min-h-screen">
      <SearchBar query={searchInput} setQuery={setSearchInput} />
      <SearchNavBar />
      <Outlet
        context={{ searchResultArtist, searchResultTracks, searchResultAlbum }}
      />
      <div className=" mb-16 md:hidden" />
    </main>
  );
}

Search.propTypes = {
  token: PropTypes.string.isRequired,
};
