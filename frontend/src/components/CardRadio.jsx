import { useState, useRef } from "react";
import PropTypes from "prop-types";
import imgRadio from "../assets/image-radio.jpg";
import playIcon from "../assets/play.png";
import pauseIcon from "../assets/pause.png";

export default function CardRadio({ favicon, name, country, url }) {
  const [playRadio, setPlayRadio] = useState(false);
  const audioRef = useRef();

  const handlePlayRadio = () => {
    if (playRadio === false) {
      setPlayRadio(true);
      audioRef.current.play();
    } else {
      setPlayRadio(false);
      audioRef.current.pause();
    }
  };

  return (
    <div>
      <figure>
        {favicon ? (
          <div className="h-40 flex items-center mb-5">
            <img
              src={favicon}
              alt={name}
              className="rounded-md md:w-40 m-auto sm:py-2 md:py-0 md:rounded-md sm:w-36  "
            />
          </div>
        ) : (
          <div className="h-40 flex items-center mb-5">
            <img
              src={imgRadio}
              alt="radio-par-defaut"
              className="rounded-md md:w-40 m-auto sm:py-2 md:py-0 md:rounded-md sm:w-36  "
            />
          </div>
        )}
        <figcaption className="text-center text-white/60 space-y-0.5 flex justify-between items-center">
          <div className="w-8/12 text-start px-2">
            <h2 className="font-bold text-xs/4 text-white/70 sm:text-base md:text-base truncate">
              {name}
            </h2>
            <p className="text-[8px] sm:text-xs">{country}</p>
          </div>
          <div>
            <button type="button" onClick={handlePlayRadio}>
              {playRadio === false ? (
                <img src={playIcon} alt="play" className="w-16" />
              ) : (
                <img src={pauseIcon} alt="pause" className="w-16" />
              )}
            </button>
          </div>
        </figcaption>
      </figure>
      <audio ref={audioRef}>
        <track default kind="captions" srcLang="fr" src={url} />
        <source src={url} type="audio/mpeg" />
        Your browser does not support this audio format.
      </audio>
    </div>
  );
}

CardRadio.propTypes = {
  favicon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
