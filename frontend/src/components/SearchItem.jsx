import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function SearchItem({ value, path }) {
  return (
    <div className="px-5">
      <Link to={path}>{value}</Link>
    </div>
  );
}

SearchItem.propTypes = {
  value: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
