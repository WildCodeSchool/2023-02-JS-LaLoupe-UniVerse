import { useOutletContext } from "react-router-dom";
import CardArtiste from "../components/CardArtiste";

export default function SearchArtist() {
  const { searchResultArtist } = useOutletContext();
  return (
    <div className="flex justify-evenly flex-wrap md:ml-[180px] lg:ml-[236px] my-10 md:mr-3 mx-3 gap-3">
      {searchResultArtist.map((artiste) => (
        <CardArtiste
          key={artiste.id}
          imgSrc={artiste.images.length === 0 ? null : artiste.images[1].url}
          artisteName={artiste.name}
          id={artiste.id}
        />
      ))}
    </div>
  );
}
