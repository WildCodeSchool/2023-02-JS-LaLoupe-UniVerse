import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import CardListTitres from "../components/CardListTitres";

export default function AlbumTitreDetails({ token }) {
  const [albumTitreDetails, setAlbumTitreDetails] = useState();
  const [artisteDetail, setArtisteDetail] = useState();
  const [recommendationDetails, setRecommendationDetails] = useState();
  const { id } = useParams();

  const convertNumberMsEnMin = (number) => {
    const min = Math.floor(number / 60000);
    const reste = number % 60000;
    return `${min}:${Math.floor(reste / 1000)
      .toString()
      .padStart(2, "0")}`;
  };

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
      .then((albumData) => {
        setAlbumTitreDetails(albumData);
        fetch(
          `https://api.spotify.com/v1/artists/${albumData.artists[0].id}`,
          albumParameters
        )
          .then((resp) => resp.json())
          .then((artisteData) => {
            setArtisteDetail(artisteData);
          })
          .catch((err) => console.error(err));

        fetch(
          `https://api.spotify.com/v1/recommendations?seed_artists=${albumData.artists[0].id}&seed_tracks=${id}&limit=20&market=FR`,
          albumParameters
        )
          .then((r) => r.json())
          .then((recommendationsData) => {
            setRecommendationDetails(recommendationsData);
          })
          .catch((err) => console.error(err));
      })
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
  if (!artisteDetail) {
    return <p>Loading artiste</p>;
  }
  if (!recommendationDetails) {
    return <p>Chargement des recommendations</p>;
  }

  return (
    <div className="card">
      <figure className="card-light flex flex-col mr-4 ml-4 mt-5 pb-8 bg-pink-900/20 md:justify-center md:pt-12 md:mt-12 md:ml-80 md:mr-14  ">
        <div className=" card-light-second  md:bg-pink-600/20 p-8 md:flex md:ml-20 md:mr-20 md:h-80">
          <div className="flex md:w-60 justify-center md:justify-start">
            <img
              className=" w-46 h-46 md:w-64 md:h-64 "
              src={albumTitreDetails.images[0].url}
              alt={albumTitreDetails.name}
            />
          </div>
          <div>
            <figcaption className="flex flex-col md:ml-14  md:flex-col ">
              <h3 className="card-light-second font-bold text-white/70 mt-5 text-sm md:mb-1 md:text-xl ">
                Album
              </h3>
              <h2 className="card-light-second font-bold mt-2 text-base mb-1 text-white md:text-3xl md:mb-5">
                {albumTitreDetails.name}
              </h2>
              <h3>{albumTitreDetails.id.name}</h3>
              <div className="flex">
                <p className="text-sm  md:text-lg">
                  {new Date(albumTitreDetails.release_date).getFullYear()}
                </p>
                <p className="ml-5 invisible">-</p>

                <p className="invisible md:visible md: md:ml-5 md:text-lg ">
                  {albumTitreDetails.total_tracks} Titres
                </p>
              </div>
            </figcaption>
            <Link to={`/search/artist/${artisteDetail.id}`}>
              <div className="card-light-second flex items-center font-bold text-base mt-4 md:mt-9 text-white/70 md:text-xl md:ml-12 md:justify-start">
                <img
                  className="rounded-full w-12 h-12 md:w-16 md:h-16 mr-4"
                  src={artisteDetail.images[0].url}
                  alt={artisteDetail.name}
                />
                <p className="  text-sm  md:text-lg  ">
                  {albumTitreDetails.artists[0].name}
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="flexflex-col ml-6 mr-6 justify-center md:ml-20 md:mt-10 ">
          {albumTitreDetails.tracks.items.map((item) => (
            <Link to={`/search/title/${item.id}`}>
              <div className="flex justify-between mt-1">
                <p className="  text-sm md:text-lg md:ml-8 " key={item.id}>
                  {item.track_number} {" . "} {item.name}
                </p>

                <p className=" text-sm md:text-lg md:mr-24">
                  {convertNumberMsEnMin(item.duration_ms)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </figure>
      {recommendationDetails !== "" && (
        <CardListTitres
          dataAlbums={recommendationDetails.tracks}
          title="Vous devriez aimer"
        />
      )}

      <div className=" mb-16 sm:hidden" />
    </div>
  );
}

AlbumTitreDetails.propTypes = {
  token: PropTypes.string.isRequired,
};
