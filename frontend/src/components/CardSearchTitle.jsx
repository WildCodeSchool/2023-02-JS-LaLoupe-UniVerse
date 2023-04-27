import PropTypes from "prop-types";

export default function CardSearchTitle({
  imgSrc,
  albumName,
  artist,
  release,
}) {
  return (
    <figure className=" flex gap-4 bg-neutral-900 rounded-lg hover:bg-pink-600/30 mb-2 sm:mb-0 w-10/12 sm:w-full">
      <img src={imgSrc} alt={albumName} className=" w-20 h-20 rounded-l-lg" />
      <figcaption className="flex flex-col justify-evenly truncate">
        <h2 className="font-bold text-xs/4 text-white/70 sm:text-base md:text-base truncate">
          {albumName}
        </h2>
        <h3 className="text-xs/3 truncate">{artist}</h3>
        <p className="text-[8px] sm:text-xs">{release}</p>
      </figcaption>
    </figure>
  );
}

CardSearchTitle.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
};