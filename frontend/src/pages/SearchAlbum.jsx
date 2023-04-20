import { useOutletContext } from "react-router-dom";

export default function SearchAlbum() {
  // eslint-disable-next-line no-unused-vars
  const [searchResultArtist, searchResultTracks, searchResultAlbum] =
    useOutletContext();

  return (
    <div className="text-center">
      {searchResultAlbum.length > 0 && <p>{searchResultAlbum[0].name}</p>}
    </div>
  );
}
