import { useOutletContext } from "react-router-dom";
import CardAlbumTitre from "../components/CardAlbumTitre";
import CardListArtiste from "../components/CardListArtiste";
import CardSearchTitle from "../components/CardSearchTitle";

export default function SearchAll() {
  const [searchResultArtist, searchResultTracks, searchResultAlbum] =
    useOutletContext();
  const searchTracks = searchResultTracks.slice(0, 6);

  const convertNumberMsEnMin = (number) => {
    const min = Math.floor(number / 60000);
    const reste = number % 60000;
    return `${min}:${Math.floor(reste / 1000)
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <section className="sm:flex sm:justify-center md:ml-[236px] mb-6 md:pl-5">
        <figure>
          {searchResultAlbum.length > 0 && (
            <figcaption className="mb-5 mx-10">
              <h2>Album</h2>
            </figcaption>
          )}
          {searchResultAlbum.length > 0 && (
            <CardAlbumTitre
              imgSrc={searchResultAlbum[0].images[1].url}
              albumName={searchResultAlbum[0].name}
              artist={searchResultAlbum[0].artists[0].name}
              release={searchResultAlbum[0].release_date.slice(0, 4)}
              id={searchResultAlbum[0].id}
              className="m-auto"
            />
          )}
        </figure>
        <aside className="w-full ml-3 mt-5 sm:mt-0">
          {searchResultTracks.length > 0 && (
            <figcaption className="mb-5 col-span-2 mx-10">
              <h2>Titres</h2>
            </figcaption>
          )}
          <div className="sm:grid sm:grid-cols-2 mr-3 sm:gap-2 flex justify-center flex-wrap md:pr-5 md:pl-5">
            {searchResultTracks.length > 0 &&
              searchTracks.map((track) => (
                <CardSearchTitle
                  key={`search${track.id}`}
                  imgSrc={
                    track.album.images.length === 0
                      ? null
                      : track.album.images[2].url
                  }
                  titreName={track.name}
                  artist={track.artists[0].name}
                  release={track.album.release_date.slice(0, 4)}
                  duration={convertNumberMsEnMin(track.duration_ms)}
                  id={track.id}
                />
              ))}
          </div>
        </aside>
      </section>
      <section>
        {searchResultArtist.length > 0 && (
          <CardListArtiste dataArtist={searchResultArtist} title="Artistes" />
        )}
      </section>
    </div>
  );
}
