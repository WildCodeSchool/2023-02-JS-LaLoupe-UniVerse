import artisteApi from "../data/artisteApi";
import CardArtiste from "./CardArtiste";

const artisteData = artisteApi[0];

export default function CardListArtiste() {
  return (
    <div className="flex-col md:ml-[236px] my-10">
      <h1>Artistes</h1>
      <div className="flex gap-3 overflow-x-auto">
        {artisteData.map((artiste) => (
          <CardArtiste
            key={artiste.id}
            imgSrc={artiste.images[1].url}
            artisteName={artiste.name}
          />
        ))}
      </div>
    </div>
  );
}