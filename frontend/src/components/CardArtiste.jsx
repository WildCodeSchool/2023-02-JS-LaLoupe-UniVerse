import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CardArtiste({ imgSrc, artisteName, id }) {
  return (
    <Link to={`/search/artist/${id}`}>
      <figure className="card-artiste bg-neutral-900 hover:bg-pink-600/30 duration-150 h-36 rounded-md flex-none m-0 py-1 pb-2 px-2 w-28 sm:h-56 sm:w-44 md:h-64 md:w-56 ">
        <img
          className="rounded-full w-24 h-24  md:w-48 md:h-48 
         m-auto sm:py-2 md:rounded-full sm:w-36 sm:h-36 "
          id="CardAlbum"
          src={imgSrc}
          alt={imgSrc ? artisteName : null}
        />
        <figcaption>
          <h2 className=" font-bold text-xs/4 mt-3 h-8 py-2 text-center text-white/70 sm:text-base md:text-xl/3 truncate">
            {artisteName}
          </h2>
        </figcaption>
      </figure>
    </Link>
  );
}

CardArtiste.defaultProps = {
  imgSrc: "",
};

CardArtiste.propTypes = {
  imgSrc: PropTypes.string,
  artisteName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
