import { useRef } from "react";
import PropTypes from "prop-types";
import CardAlbumTitre from "./CardAlbumTitre";

export default function CardListTitres({ dataAlbums, title }) {
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
      <h1 className="mb-4  text sm:text-xl md:text-2xl">{title}</h1>
      <div>
        <div
          ref={sliderListRef}
          id="sliderList"
          className="flex gap-3 overflow-x-auto"
        >
          {dataAlbums.map((album) => (
            <CardAlbumTitre
              key={album.tracks.items[0].id}
              imgSrc={album.tracks.items[0].album.images[0].url}
              albumName={album.tracks.items[0].name}
              artist={album.tracks.items[0].artists[0].name}
              release={album.tracks.items[0].album.release_date.slice(0, 4)}
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

CardListTitres.propTypes = {
  dataAlbums: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};
