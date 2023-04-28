import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function AlbumTitreDetails({ token }) {
  const [albumTitreDetails, setAlbumTitreDetails] = useState();
  const { id } = useParams();

  const getOneAlbum = () => {
    const albumParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`https://api.spotify.com/v1/albums/${id}`, albumParameters)
      .then((response) => response.json())
      .then((albumData) => setAlbumTitreDetails(albumData))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (token !== "") {
      getOneAlbum();
    }
  }, []);

  if (!albumTitreDetails) {
    return <p>Loading album</p>;
  }

  return (
    <figure className="bg-neutral-900 hover:bg-pink-600/30 duration-150 h-36 rounded-md flex-none m-0 py-1 pb-1 px-2 w-28 sm:h-56 sm:w-44 md:h-64 md:w-56">
      <img
        className="rounded-md md:w-48 m-auto sm:py-2 md:py-0 md:rounded-md sm:w-36"
        src={albumTitreDetails.images[0].url}
        alt={albumTitreDetails.name}
      />
      <figcaption className="text-center text-white/60 space-y-0.5">
        <h2 className="font-bold text-xs/4 text-white/70 sm:text-base md:text-base truncate">
          {albumTitreDetails.name}
        </h2>
        <h3 className="text-xs/3 truncate">{albumTitreDetails.id}</h3>
        <p className="text-[8px] sm:text-xs">
          {albumTitreDetails.release_date}
        </p>
      </figcaption>
    </figure>
  );
}

AlbumTitreDetails.propTypes = {
  token: PropTypes.string.isRequired,
};
