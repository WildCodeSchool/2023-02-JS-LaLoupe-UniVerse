import { useOutletContext } from "react-router-dom";

export default function SearchAll() {
  const [searchResultArtist, searchResultTracks, searchResultAlbum] =
    useOutletContext();

  return (
    <div className="text-center">
      {searchResultArtist.length > 0 && <p>{searchResultArtist[0].name}</p>}
      {searchResultAlbum.length > 0 && <p>{searchResultAlbum[0].name}</p>}
      {searchResultTracks.length > 0 && <p>{searchResultTracks[0].name}</p>}
    </div>
  );
}
