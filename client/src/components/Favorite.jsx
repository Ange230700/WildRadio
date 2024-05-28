import { useState } from "react";
import PropTypes from "prop-types";

import EmptyHeart from "../../../server/public/assets/images/empty_heart.png";
import FullHeart from "../../../server/public/assets/images/full_heart.png";

function Favorite({
  selectedCurrentStationIndex,
  setCurrentStationIndex,
  radiosRandom,
  favoriteRadiosRandom,
  setFavoriteRadiosRandom,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const addFavorite = () => {
    if (isFavorite === false) {
      setIsFavorite(true);
      setCurrentStationIndex(selectedCurrentStationIndex);
      const tabFavorite = favoriteRadiosRandom;
      tabFavorite.push(radiosRandom[selectedCurrentStationIndex]);
      setFavoriteRadiosRandom(tabFavorite);
      console.warn(tabFavorite);
    } else {
      setIsFavorite(false);
    }
  };

  return (
    <button className="favorite" type="button" onClick={addFavorite}>
      <img src={isFavorite === false ? EmptyHeart : FullHeart} alt="favorite" />
    </button>
  );
}

export default Favorite;

Favorite.propTypes = {
  radiosRandom: PropTypes.arrayOf.isRequired,
  setCurrentStationIndex: PropTypes.func.isRequired,
  selectedCurrentStationIndex: PropTypes.number.isRequired,
  favoriteRadiosRandom: PropTypes.arrayOf.isRequired,
  setFavoriteRadiosRandom: PropTypes.func.isRequired,
};
