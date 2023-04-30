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

  const convertNumberMsEnMin = (number) => {
    const min = Math.floor(number / 60000);
    const reste = number % 60000;
    return `${min}:${Math.floor(reste / 1000)
      .toString()
      .padStart(2, "0")}`;
  };

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
        fetch(
          `https://api.spotify.com/v1/artists/${titreData.artists[0].id}`,
          albumParameters
        )
          .then((resp) => resp.json())
          .then((artisteData) => {
            setArtisteDetail(artisteData);
          })
          .catch((err) => console.error(err));
        fetch(
          `https://api.spotify.com/v1/albums/${titreData.album.id}`,
          albumParameters
        )
          .then((response3) => response3.json())
          .then((albumData) => {
            setAlbumDetails(albumData);
          })
          .then(
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

  useEffect(() => {
    if (token !== "") {
      getOneTitle();
    }
  }, [id]);

  if (!titreDetails) {
    return <p>Chargement titre</p>;
  }
  if (!artisteDetail) {
    return <p>Chargement artiste</p>;
  }
  if (!albumDetails) {
    return <p>Chargement album</p>;
  }
  if (!recommendationDetails) {
    return <p>Chargement des recommendations</p>;
  }

  return (
    <main>
      <figure className="card-light flex flex-col mr-4 ml-4 my-5 pb-5 bg-pink-900/20 md:justify-center md:py-12 md:my-12 md:ml-80 md:mr-14  ">
        <div className=" card-light-second md:bg-pink-600/20 p-8 md:flex md:ml-20 md:mr-20 md:h-80">
          <div className="flex md:w-60 justify-center md:justify-start">
            <img
              className=" w-46 h-46 md:w-64 md:h-64"
              src={titreDetails.album.images[0].url}
              alt={titreDetails.name}
            />
          </div>
          <div>
            <figcaption className=" flex flex-col md:ml-14  md:flex-col ">
              <h3 className="card-light-second font-bold text-white/70 mt-5 text-sm md:mb-1 md:text-xl ">
                Titre
              </h3>
              <h2 className="card-light-second font-bold mt-2 text-base mb-1 text-white md:text-3xl md:mb-5">
                {titreDetails.name}
              </h2>
              <p>{convertNumberMsEnMin(titreDetails.duration_ms)}</p>
            </figcaption>
            <Link to={`/search/artist/${artisteDetail.id}`}>
              <div className="flex items-center font-bold text-base mt-4 md:mt-9 text-white/70 md:text-xl md:ml-12 md:justify-start">
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
                  <p className="card-light-second text-sm  md:text-lg p-2 rounded-md ">
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
          <h2 className=" mx-6 md:mx-24 my-8 text-xl">Dans le même album</h2>
          {albumDetails.tracks.items.map((track) => (
            <Link to={`/search/title/${track.id}`}>
              <div
                key={track.id}
                className="flex justify-between mt-1 md:mx-24 mx-6"
              >
                <p className="  text-sm md:text-lg ">{track.name}</p>
                <p className=" text-sm md:text-lg ">
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
        />
      )}

      <div className=" mb-16 sm:hidden" />
    </main>
  );
}

TitreDetails.propTypes = {
  token: PropTypes.string.isRequired,
};
