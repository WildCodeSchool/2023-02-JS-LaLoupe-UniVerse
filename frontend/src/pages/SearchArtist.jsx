import { useOutletContext } from "react-router-dom";
import CardArtiste from "../components/CardArtiste";

export default function SearchArtist() {
  // eslint-disable-next-line no-unused-vars
  const [searchResultArtist, searchResultTracks, searchResultAlbum] =
    useOutletContext();
  return (
    <div className="flex justify-evenly flex-wrap md:ml-[236px] my-10 md:mr-3 mx-3 gap-3">
      {searchResultArtist.map((artiste) => (
        <CardArtiste
          key={artiste.id}
          imgSrc={artiste.images.length === 0 ? null : artiste.images[1].url}
          artisteName={artiste.name}
        />
      ))}
    </div>
  );
}
