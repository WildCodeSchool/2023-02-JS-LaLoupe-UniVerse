import PropTypes from "prop-types";
import { useRef } from "react";
import CardArtiste from "./CardArtiste";

export default function CardListArtiste({ dataArtist, title }) {
  const sliderRef = useRef();
  function scrollLeft() {
    const width = sliderRef.current.childNodes[0].offsetWidth;
    sliderRef.current.scrollBy(-(width * 4 + 12), 0);
  }

  function scrollRight() {
    const width = sliderRef.current.childNodes[0].offsetWidth;
    sliderRef.current.scrollBy(width * 4 + 12, 0);
  }
  return (
    <div className="mx-3 flex-col relative md:ml-[236px] mt-2 mb-1 md:pr-5 md:pl-5  ">
      <h1 className=" mb-4 text sm:text-xl md:text-2xl">{title}</h1>
      <div>
        <div
          ref={sliderRef}
          id="slider"
          className="flex gap-3 overflow-x-auto "
        >
          {dataArtist.map((artiste) => (
            <CardArtiste
              key={artiste.id}
              imgSrc={
                artiste.images.length === 0 ? null : artiste.images[0].url
              }
              artisteName={artiste.name}
              id={artiste.id}
            />
          ))}
        </div>
        <button className="precedent" onClick={scrollLeft} type="button">
          <img
            className="arrow"
            src="./src/assets/FlecheIcons/chevron.png "
            alt="fleche-gauche"
          />
        </button>
        <button className="suivant" onClick={scrollRight} type="button">
          <img
            className="arrow"
            src="./src/assets/FlecheIcons/chevron.png "
            alt="fleche-droite"
          />
        </button>
      </div>
    </div>
  );
}

CardListArtiste.propTypes = {
  dataArtist: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
  title: PropTypes.string.isRequired,
};
