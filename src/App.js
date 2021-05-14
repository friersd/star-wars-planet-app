import axios from "axios";
import {useState, useEffect} from 'react';
import PlanetTable from "./components/PlanetTable/planet-table";

export default function App(){
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const swapi = "https://swapi.dev/api/planets";

    setLoading(true);

    axios(swapi, {timeout:1200})
      .then((response) => {
        setPlanets(response.data.results);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false)
      });
   
  }, []);

  

  if (error) return <div style={{ color: '#ba3939', background:'#ffe0e0' }}>{error}</div>;  //Not a User Friendly error message but returning for quickenss
  if (loading) return <p>Loading data.....</p>
  return (
      <PlanetTable planets={planets} />
  );
}

