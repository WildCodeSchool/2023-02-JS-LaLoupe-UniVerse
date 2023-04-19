import artisteApi from "../data/artisteApi";
import CardArtiste from "./CardArtiste";

export default function CardListArtiste() {
  return (
    <div className="flex-col md:ml-[236px] my-10">
      <h1>Artistes</h1>
      <div className="flex gap-3 overflow-x-auto">
        {artisteApi.map((artiste) => (
          <CardArtiste
            key={artiste.id}
            imgSrc={artiste.images[0].url}
            artisteName={artiste.name}
          />
        ))}
      </div>
    </div>
  );
}
