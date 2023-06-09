import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import CardListTitres from "../components/CardListTitres";

export default function AlbumTitreDetails({ token }) {
  const [albumTitreDetails, setAlbumTitreDetails] = useState();
  const [artisteDetail, setArtisteDetail] = useState();
  const [recommendationDetails, setRecommendationDetails] = useState();
  const { id } = useParams();

  // fonction pour afficher les millisecondes en "minutes:secondes"

  const convertNumberMsEnMin = (number) => {
    const min = Math.floor(number / 60000);
    const reste = number % 60000;
    return `${min}:${Math.floor(reste / 1000)
      .toString()
      .padStart(2, "0")}`;
  };

  // appel API pour récupérer les informations de l'album selon son ID

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

        // appel API pour récupérer les informations de l'artiste lié à l'album

        fetch(
          `https://api.spotify.com/v1/artists/${albumData.artists[0].id}`,
          albumParameters
        )
          .then((resp) => resp.json())
          .then((artisteData) => {
            setArtisteDetail(artisteData);
          })
          .catch((err) => console.error(err));

        // appel API pour récupérer les recommandations liées à l'artiste

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

  // la fonction est appelée à chaque changement d'ID sous réserve d'avoir le token nécessaire

  useEffect(() => {
    if (token !== "") {
      getOneAlbum();
      window.scroll(0, 0);
    }
  }, [id]);

  // messages de chargement le temps de récupérer les informations par l'API

  if (!albumTitreDetails) {
    return (
      <div className="min-h-screen flex  flex-col items-center mt-20  md:ml-36 md:mt-2">
        <p className="md:text-xl mb-20 ">Chargement des albums...</p>
        <span className="loader  " />
      </div>
    );
  }
  if (!artisteDetail) {
    return (
      <div className="min-h-screen flex  flex-col items-center mt-20 md:ml-36 md:mt-2">
        <p className="md:text-xl mb-20 ">Chargement des artistes...</p>
        <span className="loader  " />
      </div>
    );
  }
  if (!recommendationDetails) {
    return (
      <div className="min-h-screen flex  flex-col items-center mt-20 md:ml-36 md:mt-2">
        <p className="md:text-xl mb-20 ">Chargement des recommendations...</p>
        <span className="loader  " />
      </div>
    );
  }

  return (
    <div>
      <figure className="card-light rounded-lg flex flex-col mr-4 ml-4 my-5 pb-5 bg-pink-900/20 md:justify-center md:py-12 md:my-12 md:ml-60 lg:ml-80 md:mr-14  ">
        <div className=" card-light-second rounded-lg  md:bg-pink-600/20 p-8  md:ml-20 md:mr-20 lg:flex lg:gap-8 lg:justify-around">
          <div className="flex justify-center items-center">
            <img
              className=" w-10/12 sm:w-7/12 md:w-auto md:h-auto lg:w-52 lg:h-auto lg:items-center"
              src={albumTitreDetails.images[0].url}
              alt={albumTitreDetails.name}
            />
          </div>
          <div>
            <figcaption className="flex flex-col lg:ml-0">
              <h3 className="font-bold text-white/70 mt-5 text-sm md:mb-1 md:text-xl ">
                Album
              </h3>
              <h2 className="card-light-second font-bold mt-2 text-base mb-1 text-white md:text-3xl md:mb-5">
                {albumTitreDetails.name}
              </h2>
              <h3>{albumTitreDetails.id.name}</h3>
              <div className="flex">
                <p className="titleTracks text-sm  md:text-lg">
                  {new Date(albumTitreDetails.release_date).getFullYear()}
                </p>
                <p className="titleTracks ml-5 invisible">-</p>
                <p className="titleTracks invisible md:visible md: md:ml-5 md:text-lg ">
                  {albumTitreDetails.total_tracks} Titres
                </p>
              </div>
            </figcaption>
            <Link to={`/search/artist/${artisteDetail.id}`}>
              <div className="flex items-center font-bold text-base mt-4 md:mt-9 text-white/70 md:text-xl md:justify-start">
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
                <p
                  className="titleTracks text-sm md:text-lg md:ml-8 "
                  key={`albumsTitres${item.id}`}
                >
                  {item.name}
                </p>

                <p className="titleTracks text-sm md:text-lg md:mr-24">
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

      <div className=" mb-16 md:hidden" />
    </div>
  );
}

AlbumTitreDetails.propTypes = {
  token: PropTypes.string.isRequired,
};
