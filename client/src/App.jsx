import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import DisplayRadio from "./components/DisplayRadio";
import Footer from "./components/Footer";

function App() {
  const [radiosRandom, setRadiosRandom] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [styleSearchValue, setStyleSearchValue] = useState("");
  const [countrySearchValue, setCountrySearchValue] = useState("");
  const [isVisible, setIsVisible] = useState(0);
  const [filteredRadio, setFilteredRadio] = useState([]);

  useEffect(() => {
    setFilteredRadio(
      radiosRandom.filter(
        (radio) =>
          radio.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          radio.tags.toLowerCase().includes(styleSearchValue.toLowerCase()) &&
          radio.country.toLowerCase().includes(countrySearchValue.toLowerCase())
      )
    );
  }, [radiosRandom, searchValue, styleSearchValue, countrySearchValue]);

  useEffect(() => {
    axios
      .get("https://de1.api.radio-browser.info/json/stations?limit=5000")
      .then((res) => {
        const tabRadios = [];
        for (let i = 0; i < 1000; i += 1) {
          const randomRadio =
            res.data[Math.floor(Math.random() * res.data.length)];
          if (
            randomRadio.favicon !== "" &&
            randomRadio.name !== "" &&
            randomRadio.stationuuid !== "" &&
            randomRadio.tags !== "" &&
            randomRadio.country !== "" &&
            randomRadio.codec === "MP3"
          ) {
            const verifName = randomRadio.name;
            const verifUUID = randomRadio.stationuuid;
            if (
              !tabRadios.find(({ stationuuid }) => stationuuid === verifUUID) &&
              !tabRadios.find(({ name }) => name === verifName)
            ) {
              tabRadios.push(randomRadio);
            } else {
              i -= 1;
            }
          } else {
            i -= 1;
          }
        }
        setRadiosRandom(tabRadios);
        setFilteredRadio(tabRadios);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de l'API.",
          error
        );
        setIsLoading(false);
      });
  }, []);

  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
  };

  const playNextStation = () => {
    if (currentStationIndex < filteredRadio.length - 1) {
      setCurrentStationIndex(currentStationIndex + 1);
    } else {
      setCurrentStationIndex(0);
    }
    setAudioPlaying(true);
  };

  const playPreviousStation = () => {
    if (currentStationIndex > 0) {
      setCurrentStationIndex(currentStationIndex - 1);
    } else {
      setCurrentStationIndex(filteredRadio.length - 1);
    }
    setAudioPlaying(true);
  };

  useEffect(() => {
    const audioElement = document.getElementById("audioPlayer");
    if (audioElement) {
      audioElement.src = filteredRadio[currentStationIndex].url;
      audioElement.addEventListener("canplay", () => {
        if (audioPlaying) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      });
    }
  }, [currentStationIndex, audioPlaying, filteredRadio]);

  return (
    <div className="main">
      <NavBar
        setSearchValue={setSearchValue}
        setStyleSearchValue={setStyleSearchValue}
        setCountrySearchValue={setCountrySearchValue}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      {isLoading && (
        <div className="container-loading-logo">
          <img
            src="public\Radio_World.png"
            alt="logo"
            className="loadingLogo"
          />
        </div>
      )}
      <div>
        <DisplayRadio
          radiosRandom={radiosRandom}
          filteredRadio={filteredRadio}
          toggleAudio={toggleAudio}
          audioPlaying={audioPlaying}
          currentStationIndex={currentStationIndex}
          playPreviousStation={playPreviousStation}
          playNextStation={playNextStation}
          setCurrentStationIndex={setCurrentStationIndex}
          isLoading={isLoading}
          searchValue={searchValue}
          styleSearchValue={styleSearchValue}
          countrySearchValue={countrySearchValue}
          setSearchValue={setSearchValue}
          setStyleSearchValue={setStyleSearchValue}
          setCountrySearchValue={setCountrySearchValue}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
