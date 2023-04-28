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

  const convertNumberMsEnMin = (number) => {
    const min = Math.floor(number / 60000);
    const reste = number % 60000;
    return `${min}:${Math.floor(reste / 1000)
      .toString()
      .padStart(2, "0")}`;
  };

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

  useEffect(() => {
    if (token !== "") {
      getOneArtist();
      getOneAlbum();
      getOneTracks();
      getRelatedArtist();
    }
  }, [id]);

  if (!artist) {
    return <p>Loading artiste</p>;
  }

  if (!tracks) {
    return <p>Loading tracks</p>;
  }

  if (!album) {
    return <p>Loading album</p>;
  }

  if (!relatedArtist) {
    return <p>Loading related artist</p>;
  }

  return (
    <div>
      <figure className="flex flex-col mr-4 ml-4 mt-5 bg-pink-900/20 md:justify-center md:pt-12 md:mt-12 md:ml-80 md:mr-14  ">
        <div className="  md:bg-pink-600/20 p-8 md:flex md:ml-20 md:mr-20 md:h-80">
          <div className="flex md:w-60 justify-center md:justify-start">
            <img
              className=" w-46 h-46 md:w-64 md:h-64 "
              id={artist.id}
              src={artist.images[0].url}
              alt={artist.images ? artist.name : null}
            />
          </div>
          <div>
            <figcaption className="flex flex-col md:ml-14  md:flex-col ">
              <h3 className="font-bold text-white/70 mt-5 text-sm md:mb-1 md:text-xl ">
                Artiste
              </h3>
              <h2 className="font-bold mt-2 text-base mb-1 text-white md:text-3xl md:mb-5">
                {artist.name}
              </h2>
            </figcaption>
          </div>
        </div>

        <div className="flexflex-col ml-6 mr-6 justify-center md:ml-20 md:mt-10 ">
          <h2 className="mt-6 ml-2 text-2xl mb-5">Ses plus grands Hits</h2>
          {tracks.tracks.map((item) => (
            <Link to={`/search/title/${item.id}`}>
              <div className="flex justify-between mt-1">
                <p className="  text-sm md:text-lg md:ml-8 " key={item.id}>
                  {item.name}{" "}
                </p>
                <p className=" text-sm md:text-lg md:mr-24">
                  {convertNumberMsEnMin(item.duration_ms)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </figure>

      <section>
        <CardList dataAlbums={album.items} title="Discographie" />
        <CardListArtiste
          dataArtist={relatedArtist.artists}
          title="Vous devriez aussi aimer"
        />
      </section>
    </div>
  );
}

ArtistDetail.propTypes = {
  token: PropTypes.string.isRequired,
};
