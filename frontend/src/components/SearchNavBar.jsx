import SearchItem from "./SearchItem";

export default function SearchNavBar() {
  return (
    <div className="md:ml-[236px] flex justify-center flex-wrap gap-3">
      <SearchItem value="Tout" exact path="/search" />
      <SearchItem value="Artistes" path="/search/artist" />
      <SearchItem value="Albums" path="/search/album" />
      <SearchItem value="Titres" path="/search/title" />
    </div>
  );
}
