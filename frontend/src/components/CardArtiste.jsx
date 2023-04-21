import PropTypes from "prop-types";

export default function CardArtiste({ imgSrc, artisteName }) {
  return (
    <figure className="bg-neutral-900 hover:bg-pink-600/30 duration-150 h-36 rounded-md flex-none m-0 py-1 pb-2 px-2 w-28 sm:h-56 sm:w-44 md:h-64 md:w-56 ">
      <img
        className="rounded-full w-24 h-24  md:w-48 md:h-52 
         m-auto sm:py-2 md:rounded-full sm:w-36 sm:h-36"
        src={imgSrc}
        alt={artisteName}
      />
      <figcaption>
        <h2 className="font-bold text-xs/4 mt-4 h-8  text-center text-white/70 sm:text-base md:text-xl/3 truncate">
          {artisteName}
        </h2>
      </figcaption>
    </figure>
  );
}

CardArtiste.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  artisteName: PropTypes.string.isRequired,
};
