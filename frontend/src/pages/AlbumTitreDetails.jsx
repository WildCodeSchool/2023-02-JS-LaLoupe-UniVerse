import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function AlbumDetails({ token }) {
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
  }, [id]);

  if (!albumTitreDetails) {
    return <p>Loading album</p>;
  }

  return (
    <div>
      <figure className=" flex-col   ">
        <div className=" md:flex md:ml-80">
          <div className="flex justify-center md:justify-start">
            <img
              className="w-48 md:w-80 "
              src={albumTitreDetails.images[0].url}
              alt={albumTitreDetails.name}
            />
          </div>
          <figcaption className="flex-col ml-12 md:ml-10 md:flex-col ">
            <h3 className="font-bold  mt-5 text-sm md:mb-6 md:text-xl ">
              Album
            </h3>

            <h2 className="font-bold mt-2 text-xl mb-3 text-white/70 md:text-5xl md:mb-8">
              {albumTitreDetails.name}
            </h2>
            <h3>{albumTitreDetails.id.name}</h3>
            <div className="flex text-xl md:justify-start">
              <p className="mr-8 md:text-2xl">
                {albumTitreDetails.artists[0].name}
              </p>
              <p className=" mr-6 md:ml-8 md:text-2xl">
                {new Date(albumTitreDetails.release_date).getFullYear()}
              </p>
              <p className="invisible md:visible md: md:ml-8 md:text-2xl">
                {albumTitreDetails.total_tracks} Titres
              </p>
            </div>
          </figcaption>
        </div>

        <div className="flex-col mt-4 ml-12 justify-center md:ml-80 md:mt-10 ">
          {albumTitreDetails.tracks.items.map((item) => (
            <div className="flex justify-between mr-12">
              <p className=" mt-2 text-sm md:text-xl " key={item.id}>
                {item.track_number} {item.name}{" "}
              </p>
              <p className=" text-sm">
                {parseFloat(item.duration_ms / 60000).toFixed(2)} min
              </p>
            </div>
          ))}
        </div>
      </figure>
      <p className="ml-12 mt-8">Vous devriez aussi aimer</p>
    </div>
  );
}

AlbumDetails.propTypes = {
  token: PropTypes.string.isRequired,
};
