import PropTypes from "prop-types";
import CardListGenre from "../components/CardListGenre";
import CardList from "../components/CardList";
import CardListArtiste from "../components/CardListArtiste";
import artisteApi from "../data/artisteApi";

export default function Home({ albumsArray }) {
  return (
    <main>
      {albumsArray.length > 0 && (
        <CardList dataAlbums={albumsArray} title="Nouveautés" />
      )}
      <CardListArtiste
        dataArtist={artisteApi}
        title="Notre sélection d'artistes"
      />
      <CardListGenre />
      {albumsArray.length > 0 && (
        <CardList dataAlbums={albumsArray} title="Daily" />
      )}
      <div className=" mb-16 sm:hidden" />
    </main>
  );
}

Home.propTypes = {
  albumsArray: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
};
