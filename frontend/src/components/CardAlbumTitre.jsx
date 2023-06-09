import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CardAlbumTitre({
  id,
  imgSrc,
  albumName,
  artist,
  release,
  className,
}) {
  const classes = className
    ? `card-title bg-neutral-900 hover:bg-pink-600/30 duration-150 h-64 rounded-md flex-none m-0 py-1 pb-1 px-2 w-56 sm:h-56 sm:w-44 md:h-64 md:w-56 md:max-height-64 ${className}`
    : "card-title bg-neutral-900 hover:bg-pink-600/30 duration-150 h-36 rounded-md flex-none m-0 py-1 pb-1 px-2 w-28 sm:h-56 sm:w-44 md:h-64 md:w-56 md:max-height-64";
  return (
    <Link to={`/search/album/${id}`}>
      <figure className={classes}>
        <img
          className="rounded-md md:w-48 m-auto sm:py-2 md:py-0 md:rounded-md sm:w-36"
          src={imgSrc}
          alt={albumName}
        />
        <figcaption className="text-center text-white/60 space-y-0.5">
          <h2 className="font-bold text-xs/4 text-white/70 sm:text-base md:text-base truncate">
            {albumName}
          </h2>
          <h3 className="text-xs/3 truncate">{artist}</h3>
          <p className="text-[8px] sm:text-xs">{release}</p>
        </figcaption>
      </figure>
    </Link>
  );
}

CardAlbumTitre.defaultProps = {
  className: "",
};

CardAlbumTitre.propTypes = {
  id: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
  className: PropTypes.string,
};
