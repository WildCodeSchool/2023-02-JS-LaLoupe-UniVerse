import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CardSearchTitle({
  imgSrc,
  titreName,
  artist,
  release,
  duration,
  id,
}) {
  return (
    <Link
      to={`/search/title/${id}`}
      className="card-light flex gap-4 bg-neutral-900 rounded-lg hover:bg-pink-600/30 mb-2 sm:mb-0 w-10/12 sm:w-full h-20"
    >
      <figure className="flex w-full">
        <img src={imgSrc} alt={titreName} className="rounded-l-lg" />
        <div className="flex justify-between w-full mr-1 relative">
          <figcaption className="flex flex-col justify-evenly ml-1 w-8/12 overflow-x-hidden">
            <h2 className="font-bold text-xs/4 text-white/70 sm:text-base md:text-base truncate">
              {titreName}
            </h2>
            <h3 className="titleTracks text-xs/3 truncate">{artist}</h3>
            <p className="titleTracks text-[8px] sm:text-xs">{release}</p>
          </figcaption>
          <p className="titleTracks my-auto font-bold absolute right-0 top-1/4">
            {duration}
          </p>
        </div>
      </figure>
    </Link>
  );
}

CardSearchTitle.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  titreName: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
