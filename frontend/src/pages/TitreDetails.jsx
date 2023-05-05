import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import CardListTitres from "../components/CardListTitres";

export default function TitreDetails({ token }) {
  const [titreDetails, setTitreDetails] = useState();
  const [artisteDetail, setArtisteDetail] = useState();
  const [albumDetails, setAlbumDetails] = useState();
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

  // appel API pour récupérer les informations d'un titre selon son ID

  const getOneTitle = () => {
    const albumParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`https://api.spotify.com/v1/tracks/${id}`, albumParameters)
      .then((response) => response.json())
      .then((titreData) => {
        setTitreDetails(titreData);

        // appel API pour récupérer les informations de l'artiste lié au titre

        fetch(
          `https://api.spotify.com/v1/artists/${titreData.artists[0].id}`,
          albumParameters
        )
          .then((resp) => resp.json())
          .then((artisteData) => {
            setArtisteDetail(artisteData);
          })
          .catch((err) => console.error(err));

        // appel API pour récupérer les informations de l'album lié au titre

        fetch(
          `https://api.spotify.com/v1/albums/${titreData.album.id}`,
          albumParameters
        )
          .then((response3) => response3.json())
          .then((albumData) => {
            setAlbumDetails(albumData);
          })
          .then(
            // appel API pour récupérer les recommendations liées à l'artiste et au titre

            fetch(
              `https://api.spotify.com/v1/recommendations?seed_artists=${titreData.artists[0].id}&seed_tracks=${id}&limit=20&market=FR`,
              albumParameters
            )
              .then((r) => r.json())
              .then((recommendationsData) => {
                setRecommendationDetails(recommendationsData);
              })
              .catch((err) => console.error(err))
          )
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  // la fonction est appelée à chaque changement d'ID sous réserve d'avoir le token nécessaire

  useEffect(() => {
    if (token !== "") {
      getOneTitle();
      window.scroll(0, 0);
    }
  }, [id]);

  // messages de chargement le temps de récupérer les informations par l'API

  if (!titreDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center mt-20 md:ml-36 md:mt-2">
        <p className="md:text-xl mb-20 ">Chargement des titres...</p>
        <span className="loader  " />
      </div>
    );
  }
  if (!artisteDetail) {
    return (
      <div className="min-h-screen flex flex-col items-center mt-20  md:ml-36 md:mt-2">
        <p className="md:text-xl mb-20 ">Chargement des titres...</p>
        <span className="loader  " />
      </div>
    );
  }
  if (!albumDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center mt-20 md:ml-36 md:mt-2">
        <p className="md:text-xl mb-20 ">Chargement des albums...</p>
        <span className="loader  " />
      </div>
    );
  }
  if (!recommendationDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center mt-20  md:ml-36 md:mt-2">
        <p className=" md:text-xl mb-20 ">Chargement des recommendations...</p>
        <span className="loader  " />
      </div>
    );
  }

  return (
    <main>
      <figure className="card-light rounded-lg  flex flex-col mr-4 ml-4 my-5 pb-5 bg-pink-900/20 md:justify-center md:py-12 md:my-12 md:ml-60 lg:ml-80 md:mr-14  ">
        <div className=" card-light-second rounded-lg  md:bg-pink-600/20 p-8  md:ml-20 md:mr-20 lg:flex lg:gap-8 lg:justify-around">
          <div className="flex justify-center items-center">
            <img
              className=" w-10/12 sm:w-7/12 md:w-auto md:h-auto lg:w-52 lg:h-auto lg:items-center"
              src={titreDetails.album.images[0].url}
              alt={titreDetails.name}
            />
          </div>
          <div>
            <figcaption className="flex flex-col  md:flex-col lg:ml-0 ">
              <h3 className="card-light-second font-bold text-white/70 mt-5 text-sm md:mb-1 md:text-xl ">
                Titre
              </h3>
              <h2 className="card-light-second font-bold mt-2 text-base mb-1 text-white md:text-3xl md:mb-5">
                {titreDetails.name}
              </h2>
              <p className="titleTracks">
                {convertNumberMsEnMin(titreDetails.duration_ms)}
              </p>
            </figcaption>
            <Link to={`/search/artist/${artisteDetail.id}`}>
              <div className="flex items-center font-bold text-base mt-4 md:mt-9 text-white/70 md:text-xl md:justify-start">
                <img
                  className="rounded-full w-16 h-16 md:w-16 md:h-16 mr-4"
                  src={
                    artisteDetail.images[0].url
                      ? artisteDetail.images[0].url
                      : null
                  }
                  alt={titreDetails.artists[0].name}
                />
                <div>
                  <p className=" card-light-second text-sm  md:text-lg p-2 rounded-md ">
                    {titreDetails.artists[0].name}
                  </p>{" "}
                  <Link to={`/search/album/${titreDetails.album.id}`}>
                    <p className="card-light-second text-base p-2 rounded-md">
                      {titreDetails.album.name} /{" "}
                      {titreDetails.album.release_date.slice(0, 4)}
                    </p>
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <section>
          <h2 className="titleTracks mx-6 md:mx-24 my-8 text-xl">
            Dans le même album
          </h2>
          {albumDetails.tracks.items.map((track) => (
            <Link to={`/search/title/${track.id}`}>
              <div
                key={`titres${track.id}`}
                className="flex justify-between mt-1 md:mx-24 mx-6"
              >
                <p className=" titleTracks text-sm md:text-lg ">{track.name}</p>
                <p className="titleTracks text-sm md:text-lg ">
                  {convertNumberMsEnMin(track.duration_ms)}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </figure>

      {recommendationDetails !== "" && (
        <CardListTitres
          dataAlbums={recommendationDetails.tracks}
          title="Vous devriez aimer"
          id={id}
        />
      )}

      <div className=" mb-16 md:hidden" />
    </main>
  );
}

TitreDetails.propTypes = {
  token: PropTypes.string.isRequired,
};
