import PropTypes from "prop-types";
import { useEffect } from "react";
import CardListGenre from "../components/CardListGenre";
import CardList from "../components/CardList";
import CardListTitres from "../components/CardListTitres";
import CardListArtiste from "../components/CardListArtiste";
import artisteApi from "../data/artisteApi";
import daily from "../data/dailyXavier";

export default function Home({ albumsArray }) {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

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

      <CardListTitres
        dataAlbums={daily[0].tracks.items}
        title="Pour bien commencer la journée"
      />
      <div className=" mb-16 md:hidden" />
    </main>
  );
}

Home.propTypes = {
  albumsArray: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
};
