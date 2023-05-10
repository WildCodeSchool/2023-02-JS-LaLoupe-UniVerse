import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import CardRadio from "../components/CardRadio";

export default function Radio() {
  const [radios, setRadio] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [playing, setPlaying] = useState(false);

  // appel API pour récupérer 20 radios selon leur nombre de clics

  const getAllRadio = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stations`)
      .then((response) => response.json())
      .then((data) => {
        setRadio(data);
      });
  };

  // appel API pour récupérer un tableu contenant les radios selon une recherche

  const getResultsRadio = () => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/stations?name=${searchInput}`
    )
      .then((response) => response.json())
      .then((SearchData) => {
        setRadio(SearchData);
      });
  };

  // la fonction est appelée au chargement de la page

  useEffect(() => {
    getAllRadio();
  }, []);

  // la fonction de recherche est appelée à chaque changement dans la barre de recherche

  useEffect(() => {
    if (searchInput !== "") {
      getResultsRadio();
    }
  }, [searchInput]);

  // messages de chargement le temps de récupérer les informations par l'API

  if (!radios) {
    return (
      <div className="min-h-screen flex  flex-col items-center mt-20  md:ml-36 md:mt-2">
        <p className="md:text-xl mb-20 ">Chargement des radios</p>
        <span className="loader  " />
      </div>
    );
  }

  return (
    <div>
      <SearchBar query={searchInput} setQuery={setSearchInput} />
      <div className="flex justify-evenly flex-wrap md:ml-[180px] lg:ml-[236px] sm:my-10 md:mr-3 mx-3 gap-3">
        {radios.map((radio) => (
          <div
            key={radio.stationuuid}
            className=" card-title bg-neutral-900 hover:bg-pink-600/30 duration-150 h-36 rounded-md m-0 py-1 pb-1 px-2 w-36 sm:h-56 sm:w-44 md:h-64 md:w-56"
          >
            <CardRadio
              favicon={radio.favicon ? radio.favicon : null}
              name={radio.name}
              country={radio.country}
              url={radio.url}
              playing={playing}
              setPlaying={setPlaying}
            />
          </div>
        ))}
      </div>
      <div className=" mb-16 md:hidden" />
    </div>
  );
}
