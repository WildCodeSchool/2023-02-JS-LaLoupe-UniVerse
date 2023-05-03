import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function AlbumTitreDetails({ token }) {
  const [albumTitreDetails, setAlbumTitreDetails] = useState();
  const [artisteDetail, setArtisteDetail] = useState();
  const { id } = useParams();

  const convertNumberMsEnMin = (number) => {
    const min = Math.floor(number / 60000);
    const reste = number % 60000;
    return `${min}:${Math.floor(reste / 1000)
      .toString()
      .padStart(2, "0")}`;
  };

  const getOneAlbum = () => {
    const albumParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`https://api.spotify.com/v1/albums/${id}`, albumParameters)
      .then((response) => response.json())
      .then((albumData) => {
        setAlbumTitreDetails(albumData);
        fetch(
          `https://api.spotify.com/v1/artists/${albumData.artists[0].id}`,
          albumParameters
        )
          .then((resp) => resp.json())
          .then((artisteData) => {
            setArtisteDetail(artisteData);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (token !== "") {
      getOneAlbum();
      window.scroll(0, 0);
    }
  }, [id]);

  if (!albumTitreDetails) {
    return <p>Loading album</p>;
  }
  if (!artisteDetail) {
    return <p>Loading artiste</p>;
  }

  return (
    <div>
      <figure className="flex flex-col mr-4 ml-4 my-5 pb-5 bg-pink-900/20 md:justify-center md:py-12 md:my-12 md:ml-60 lg:ml-80 md:mr-14  ">
        <div className="  md:bg-pink-600/20 p-8  md:ml-20 md:mr-20 lg:flex lg:gap-8 lg:justify-around">
          <div className="flex justify-center items-center">
            <img
              className=" w-10/12 sm:w-7/12 md:w-auto md:h-auto lg:w-52 lg:h-auto lg:items-center"
              src={albumTitreDetails.images[0].url}
              alt={albumTitreDetails.name}
            />
          </div>
          <div>
            <figcaption className="flex flex-col lg:ml-0">
              <h3 className="font-bold text-white/70 mt-5 text-sm md:mb-1 md:text-xl ">
                Album
              </h3>
              <h2 className="font-bold mt-2 text-base mb-1 text-white md:text-3xl md:mb-5">
                {albumTitreDetails.name}
              </h2>
              <h3>{albumTitreDetails.id.name}</h3>
              <div className="flex">
                <p className="text-sm  md:text-lg">
                  {new Date(albumTitreDetails.release_date).getFullYear()}
                </p>
                <p className="ml-5 invisible">-</p>

                <p className="invisible md:visible md: md:ml-5 md:text-lg ">
                  {albumTitreDetails.total_tracks} Titres
                </p>
              </div>
            </figcaption>
            <Link to={`/search/artist/${artisteDetail.id}`}>
              <div className="flex items-center font-bold text-base mt-4 md:mt-9 text-white/70 md:text-xl md:justify-start">
                <img
                  className="rounded-full w-12 h-12 md:w-16 md:h-16 mr-4"
                  src={artisteDetail.images[0].url}
                  alt={artisteDetail.name}
                />
                <p className="text-sm  md:text-lg  ">
                  {albumTitreDetails.artists[0].name}
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="flexflex-col ml-6 mr-6 justify-center md:ml-20 md:mt-10 ">
          {albumTitreDetails.tracks.items.map((item) => (
            <Link to={`/search/title/${item.id}`}>
              <div className="flex justify-between mt-1">
                <p className="  text-sm md:text-lg md:ml-8 " key={item.id}>
                  {item.track_number} {" . "} {item.name}
                </p>

                <p className=" text-sm md:text-lg md:mr-24">
                  {convertNumberMsEnMin(item.duration_ms)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </figure>
      <p className="ml-8 mt-8  text-base md:text-2xl md:ml-60 md:mt-12">
        Vous devriez aussi aimer
      </p>
      <div className=" mb-16 sm:hidden" />
    </div>
  );
}

AlbumTitreDetails.propTypes = {
  token: PropTypes.string.isRequired,
};
