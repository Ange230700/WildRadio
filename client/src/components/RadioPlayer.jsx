/* Function pour faire fonctionner la radio (play,pause, next,previous) */
import PropTypes from "prop-types";

import Cassette from "../../../server/public/assets/images/Cassette.png";
import Cassette2 from "../../../server/public/assets/images/Cassette2.png";
import precedent from "../../../server/public/assets/images/precedent.png";
import suivant from "../../../server/public/assets/images/suivant.png";
import pause from "../../../server/public/assets/images/pause.png";
import play from "../../../server/public/assets/images/play.png";

function RadioPlayer({
  stations,
  audioPlaying,
  currentStationIndex,
  toggleAudio,
  playNextStation,
  playPreviousStation,
  closeModal,
}) {
  const currentStation = stations[currentStationIndex];

  return (
    <div type="button" className="container-radio">
      <div type="button" className="int-content">
        <div className="container-animation">
          <div className="animation">
            <img
              src={Cassette}
              alt="Cassette"
              className="c1"
              style={{
                animation: audioPlaying ? "loop 2s linear infinite" : "none",
              }}
            />
            <img
              src={Cassette2}
              alt="Cassette2"
              className="c2"
              style={{
                animation: audioPlaying ? "loop 2s linear infinite" : "none",
              }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            closeModal(false);
            toggleAudio();
          }}
          className="button"
        >
          X
        </button>
        <div className="container-button">
          <div
            className="prevStation"
            onClick={playPreviousStation}
            aria-hidden="true"
            type="button"
          >
            <img src={precedent} alt="precedent" />
          </div>
          <div className="playMusic" onClick={toggleAudio} aria-hidden="true">
            {audioPlaying ? (
              <img src={pause} alt="Pause" />
            ) : (
              <img src={play} alt="Play" />
            )}
          </div>
          <div
            className="nextStation"
            onClick={playNextStation}
            aria-hidden="true"
          >
            <img src={suivant} alt="suivant" />
          </div>
        </div>
        <div className="radio-selection">
          <div className="radio-selection-favicon">
            <img src={currentStation.favicon} alt="favicon" />
          </div>
          <p>{currentStation.name}</p>
        </div>
        <div className="container-url-radio">
          <a
            className="url-radio"
            href={currentStation.homepage}
            target="_blank"
            rel="noreferrer"
          >
            Découvre le site de la radio
          </a>
        </div>
      </div>
      {/* Lecteur audio caché */}
      <audio
        id="audioPlayer"
        src={stations[currentStationIndex].url}
        autoPlay={audioPlaying}
        style={{ display: "none" }}
      >
        <track kind="captions" />
      </audio>
    </div>
  );
}

RadioPlayer.propTypes = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      favicon: PropTypes.string.isRequired,
      homepage: PropTypes.string.isRequired,
    })
  ).isRequired,
  audioPlaying: PropTypes.bool.isRequired,
  currentStationIndex: PropTypes.number.isRequired,
  toggleAudio: PropTypes.func.isRequired,
  playNextStation: PropTypes.func.isRequired,
  playPreviousStation: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default RadioPlayer;
