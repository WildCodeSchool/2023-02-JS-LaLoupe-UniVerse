import artisteApi from "../data/artisteApi";

export default function CardArtiste() {
  return (
    <figure className="w-28 h-36 py-3">
      <img
        className=" m-auto rounded-full w-20"
        src={artisteApi[1].images[2].url}
        alt={artisteApi[1].name}
      />
      <figcaption>
        <h2 className="text-center text-xs/4 font-bold mt-1 text-white">
          {artisteApi[1].name}
        </h2>
      </figcaption>
    </figure>
  );
}
