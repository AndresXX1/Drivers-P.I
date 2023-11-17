import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDriverDetails } from "../../redux/actions";
import { useParams } from "react-router-dom";

function Detail() {
  const dispatch = useDispatch();
  const driverDetails = useSelector((state) => state.driverDetails);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getDriverDetails(id))
      .then(() => setIsLoading(false))
      .catch((error) => console.error("Error fetching driver details:", error));
  }, [dispatch, id]);

  const renderDriverDetails = () => {
    if (driverDetails.name && driverDetails.name.forename && driverDetails.name.surname) {
      // Estructura de API
      const teams = driverDetails.teams.split(','); // Divide la cadena en una matriz
      return (
        <div>
          <h2>Detalles del Conductor</h2>
          <p>Nombre: {driverDetails.name.forename} {driverDetails.name.surname}</p>
          <p>Nacionalidad: {driverDetails.nationality}</p>
          {driverDetails.image && (
            <img src={driverDetails.image.url} alt="Imagen del conductor" />
          )}
          {teams.length > 0 && (
            <div>
              <h3>Equipos:</h3>
              <ul>
                {teams.map((team, index) => (
                  <li key={index}>{team.trim()}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Agrega más detalles según la estructura de tus datos de la API */}
        </div>
      );
    } else {
      // Estructura de DB
      return (
        <div>
          <h2>Detalles del Conductor</h2>
          <p>Nombre: {driverDetails.name}</p>
          <p>Nacionalidad: {driverDetails.nationality}</p>
          {driverDetails.image && (
            <img src={driverDetails.image} alt="Imagen del conductor" />
          )}
          {/* Agrega más detalles según la estructura de tus datos de la base de datos */}
        </div>
      );
    }
  };

  return (
    <div className="App">
      <p>Estás en el detalle del conductor: {id}</p>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        renderDriverDetails()
      )}
    </div>
  );
}

export default Detail;