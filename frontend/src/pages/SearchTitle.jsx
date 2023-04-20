import { useOutletContext } from "react-router-dom";

export default function SearchTitle() {
  // eslint-disable-next-line no-unused-vars
  const [searchResultArtist, searchResultTracks, searchResultAlbum] =
    useOutletContext();

  return (
    <div className="text-center">
      {searchResultTracks.length > 0 && <p>{searchResultTracks[0].name}</p>}
    </div>
  );
}
