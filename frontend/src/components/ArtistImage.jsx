import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ArtistImage({ token, id }) {
  const [artist, setArtist] = useState();

  // Appel API pour récupérer les informations d'un artiste selon son ID

  const getAnArtist = () => {
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

  // la fonction est appelée à chaque changement d'ID sous réserve d'avoir le token nécessaire

  useEffect(() => {
    if (token !== "") {
      getAnArtist();
    }
  }, [id]);

  // messages de chargement le temps de récupérer les informations par l'API

  if (!artist) {
    return (
      <div className="min-h-screen flex  flex-col items-center mt-20 md:ml-36 md:mt-2">
        <p className="md:text-xl mb-20 ">Chargement des artistes...</p>
        <span className="loader  " />
      </div>
    );
  }

  return (
    <Link to={`/search/artist/${id}`}>
      <figure className="card-genre bg-neutral-900 hover:bg-pink-600/30 duration-150 h-36 rounded-md flex-none m-0 py-1 pb-2 px-2 w-28 sm:h-56 sm:w-44 md:h-64 md:w-56 ">
        {artist.images.length > 0 && (
          <img
            className="rounded-full w-24 h-24  md:w-48 md:h-52 m-auto sm:py-2 md:rounded-full sm:w-36 sm:h-36 "
            id={artist.name}
            src={artist.images[0].url}
            alt={artist.name}
          />
        )}
        <figcaption>
          <h2 className="font-bold text-xs/4 mt-2 h-8 py-2 text-center text-white/70 sm:text-base md:text-xl/3 truncate">
            {artist.name}
          </h2>
        </figcaption>
      </figure>
    </Link>
  );
}

ArtistImage.propTypes = {
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
