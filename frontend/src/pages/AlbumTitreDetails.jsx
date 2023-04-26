// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

export default function AlbumDetails() {
  // const [accessToken, setAccessToken] = useState("");
  // const [albumTitreDetails, setAlbumTitreDetails] = useState();
  // const { id } = useParams();

  // const getToken = () => {
  //   fetch("https://accounts.spotify.com/api/token", authParameters)
  //     .then((result) => result.json())
  //     .then((data) => setAccessToken(data.access_token));
  // };

  // const getOneAlbum = () => {
  //   const albumParameters = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   };
  //   fetch(`https://api.spotify.com/v1/albums/${id}`, albumParameters)
  //     .then((response) => response.json())
  //     .then((albumData) => setAlbumTitreDetails(albumData.albums.items))
  //     .catch((err) => console.error(err));
  // };

  // useEffect(() => {
  //   getToken();
  // }, [id]);

  // useEffect(() => {
  //   if (accessToken !== "") {
  //     getOneAlbum();
  //   }
  // }, [accessToken]);

  return (
    <p>Coucou</p>
    // <figure className="bg-neutral-900 hover:bg-pink-600/30 duration-150 h-36 rounded-md flex-none m-0 py-1 pb-1 px-2 w-28 sm:h-56 sm:w-44 md:h-64 md:w-56">
    //   <img
    //     className="rounded-md md:w-48 m-auto sm:py-2 md:py-0 md:rounded-md sm:w-36"
    //     src={albumTitreDetails.imgSrc}
    //     alt={albumTitreDetails.albumName}
    //   />
    //   <figcaption className="text-center text-white/60 space-y-0.5">
    //     <h2 className="font-bold text-xs/4 text-white/70 sm:text-base md:text-base truncate">
    //       {albumTitreDetails.albumName}
    //     </h2>
    //     <h3 className="text-xs/3 truncate">{albumTitreDetails.artist}</h3>
    //     <p className="text-[8px] sm:text-xs">{albumTitreDetails.release}</p>
    //   </figcaption>
    // </figure>
  );
}
