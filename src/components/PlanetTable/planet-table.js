/**
 * This JSX Component is used to display Planet table Data received as input.
 * The component provides helper functions to sort planets by name, format numeric
 * digits and calculate the water surface area.  
 */
import "./planet-table.css";
export default function PlanetTable({planets}) {

    //Function that recieves an array of planet objects to sort by name
    function sortPlanets(planets){
        return planets.sort((firstPlanet, secondPlanet) => {
          if (firstPlanet.name > secondPlanet.name){
            return 1;
          } else{
            return -1;
          }
        });
    }

    //Helper function to format numbers with more than three digits using regex
    function formatNumber(number){
      if (Number.isNaN(Number(number))) return '?';
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    //Helper function to grab the planet id from the url using the split method
    function getIndexFromUrl(url){
      return url.split("/").slice(-2);
    }

    //Function calculates the water surface area using the diameter associated with
    //each plant
    function waterSurfaceArea(diameter, waterPercent){
      const radius = diameter * 0.5;
      const pi = 3.14159265359;
      return Math.round(4 * pi * Math.pow(radius,2));
    }
     
    return (
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Number of Residents</th>
            <th>Terrain</th>
            <th>Population</th>
            <th>Water Surface Area (in km<sup>2</sup>)</th>
          </tr>
        </thead>
        <tbody>
        {sortPlanets(planets).map((planet) => {
          const {
            url,
            name,
            climate,
            terrain,
            population,
            residents,
            diameter,
            surface_water: waterPercent,
          } = planet;
            return(  
            <tr key={getIndexFromUrl(url)}>
              <td> <a href={url} target='_blank' rel="noopener noreferrer"> {name}</a> </td>
              <td> {climate} </td>
              <td >
              {residents.length}
              </td>
              <td> {terrain} </td>
              <td> {formatNumber(population)} </td>
              <td> {formatNumber(waterSurfaceArea(diameter, waterPercent))} </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    )
}

