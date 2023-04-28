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
      <figure className="bg-neutral-900 hover:bg-pink-600/30 duration-150 rounded-md py-1 pb-1 px-2 h-64 w-56 m-auto mb-5">
        <img
          className="rounded-md m-auto"
          src={titreDetails.album.images[0].url}
          alt={titreDetails.name}
        />
        <figcaption className="flex justify-between items-center text-white/60 mt-2">
          <h2 className=" text-center font-bold text-md text-white/70 truncate">
            {titreDetails.name}
          </h2>
          <p className="font-bold">
            {convertNumberMsEnMin(titreDetails.duration_ms)}
          </p>
        </figcaption>
      </figure>
      <Link to={`/search/artiste/${artisteDetail.id}`}>
        <h2 className="text-center">Artiste</h2>
        <figure className="bg-neutral-900 hover:bg-pink-600/30 flex justify-between items-center duration-150 rounded-md py-1 px-2 h-32 w-10/12 m-auto">
          <img
            className="rounded-full w-24 h-24 md:w-48 md:h-48 sm:w-36 sm:h-36"
            src={
              artisteDetail.images[0].url ? artisteDetail.images[0].url : null
            }
            alt={titreDetails.artists[0].name}
          />
          <figcaption className="text-white/60 truncate">
            <h2 className=" text-center font-bold text-md text-white/70 truncate">
              {titreDetails.artists[0].name}
            </h2>
          </figcaption>
        </figure>
      </Link>
      <section>
        <h2 className="text-center">Album</h2>
        <Link to={`/search/album/${titreDetails.album.id}`}>
          <figure className="bg-neutral-900 hover:bg-pink-600/30 flex justify-between items-center duration-150 rounded-md py-1 px-2 w-10/12 m-auto">
            <img
              className="w-9 h-9"
              src={
                titreDetails.album.images[0].url
                  ? titreDetails.album.images[0].url
                  : null
              }
              alt={titreDetails.album.name}
            />
            <figcaption>
              <h2>{titreDetails.album.name}</h2>
              <p>{titreDetails.album.release_date.slice(0, 4)}</p>
            </figcaption>
          </figure>
        </Link>
        {albumDetails.tracks.items.map((track) => (
          <div
            key={track.id}
            className="flex justify-between opacity-60 w-10/12 m-auto"
          >
            <p>{track.name}</p>
            <p>{convertNumberMsEnMin(track.duration_ms)}</p>
          </div>
        ))}
      </section>

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
