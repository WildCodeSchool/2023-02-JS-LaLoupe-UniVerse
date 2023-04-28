import { useOutletContext } from "react-router-dom";
import CardAlbumTitre from "../components/CardAlbumTitre";

export default function SearchAlbum() {
  const { searchResultAlbum } = useOutletContext();

  return (
    <div className="flex justify-evenly flex-wrap md:ml-[236px] my-10 md:mr-3 mx-3 gap-3">
      {searchResultAlbum.map((album) => (
        <CardAlbumTitre
          key={album.id}
          imgSrc={album.images[1].url}
          albumName={album.name}
          artist={album.artists[0].name}
          release={album.release_date.slice(0, 4)}
          id={album.id}
        />
      ))}
    </div>
  );
}
