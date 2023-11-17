import { Link } from "react-router-dom";
import styles from "./card.module.css";

function getFullName(driver) {
  if (driver.name) {
    if (typeof driver.name === "string") {
      return driver.name; // Estructura de la base de datos
    } else if (driver.name.forename && driver.name.surname) {
      return `${driver.name.forename} ${driver.name.surname}`; // Estructura de la API
    } else if (driver.name.fullName) {
      return driver.name.fullName; // Otra estructura de la API
    }
  }
  return "Nombre no encontrado";
}

function Card({ driver }) {
  const fullName = getFullName(driver);
  const { nationality, id, image, teams, driverTeams } = driver;

  let imageUrl;

  if (image && image.url) {
    imageUrl = image.url; // Estructura de la API
  } else if (image) {
    imageUrl = image; // Estructura de la base de datos
  }

  let teamsHtml = null;

  if (driverTeams) {
    // Si driverTeams existe, usarlo (estructura de la API)
    if (Array.isArray(driverTeams)) {
      // Renderiza equipos de la API
      teamsHtml = (
        <div>
          <h3>Equipos de la API:</h3>
          <h3>
            {driverTeams.map((team, index) => (
              <li key={index}>{team}</li>
            ))}
          </h3>
        </div>
      );
    } else if (typeof driverTeams === "string") {
      // Renderiza equipos de la API
      teamsHtml = <p>Equipos de la API: {driverTeams}</p>;
    }
  } else if (teams) {
    // Si teams existe, usarlo (estructura de la base de datos)
    if (Array.isArray(teams)) {
      // Renderiza equipos de la base de datos
      teamsHtml = (
        <div>
          <h3>Escuderias:</h3>
          <ul>
            {teams.map((team, index) => (
              <li key={index}>{team.name}</li>
            ))}
          </ul>
        </div>
      );
    } else if (typeof teams === "string") {
      // Renderiza equipos de la api
      teamsHtml = <div><h3>Escuderias:</h3><p>{teams}</p></div>;
    }
  }

  return (
    <div className={styles.cardContainer}>
      <Link to={`/home/${id}`}>
        <h2>{fullName}</h2>
        <p>Nationality: {nationality}</p>
        {imageUrl && <img src={imageUrl} alt="Imagen del conductor" />}
        {teamsHtml}
      </Link>
    </div>
  );
}

export default Card;