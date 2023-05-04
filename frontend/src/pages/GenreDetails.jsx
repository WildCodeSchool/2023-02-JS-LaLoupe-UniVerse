import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import ArtistImage from "../components/ArtistImage";
import arrow from "../assets/FlecheIcons/chevron.png";

export default function GenreDetails({ token, className }) {
  const [tracks, setTracks] = useState();
  const { genre } = useParams();
  const { id } = useParams();

  const convertNumberMsEnMin = (number) => {
    const min = Math.floor(number / 60000);
    const reste = number % 60000;
    return `${min}:${Math.floor(reste / 1000)
      .toString()
      .padStart(2, "0")}`;
  };

  const sliderListRef = useRef();

  function scrollLeft() {
    const width = sliderListRef.current.childNodes[0].offsetWidth;
    sliderListRef.current.scrollBy(-(width * 4 + 12), 0);
  }

  function scrollRight() {
    const width = sliderListRef.current.childNodes[0].offsetWidth;
    sliderListRef.current.scrollBy(width * 4 + 12, 0);
  }

  const sliderRef = useRef();

  function scrollToLeft() {
    const width = sliderRef.current.childNodes[0].offsetWidth;
    sliderRef.current.scrollBy(-(width * 4 + 12), 0);
  }

  function scrollToRight() {
    const width = sliderRef.current.childNodes[0].offsetWidth;
    sliderRef.current.scrollBy(width * 4 + 12, 0);
  }

  const getOneTracks = () => {
    const genreParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      `https://api.spotify.com/v1/recommendations?market=FR&limit=50&seed_genres=${genre.toLowerCase()}`,
      genreParameters
    )
      .then((response) => response.json())
      .then((tracksData) => setTracks(tracksData))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (token !== "") {
      getOneTracks();
    }
  }, [id]);

  if (!tracks) {
    return (
      <div className="min-h-screen flex  flex-col items-center mt-20  md:ml-36 md:mt-2">
        <p className="md:text-xl mb-20 ">Chargement des titres...</p>
        <span className="loader  " />
      </div>
    );
  }

  const classes = className
    ? `card-genre bg-neutral-900 hover:bg-pink-600/30 duration-150 h-64 rounded-md flex-none m-0 py-1 pb-1 px-2 w-56 sm:h-56 sm:w-44 md:h-64 md:w-56 ${className}`
    : "card-genre bg-neutral-900 hover:bg-pink-600/30 duration-150 h-36 rounded-md flex-none m-0 py-1 pb-1 px-2 w-28 sm:h-56 sm:w-44 md:h-64 md:w-56";

  return (
    <main className="mt-5">
      <section className="sm:flex sm:justify-center md:ml-[236px] mb-6 md:pl-5">
        <div className="sm:grid sm:grid-cols-2 mr-3 sm:gap-2 flex justify-center flex-wrap md:pr-5 md:pl-5">
          {tracks.tracks.slice(0, 10).map((track) => (
            <Link
              to={`/search/title/${track.id}`}
              className="flex gap-4 bg-neutral-900 rounded-lg hover:bg-pink-600/30 mb-2 sm:mb-0 w-10/12 sm:w-full h-20"
            >
              <figure className="card-title flex w-full">
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  className="rounded-l-lg"
                />
                <div className="flex justify-between w-full mr-1 relative">
                  <figcaption className="flex flex-col justify-evenly ml-1 w-8/12 overflow-x-hidden">
                    <h2 className="font-bold text-xs/4 text-white/70 sm:text-base md:text-base truncate">
                      {track.name}
                    </h2>
                    <h3 className="titleTracks text-xs/3 truncate">
                      {track.artists[0].name}
                    </h3>
                    <p className="titleTracks text-[8px] sm:text-xs">
                      {track.album.release_date.slice(0, 4)}
                    </p>
                  </figcaption>
                  <p className="titleTracks my-auto font-bold absolute right-0  top-1/4">
                    {convertNumberMsEnMin(track.duration_ms)}
                  </p>
                </div>
              </figure>
            </Link>
          ))}
        </div>
      </section>

      <div className=" relative md:ml-[236px] mt-2 md:pr-5 md:pl-5 md:mr-3 mx-3">
        <h1 className="mb-4  text sm:text-xl md:text-2xl">Albums</h1>
        <div
          ref={sliderListRef}
          id="sliderList"
          className="flex gap-3 overflow-x-auto"
        >
          {tracks.tracks.slice(10, 30).map((track) => (
            <Link to={`/search/album/${track.album.id}`}>
              <figure className={classes}>
                <img
                  className="rounded-md md:w-48 m-auto sm:py-2 md:py-0 md:rounded-md sm:w-36"
                  src={track.album.images[0].url}
                  alt={track.album.name}
                />
                <figcaption className=" text-center text-white/60 space-y-0.5">
                  <h2 className="font-bold text-xs/4 text-white/70 sm:text-base md:text-base truncate">
                    {track.album.name}
                  </h2>
                  <h3 className="text-xs/3 truncate">
                    {track.album.artists[0].name}
                  </h3>
                  <p className="text-[8px] sm:text-xs">
                    {track.album.release_date.slice(0, 4)}
                  </p>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
        <button className="precedent" onClick={scrollLeft} type="button">
          <img className="arrow" src={arrow} alt="fleche-gauche" />
        </button>
        <button className="suivant" onClick={scrollRight} type="button">
          <img className="arrow" src={arrow} alt="fleche-droite" />
        </button>
      </div>

      <section>
        <div className="mx-3 flex-col relative md:ml-[236px] mt-2 mb-1 md:pr-5 md:pl-5  ">
          <h1 className=" mb-4 text sm:text-xl md:text-2xl">Artistes</h1>
          <div>
            <div
              ref={sliderRef}
              id="slider"
              className="flex gap-3 overflow-x-auto "
            >
              {tracks.tracks.slice(30, 50).map((track) => (
                <ArtistImage
                  id={track.artists[0].id}
                  token={token}
                  key={`genres${track.id}`}
                />
              ))}
              <button
                className="precedent"
                onClick={scrollToLeft}
                type="button"
              >
                <img className="arrow" src={arrow} alt="fleche-gauche" />
              </button>
              <button className="suivant" onClick={scrollToRight} type="button">
                <img className="arrow" src={arrow} alt="fleche-droite" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className=" mb-16 sm:hidden" />
    </main>
  );
}

GenreDetails.defaultProps = {
  className: "",
};

GenreDetails.propTypes = {
  token: PropTypes.string.isRequired,
  className: PropTypes.string,
};
