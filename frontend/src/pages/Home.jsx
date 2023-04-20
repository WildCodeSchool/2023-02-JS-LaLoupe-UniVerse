import PropTypes from "prop-types";
import CardListGenre from "../components/CardListGenre";
import CardList from "../components/CardList";
import CardListArtiste from "../components/CardListArtiste";

export default function Home({ albumsArray }) {
  return (
    <main>
      {albumsArray.length > 0 && <CardList dataAlbums={albumsArray} />}
      {albumsArray.length > 0 && <CardList dataAlbums={albumsArray} />}
      <CardListArtiste />
      <CardListGenre />
      {albumsArray.length > 0 && <CardList dataAlbums={albumsArray} />}
      {albumsArray.length > 0 && <CardList dataAlbums={albumsArray} />}
    </main>
  );
}

Home.propTypes = {
  albumsArray: PropTypes.arrayOf.isRequired,
};
