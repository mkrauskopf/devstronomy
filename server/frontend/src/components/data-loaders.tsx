import { IPlanet } from './Planets.jsx';
import { ISatellite } from './Satellites.jsx';

export type PlanetsCallback = (planets: IPlanet[]) => void

export default interface ICallbacks {

  loadAllPlanets(callback: PlanetsCallback): void;
  loadSatellites(planet: IPlanet, callback: PlanetsCallback): void;
  loadAllSatellites(satellites: (satellites: ISatellite[]) => void): void;

}
