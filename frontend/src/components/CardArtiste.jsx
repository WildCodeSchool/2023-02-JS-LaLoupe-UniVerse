import PropTypes from "prop-types";

export default function CardArtiste({ imgSrc, artisteName }) {
  return (
    <figure className="bg-neutral-900 hover:bg-pink-900/30 duration-150 h-36 rounded-md flex-none m-0 py-1 pb-3 px-2 w-28 sm:h-56 sm:w-44 md:h-64 md:w-56 ">
      <img
        className="rounded-full md:w-44 md:h-44
         m-auto sm:py-2 md:rounded-full sm:w-36 sm:h-18"
        src={imgSrc}
        alt={artisteName}
      />
      <figcaption>
        <h2 className="font-bold text-xs/4 mt-4 text-center text-white/70 sm:text-base md:text-lg/3">
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
