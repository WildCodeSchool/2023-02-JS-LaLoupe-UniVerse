import CardGenre from "./CardGenre";
import genreAPI from "../data/genreAPI";

export default function CardListGenre() {
  return (
    <div className="md:ml-[236px]  md:mr-3 mx-3">
      <h1 className="mb-4 text sm:text-xl md:text-2xl">Genres</h1>
      <div className="flex gap-3 overflow-x-auto">
        {genreAPI.map((genre) => (
          <CardGenre key={genre.name} imgSrc={genre.image} name={genre.name} />
        ))}
      </div>
    </div>
  );
}
