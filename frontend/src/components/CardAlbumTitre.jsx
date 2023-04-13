import albumAPI from "../data/albumAPI";

const releaseYear = albumAPI[0].albums.items[0].release_date.slice(0, 4);

export default function CardAlbumTitre() {
  return (
    <div className="gap-4 px-2 overflow-x-auto flex">
      <figure className="bg-neutral-900 hover:bg-pink-900/30 duration-150 h-36 rounded-md py-1 pb-3 px-2 w-28 sm:h-56 sm:w-44 md:h-64 md:w-56">
        <img
          className="rounded-md md:w-48 m-auto sm:py-2 md:rounded-md sm:w-36"
          src="https://i.scdn.co/image/ab67616d0000b273a4337627799b9098129756a8"
          alt="lyg"
        />
        <figcaption className="text-center text-white/60 space-y-0.5">
          <h2 className="font-bold text-xs/4 text-white/70 sm:text-base md:text-lg/3">
            {albumAPI[0].albums.items[0].name}
          </h2>
          <h3 className="text-xs/3">
            {albumAPI[0].albums.items[0].artists[0].name}
          </h3>
          <p className="text-[8px] sm:text-xs">{releaseYear}</p>
        </figcaption>
      </figure>
    </div>
  );
}
