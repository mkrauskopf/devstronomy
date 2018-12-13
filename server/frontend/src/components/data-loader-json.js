import planets from './../data/planets.json';
import satellites from './../data/satellites.json';

export default {

  // Loads all planets in the Solar System.
  loadAllPlanets: callBack => {
    callBack(planets);
  },

  // Loads satellites belonging to the given planet.
  loadSatellites: (planet, callBack) => {
    callBack(satellites.filter(s => s.planetId === planet.id));
  },

  // Loads satellites of all planets in the Solar System.
  loadAllSatellites: callBack => {
    callBack(satellites);
  }

};

