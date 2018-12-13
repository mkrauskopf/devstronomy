const baseUrl = 'http://localhost:8080/';

export default {

  loadAllPlanets: callBack => {
    fetch(baseUrl + 'planet/')
      .then(results => {
        return results.json();
      }).then(data => {
        callBack(data);
      });
  },

  loadSatellites: (planet, callBack) => {
    fetch(baseUrl + '/planet/' + planet.id + '/satellites')
      .then(results => {
        return results.json();
      }).then(data => {
        callBack(data);
      });
  },

  loadAllSatellites: callBack => {
    fetch(baseUrl + 'satellite/')
      .then(results => {
        return results.json();
      }).then(data => {
        callBack(data);
      });
  }

};

