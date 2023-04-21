import { useRef } from "react";
import CardGenre from "./CardGenre";
import genreAPI from "../data/genreAPI";

export default function CardListGenre() {
  const sliderGenreRef = useRef();

  function scrollLeft() {
    const width = sliderGenreRef.current.childNodes[0].offsetWidth;
    sliderGenreRef.current.scrollBy(-(width * 4 + 12), 0);
  }

  function scrollRight() {
    const width = sliderGenreRef.current.childNodes[0].offsetWidth;
    sliderGenreRef.current.scrollBy(width * 4 + 12, 0);
  }

  return (
    <div className="relative  md:ml-[236px] md:pr-5 md:pl-5  md:mr-3 mx-3">
      <h1 className="mb-4 text sm:text-xl md:text-2xl">Genres</h1>
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
        <img
          className="arrow"
          src="./src/assets/FlecheIcons/chevron.png "
          alt="fleche-gauche"
        />
      </button>
      <button className="suivantGenre" onClick={scrollRight} type="button">
        <img
          className="arrow"
          src="./src/assets/FlecheIcons/chevron.png "
          alt="fleche-droite"
        />
      </button>
    </div>
  );
}
