import PropTypes from "prop-types";
import loupe from "../assets/loupe.png";

export default function SearchBar({ query, setQuery }) {
  return (
    <section className="md:ml-[236px] flex justify-center">
      <input
        className="w-9/12 sm:w-9/12 h-7 rounded-xl px-2 shadow-md my-5 shadow-gray-600 text-black"
        type="text"
        placeholder="Que souhaitez-vous écouter ? "
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <img className="w-5 h-5 relative right-7 top-6" src={loupe} alt="loupe" />
    </section>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
