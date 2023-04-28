import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
// import CardListTitres from "./src/components/CardListTitres";
import CardList from "../components/CardList";

export default function ArtistDetail({ token }) {
  const [artist, setArtist] = useState();
  // const [tracks, setTracks] = useState();
  const [album, setAlbum] = useState();
  const { id } = useParams();

  const getOneArtist = () => {
    const artistParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`https://api.spotify.com/v1/artists/${id}`, artistParameters)
      .then((response) => response.json())
      .then((artistData) => setArtist(artistData))
      .catch((err) => console.error(err));
  };

  // const getOneTracks = () => {
  //   const artistParameters = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   fetch(
  //     `https://api.spotify.com/v1/artists/${id}/top-tracks?market=FR`,
  //     artistParameters
  //   )
  //     .then((response) => response.json())
  //     .then((tracksData) => setTracks(tracksData))
  //     .catch((err) => console.error(err));
  // };

  // useEffect(() => {
  //   if (token !== "") {
  //     getOneArtist();
  //   }
  // }, [id]);
  // if (!tracks) {
  //   return <p>Loading tracks</p>;
  // }

  const getOneAlbum = () => {
    const artistParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      `https://api.spotify.com/v1/artists/${id}/albums?limit=20&market=FR`,
      artistParameters
    )
      .then((response) => response.json())
      .then((albumData) => setAlbum(albumData))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (token !== "") {
      getOneArtist();
    }
  }, [id]);

  useEffect(() => {
    if (token !== "") {
      getOneAlbum();
    }
  }, [id]);
  if (!artist) {
    return <p>Loading artiste</p>;
  }
  if (!album) {
    return <p>Loading album</p>;
  }

  return (
    <main>
      <figure className="">
        <div className=" md:ml-60">
          <img
            className=" max-sm:m-auto object-contain max-sm:h-48 mt-7 md:h-60 shadow-lg shadow-pink-500/50 rounded-md"
            id={artist.id}
            src={artist.images[0].url}
            alt={artist.images ? artist.name : null}
          />
        </div>
        <figcaption>
          <h2 className="mt-7 text-center text-2xl">{artist.name}</h2>
        </figcaption>
      </figure>
      <section>
        <h2 className="mt-6 ml-2 text-xl">Ses plus grands Hits</h2>
        {/* <CardListTitres /> */}

        <CardList dataAlbums={album.items} title="Discographie" />
        <h2 className="mt-6 ml-2 text-xl">Vous devriez aussi aimer</h2>
      </section>
    </main>
  );
}

ArtistDetail.propTypes = {
  token: PropTypes.string.isRequired,
};
