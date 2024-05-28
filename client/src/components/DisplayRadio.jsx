/*
  eslint-disable react/require-default-props
*/

import { useState } from "react";
import PropTypes from "prop-types";
import FilterSection from "./FilterSection";
import RadioPlayer from "./RadioPlayer";
// import Favorite from "./Favorite";

function DisplayRadio({
  filteredRadio = [],
  toggleAudio,
  audioPlaying,
  playNextStation,
  playPreviousStation,
  currentStationIndex,
  setCurrentStationIndex,
  isLoading,
  searchValue,
  setSearchValue,
  styleSearchValue,
  setStyleSearchValue,
  countrySearchValue,
  setCountrySearchValue,
  isVisible,
  setIsVisible,
}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="container-display-radio">
      <FilterSection
        styleSearchValue={styleSearchValue}
        countrySearchValue={countrySearchValue}
        setStyleSearchValue={setStyleSearchValue}
        setCountrySearchValue={setCountrySearchValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <div className={`display_radios ${!isLoading ? "loaded" : ""}`}>
        {filteredRadio.length === 0 ? (
          <p className="no-results">No results found</p>
        ) : (
          filteredRadio &&
          filteredRadio.map((station, selectedCurrentStationIndex) => (
            <div className="space4" key={station.stationuuid}>
              <div className="rond">
                <button
                  onClick={() => {
                    setOpenModal(true);
                    setCurrentStationIndex(selectedCurrentStationIndex);
                  }}
                  type="button"
                  className="radio"
                >
                  <img
                    src={station.favicon}
                    alt="favicon"
                    className="favicon"
                  />
                  <p>{station.name}</p>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {filteredRadio.length > 0 && openModal && (
        <RadioPlayer
          closeModal={setOpenModal}
          stations={filteredRadio}
          audioPlaying={audioPlaying}
          currentStationIndex={currentStationIndex}
          toggleAudio={toggleAudio}
          playNextStation={playNextStation}
          playPreviousStation={playPreviousStation}
        />
      )}
    </div>
  );
}

DisplayRadio.propTypes = {
  filteredRadio: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      style: PropTypes.string,
      favicon: PropTypes.string.isRequired,
      homepage: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      stationuuid: PropTypes.string.isRequired,
    })
  ),
  audioPlaying: PropTypes.bool.isRequired,
  currentStationIndex: PropTypes.number.isRequired,
  toggleAudio: PropTypes.func.isRequired,
  playNextStation: PropTypes.func.isRequired,
  playPreviousStation: PropTypes.func.isRequired,
  setCurrentStationIndex: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  styleSearchValue: PropTypes.string.isRequired,
  setStyleSearchValue: PropTypes.func.isRequired,
  countrySearchValue: PropTypes.string.isRequired,
  setCountrySearchValue: PropTypes.func.isRequired,
  isVisible: PropTypes.number.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};

export default DisplayRadio;
