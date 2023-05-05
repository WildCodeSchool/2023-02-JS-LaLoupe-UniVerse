import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CardTitre({
  id,
  imgSrc,
  titreName,
  artist,
  release,
  className,
  duration,
}) {
  const classes = className
    ? `card-title bg-neutral-900 hover:bg-pink-600/30 duration-150 h-64 rounded-md flex-none m-0 py-1 pb-1 px-2 w-56 sm:h-56 sm:w-44 md:h-64 md:w-56 ${className}`
    : " card-title bg-neutral-900 hover:bg-pink-600/30 duration-150 h-36 rounded-md flex-none m-0 py-1 pb-1 px-2 w-28 sm:h-56 sm:w-44 md:h-64 md:w-56";
  return (
    <Link to={`/search/title/${id}`}>
      <figure className={classes}>
        <img
          className="rounded-md md:w-48 m-auto sm:py-2 md:py-0 md:rounded-md sm:w-36"
          src={imgSrc}
          alt={titreName}
        />
        <figcaption className="text-center text-white/60 space-y-0.5">
          <h2 className="font-bold text-xs/4 text-white/70 sm:text-base md:text-base truncate">
            {titreName}
          </h2>
          <h3 className="text-xs/3 truncate">{artist}</h3>
          <div className="text-[8px] sm:text-xs flex justify-center">
            <p className="px-3 ml-5">{release}</p>
            <p className="font-bold px-3">{duration}</p>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}

CardTitre.defaultProps = {
  className: "",
};

CardTitre.propTypes = {
  id: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  titreName: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
  className: PropTypes.string,
  duration: PropTypes.string.isRequired,
};
