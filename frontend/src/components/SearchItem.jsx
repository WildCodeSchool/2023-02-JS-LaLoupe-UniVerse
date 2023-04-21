import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function SearchItem({ value, path }) {
  return (
    <div className="px-2 md:px-5">
      <NavLink to={path} end>
        {({ isActive }) => (
          <button
            type="button"
            className={
              isActive
                ? " w-24 h-10 rounded-lg bg-neutral-900 hover:bg-pink-600/30"
                : " w-24 h-10 rounded-lg bg-pink-600/30 hover:bg-neutral-900 text-white/50"
            }
          >
            {value}
          </button>
        )}
      </NavLink>
    </div>
  );
}

SearchItem.propTypes = {
  value: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
