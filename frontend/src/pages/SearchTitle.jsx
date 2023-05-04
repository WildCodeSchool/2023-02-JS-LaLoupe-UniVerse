import { useOutletContext } from "react-router-dom";
import CardTitre from "../components/CardTitre";

export default function SearchTitle() {
  const { searchResultTracks } = useOutletContext();

  return (
    <div className=" min-h-screen flex justify-evenly flex-wrap md:ml-[180px] lg:ml-[236px] my-10 md:mr-3 mx-3 gap-3">
      {searchResultTracks.map((track) => (
        <CardTitre
          key={track.id}
          imgSrc={track.album.images[1].url}
          titreName={track.name}
          artist={track.artists[0].name}
          release={track.album.release_date.slice(0, 4)}
          id={track.id}
        />
      ))}
    </div>
  );
}
