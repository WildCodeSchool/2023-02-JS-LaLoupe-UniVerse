import { useRef } from "react";
import artisteApi from "../data/artisteApi";
import CardArtiste from "./CardArtiste";

export default function CardListArtiste() {
  const sliderRef = useRef();

  function scrollLeft() {
    const width = sliderRef.current.childNodes[0].offsetWidth;
    sliderRef.current.scrollBy(-(width + 12), 0);
  }

  function scrollRight() {
    const width = sliderRef.current.childNodes[0].offsetWidth;
    sliderRef.current.scrollBy(width + 12, 0);
  }

  return (
    <div className="flex-col relative md:ml-[236px] my-10">
      <h1>Artistes</h1>
      <div>
        <div
          ref={sliderRef}
          id="slider"
          className="flex gap-3 overflow-x-auto "
        >
          {artisteApi.map((artiste) => (
            <CardArtiste
              key={artiste.id}
              imgSrc={artiste.images[0].url}
              artisteName={artiste.name}
            />
          ))}
        </div>
        <button id="precedent" onClick={scrollLeft} type="button">
          <img
            className="arrow"
            src="./src/assets/FlecheIcons/chevron.png "
            alt="fleche"
          />
        </button>
        <button id="suivant" onClick={scrollRight} type="button">
          <img
            className="arrow"
            src="./src/assets/FlecheIcons/chevron.png "
            alt="fleche"
          />
        </button>
      </div>
    </div>
  );
}
