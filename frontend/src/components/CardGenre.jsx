import PropTypes from "prop-types";

export default function CardGenre({ imgSrc, name }) {
  return (
    <section className="gap-4 px-2 overflow-x-auto flex">
      <figure className=" flex-none bg-neutral-900 hover:bg-pink-900/30 duration-150 h-22 rounded-md py-1 pb-1 px-2 w-36 sm:h-56 sm:w-44 md:h-64 md:w-56">
        <img
          className="rounded-md md:w-48 m-auto sm:py-2 md:rounded-md sm:w-36"
          src={imgSrc}
          alt={name}
        />
        <figcaption className="text-center text-white/60 space-y-0.5 pt-1">
          <h2 className="font-bold text-md/4 text-white/70 sm:text-base md:text-lg/3">
            {name}{" "}
          </h2>
        </figcaption>
      </figure>
    </section>
  );
}

CardGenre.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
