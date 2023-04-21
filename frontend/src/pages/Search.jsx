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
    if (searchInput !== "") {
      getAllResults();
    }
  }, [searchInput]);

  return (
    <>
      <SearchBar query={searchInput} setQuery={setSearchInput} />
      <SearchNavBar />
      <Outlet
        context={[searchResultArtist, searchResultTracks, searchResultAlbum]}
      />
    </>
  );
}

Search.propTypes = {
  token: PropTypes.string.isRequired,
};
