import PropTypes from "prop-types";
import CardAlbumTitre from "./CardAlbumTitre";

export default function CardList({ dataAlbums }) {
  return (
    <div className="md:ml-[236px] my-10 md:mr-3 mx-3">
      <h1 className="mb-4 text sm:text-xl md:text-2xl">Nouveautés</h1>
      <div className="flex gap-3 overflow-x-auto">
        {dataAlbums.map((album) => (
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

CardList.propTypes = {
  dataAlbums: PropTypes.arrayOf.isRequired,
};
