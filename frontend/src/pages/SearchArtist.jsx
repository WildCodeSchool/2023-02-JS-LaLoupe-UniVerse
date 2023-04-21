import { useOutletContext } from "react-router-dom";

export default function SearchArtist() {
  // eslint-disable-next-line no-unused-vars
  const [searchResultArtist, searchResultTracks, searchResultAlbum] =
    useOutletContext();

  return (
    <div className="text-center">
      {searchResultArtist.length > 0 && <p>{searchResultArtist[0].name}</p>}
    </div>
  );
}
