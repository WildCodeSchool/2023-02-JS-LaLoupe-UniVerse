import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import CardGenre from "./CardGenre";
import genreAPI from "../data/genreAPI";
import arrow from "../assets/FlecheIcons/chevron.png";

export default function CardListGenre({ id }) {
  const sliderGenreRef = useRef();

  function scrollLeft() {
    const width = sliderGenreRef.current.childNodes[0].offsetWidth;
    sliderGenreRef.current.scrollBy(-(width * 4 + 12), 0);
  }

  function scrollRight() {
    const width = sliderGenreRef.current.childNodes[0].offsetWidth;
    sliderGenreRef.current.scrollBy(width * 4 + 12, 0);
  }

  useEffect(() => {
    scrollLeft();
    scrollLeft();
    scrollLeft();
    scrollLeft();
    scrollLeft();
  }, [id]);

  return (
    <div className="relative  md:ml-[180px] lg:ml-[236px] md:pr-5 md:pl-5">
      <h1 className="mb-4 text sm:text-xl md:text-2xl font-bold">Genres</h1>
      <div
        ref={sliderGenreRef}
        id="sliderGenre"
        className="flex gap-3 overflow-x-auto"
      >
        {genreAPI.map((genre) => (
          <CardGenre key={genre.name} imgSrc={genre.image} name={genre.name} />
        ))}
      </div>
      <button className="precedentGenre" onClick={scrollLeft} type="button">
        <img className="arrow" src={arrow} alt="fleche-gauche" />
      </button>
      <button className="suivantGenre" onClick={scrollRight} type="button">
        <img className="arrow" src={arrow} alt="fleche-droite" />
      </button>
    </div>
  );
}

CardListGenre.defaultProps = {
  id: "",
};

CardListGenre.propTypes = {
  id: PropTypes.string,
};
