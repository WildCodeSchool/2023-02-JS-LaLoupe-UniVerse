import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import CardList from "../components/CardList";
import CardListArtiste from "../components/CardListArtiste";

export default function ArtistDetail({ token }) {
  const [artist, setArtist] = useState();
  const [tracks, setTracks] = useState();
  const [album, setAlbum] = useState();
  const [relatedArtist, setRelatedArtist] = useState();
  const { id } = useParams();

  // fonction pour afficher les millisecondes en "minutes:secondes"

  const convertNumberMsEnMin = (number) => {
    const min = Math.floor(number / 60000);
    const reste = number % 60000;
    return `${min}:${Math.floor(reste / 1000)
      .toString()
      .padStart(2, "0")}`;
  };

  // appel API pour récupérer les informations de l'artiste selon son ID

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

  // appel API pour récupérer les informations d'un titre selon son ID

  const getOneTracks = () => {
    const artistParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=FR`,
      artistParameters
    )
      .then((response) => response.json())
      .then((tracksData) => setTracks(tracksData))
      .catch((err) => console.error(err));
  };

  // appel API pour récupérer les informations de l'album selon son ID

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

  // appel API pour récupérer les informations d'artistes recommandés selon un artiste via son ID

  const getRelatedArtist = () => {
    const artistParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      `https://api.spotify.com/v1/artists/${id}/related-artists?market=FR`,
      artistParameters
    )
      .then((response) => response.json())
      .then((artistData) => setRelatedArtist(artistData))
      .catch((err) => console.error(err));
  };

  // les fonctions sont appelées à chaque changement d'ID sous réserve d'avoir le token nécessaire

  useEffect(() => {
    if (token !== "") {
      getOneArtist();
      getOneAlbum();
      getOneTracks();
      getRelatedArtist();
      window.scroll(0, 0);
    }
  }, [id]);

  // messages de chargement le temps de récupérer les informations par l'API

  if (!artist) {
    return (
      <div className="min-h-screen flex flex-col items-center mt-20  md:ml-36 md:mt-2">
        <p className=" mb-20 ">Chargement des artistes...</p>
        <span className="loader  " />
      </div>
    );
  }

  if (!tracks) {
    return (
      <div className="min-h-screen flex flex-col items-center mt-20 md:ml-36 md:mt-2">
        <p className="md:text-xl mb-20 ">Chargement des titres...</p>
        <span className="loader  " />
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen flex flex-col items-center mt-20 md:ml-36 md:mt-2">
        <p className="md:text-xl mb-20 ">Chargement des albums...</p>
        <span className="loader  " />
      </div>
    );
  }

  if (!relatedArtist) {
    return (
      <div className="min-h-screen flex flex-col items-center mt-20 md:ml-36 md:mt-2">
        <p className="md:text-xl mb-20 ">Chargement des recommandations...</p>
        <span className="loader  " />
      </div>
    );
  }

  return (
    <div>
      <figure className="card-light rounded-lg  flex flex-col mr-4 ml-4 my-5 pb-5 bg-pink-900/20 md:justify-center md:py-12 md:my-12 md:ml-60 lg:ml-80 md:mr-14  ">
        <div className=" card-light-second rounded-lg  md:bg-pink-600/20 p-8  md:ml-20 md:mr-20 lg:flex lg:gap-8 lg:justify-around">
          <div className="flex justify-center items-center">
            <img
              className=" w-10/12 sm:w-7/12 md:w-auto md:h-auto lg:w-52 lg:h-auto lg:items-center "
              id={artist.id}
              src={artist.images[0].url}
              alt={artist.images ? artist.name : null}
            />
          </div>
          <div>
            <figcaption className="flex flex-col md:ml-14  md:flex-col ">
              <h3 className="card-artiste card-light-second font-bold text-white/70 mt-5 text-sm md:mb-1 md:text-xl ">
                Artiste
              </h3>
              <h2 className="card-artiste card-light-second font-bold mt-2 text-base mb-1 text-white md:text-3xl md:mb-5">
                {artist.name}
              </h2>
            </figcaption>
          </div>
        </div>

        <div className="flexflex-col ml-6 mr-6 justify-center md:ml-20 md:mt-10 ">
          <h2 className="titleTracks text-2xl mb-5 md:mb-10">
            Ses plus grands Hits
          </h2>
          {tracks.tracks.map((item) => (
            <Link to={`/search/title/${item.id}`}>
              <div className="flex justify-between mt-1">
                <p
                  className=" titleTracks text-sm md:text-lg md:ml-8 "
                  key={`artistes${item.id}`}
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

      <section>
        <CardList dataAlbums={album.items} title="Discographie" id={id} />
        <CardListArtiste
          dataArtist={relatedArtist.artists}
          title="Vous devriez aussi aimer"
          id={id}
        />
      </section>
      <div className=" mb-16 md:hidden" />
    </div>
  );
}

ArtistDetail.propTypes = {
  token: PropTypes.string.isRequired,
};
