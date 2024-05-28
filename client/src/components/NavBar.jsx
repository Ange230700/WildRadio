/*
  eslint-disable react/require-default-props
*/

import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";

import Logo from "../../../server/public/assets/images/Radio_World.png";
import Twitter from "../../../server/public/assets/images/twitter.png";
import Instagram from "../../../server/public/assets/images/instagram.png";
import Facebook from "../../../server/public/assets/images/Facebook.png";
import Courrier from "../../../server/public/assets/images/courrier.png";

function NavBar({
  searchValue = "",
  setSearchValue,
  radiosRandom = [],
  isVisible,
  setIsVisible,
}) {
  return (
    <div className="navbar">
      <div className="container-logo">
        <img src={Logo} className="logoRW" alt="Radio World logo" />
      </div>
      <div className="search-feature">
        <div className="Searchbar">
          <SearchBar
            radiosRandom={radiosRandom}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="container-filter">
          <FilterButton isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
      </div>
      <div className="logoRS">
        <div className="RS1">
          <img src={Twitter} alt="Twitter logo" />
          <img src={Instagram} alt="Insta logo" />
        </div>
        <div className="RS2">
          <img src={Facebook} alt="Fb logo" />
          <img src={Courrier} alt="Contact logo" className="courrier" />
        </div>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  isVisible: PropTypes.number.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func.isRequired,
  radiosRandom: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      style: PropTypes.string.isRequired,
      favicon: PropTypes.string.isRequired,
      homepage: PropTypes.string.isRequired,
    })
  ),
};

export default NavBar;
