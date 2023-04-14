import albumAPI from "../data/albumAPI";
import CardAlbumTitre from "./CardAlbumTitre";

const albumData = albumAPI[0].albums.items;

export default function CardList() {
  return (
    <div className="md:ml-[236px] my-10">
      <h1>Nouveautés</h1>
      <div className="flex gap-3 overflow-x-auto">
        {albumData.map((album) => (
          <CardAlbumTitre
            key={album.id}
            imgSrc={album.images[1].url}
            albumName={album.name}
            artist={album.artists[0].name}
            release={album.release_date.slice(0, 4)}
          />
        ))}
      </div>
    </div>
  );
}
