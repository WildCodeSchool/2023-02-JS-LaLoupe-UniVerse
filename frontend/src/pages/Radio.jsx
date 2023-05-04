import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import CardRadio from "../components/CardRadio";

export default function Radio() {
  const [radios, setRadio] = useState();
  const [searchInput, setSearchInput] = useState("");

  const getAllRadio = () => {
    fetch("http://91.132.145.114/json/stations/topclick?limit=20")
      .then((response) => response.json())
      .then((data) => {
        setRadio(data);
      });
  };

  const getResultsRadio = () => {
    fetch(
      `http://91.132.145.114/json/stations/search?name=${searchInput}&limit=20`
    )
      .then((response) => response.json())
      .then((SearchData) => {
        setRadio(SearchData);
      });
  };

  useEffect(() => {
    getAllRadio();
  }, []);

  useEffect(() => {
    if (searchInput !== "") {
      getResultsRadio();
    }
  }, [searchInput]);

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
            />
          </div>
        ))}
      </div>
      <div className=" mb-16 md:hidden" />
    </div>
  );
}
