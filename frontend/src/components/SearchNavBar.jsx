import SearchItem from "./SearchItem";

export default function SearchNavBar() {
  return (
    <div className="flex justify-center">
      <SearchItem value="Tout" path="/search" />
      <SearchItem value="Artistes" path="/search/artist" />
      <SearchItem value="Albums" path="/search/album" />
      <SearchItem value="Titres" path="/search/title" />
    </div>
  );
}
