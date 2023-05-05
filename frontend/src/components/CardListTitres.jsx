import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import CardTitre from "./CardTitre";
import arrow from "../assets/FlecheIcons/chevron.png";

export default function CardListTitres({ dataAlbums, title, id }) {
  const sliderListRef = useRef();

  // fonction pour afficher les millisecondes en "minutes:secondes"

  const convertNumberMsEnMin = (number) => {
    const min = Math.floor(number / 60000);
    const reste = number % 60000;
    return `${min}:${Math.floor(reste / 1000)
      .toString()
      .padStart(2, "0")}`;
  };

  // Carrousel

  function scrollLeft() {
    const width = sliderListRef.current.childNodes[0].offsetWidth;
    sliderListRef.current.scrollBy(-(width * 4 + 12), 0);
  }

  function scrollRight() {
    const width = sliderListRef.current.childNodes[0].offsetWidth;
    sliderListRef.current.scrollBy(width * 4 + 12, 0);
  }

  // Réinitialisation du carrousel à chaque changement d'ID

  useEffect(() => {
    scrollLeft();
    scrollLeft();
    scrollLeft();
    scrollLeft();
    scrollLeft();
  }, [id]);

  return (
    <div className=" relative md:ml-[180px] lg:ml-[236px] mt-2 md:pr-5 md:pl-5">
      <h1 className="mb-4  text sm:text-xl md:text-2xl font-bold">{title}</h1>
      <div>
        <div
          ref={sliderListRef}
          id="sliderList"
          className="flex gap-3 overflow-x-auto"
        >
          {dataAlbums.map((album) => (
            <CardTitre
              key={album.id}
              imgSrc={album.album.images[0].url}
              titreName={album.name}
              artist={album.artists[0].name}
              release={album.album.release_date.slice(0, 4)}
              id={album.id}
              duration={convertNumberMsEnMin(album.duration_ms)}
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

CardListTitres.defaultProps = {
  id: "",
};

CardListTitres.propTypes = {
  dataAlbums: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
};
