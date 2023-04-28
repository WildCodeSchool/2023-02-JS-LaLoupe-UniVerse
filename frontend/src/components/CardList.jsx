import { useRef } from "react";
import PropTypes from "prop-types";
import CardAlbumTitre from "./CardAlbumTitre";
import arrow from "../assets/FlecheIcons/chevron.png";

export default function CardList({ dataAlbums }) {
  const sliderListRef = useRef();

  function scrollLeft() {
    const width = sliderListRef.current.childNodes[0].offsetWidth;
    sliderListRef.current.scrollBy(-(width * 4 + 12), 0);
  }

  function scrollRight() {
    const width = sliderListRef.current.childNodes[0].offsetWidth;
    sliderListRef.current.scrollBy(width * 4 + 12, 0);
  }
  return (
    <div className=" relative md:ml-[236px] mt-2 md:pr-5 md:pl-5 md:mr-3 mx-3">
      <h1 className="mb-4  text sm:text-xl md:text-2xl">Nouveautés</h1>
      <div>
        <div
          ref={sliderListRef}
          id="sliderList"
          className="flex gap-3 overflow-x-auto"
        >
          {dataAlbums.map((album) => (
            <CardAlbumTitre
              key={album.id}
              imgSrc={album.images[0].url}
              albumName={album.name}
              artist={album.artists[0].name}
              release={album.release_date.slice(0, 4)}
              id={album.id}
            />
          ))}
        </div>
        <button className="precedent" onClick={scrollLeft} type="button">
          <img className="arrow" src={arrow} alt="fleche-gauche" />
        </button>
        <button className="suivant" onClick={scrollRight} type="button">
          <img className="arrow" src={arrow} alt="fleche-droite" />
        </button>
      </div>
    </div>
  );
}

CardList.propTypes = {
  dataAlbums: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
};
