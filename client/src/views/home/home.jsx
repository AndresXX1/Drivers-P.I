import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName, getDrivers, getDriverTeams } from "../../redux/actions";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import Select from "react-select";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const [searchString, setSearchString] = useState(" ");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [selectedOrigin, setSelectedOrigin] = useState("All");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedNationality, setSelectedNationality] = useState("All");


  

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (searchString.trim() === "") {
      // Si la cadena de búsqueda está vacía, restaura la lista completa de drivers
      dispatch(getDrivers());
    } else {
      // Si hay una cadena de búsqueda, realiza la búsqueda por nombre
      dispatch(getByName(searchString));
    }
  };

  const originOptions = [
    { value: "All", label: "Selecciona un origen" },
    { value: "API", label: "API" },
    { value: "DB", label: "DB" },
  ];

  const teamOptions = [
    { value: "All", label: "Selecciona una escuderia" },
    { value: "McLaren", label: "McLaren" },
    { value: "Mercedes", label: "Mercedes" },
    { value: "Ferrari", label: "Ferrari" },
    { value: "Toyota", label: "Toyota" },
    { value: "Red Bull", label: "Red Bull" },
    { value: "Aston Martin", label: "Aton Martin" },
    { value: "Porsche", label: "Porsche" },
    { value: "Lotus", label: "Lotus" },
  ];

  const nationalityOptions = [
    { value: "All", label: "Todas las nacionalidades" },
    { value: "British", label: "Británica" },
    { value: "German", label: "Alemana" },
    { value: "arg papa!!", label: "Argentina" },
    { value: "Spanish", label: "España" },
    { value: "Japanese", label: "Japon" },
    { value: "French", label: "Francia" },
  ];


  const handleOriginChange = (selectedOption) => {
    setSelectedOrigin(selectedOption.value);
  };

  const handleTeamChange = (selectedOption) => {
    setSelectedTeam(selectedOption.value);
  };

  const handleNationalityChange = (selectedOption) => {
    setSelectedNationality(selectedOption.value);
  };



  const getFilteredCards = () => {
    let filteredDrivers = allDrivers.slice(); // Copia el arreglo original para no modificarlo directamente
  
    if (selectedOrigin !== "All") {
      filteredDrivers = filteredDrivers.filter((driver) => getDriverOrigin(driver) === selectedOrigin);
    }
  
    if (selectedTeam !== "All") {
      filteredDrivers = filteredDrivers.filter((driver) => driverHasTeam(driver, selectedTeam));
    }

    if (selectedNationality !== "All") {
      filteredDrivers = filteredDrivers.filter((driver) => driverNationality(driver) === selectedNationality);
    }
  
 
    return filteredDrivers;
  };
  

  const driverNationality = (driver) => {
    return driver.nationality || "Desconocida";
  };

  const getDriverOrigin = (driver) => {
    if (driver.name.forename) {
      return "API";
    } else {
      return "DB";
    }
  };

  const driverHasTeam = (driver, selectedTeam) => {
    if (selectedTeam === "All") {
      return true;
    }

    if (driver.teams && (Array.isArray(driver.teams) || typeof driver.teams === "string")) {
      if (Array.isArray(driver.teams)) {
        return driver.teams.some((team) => team.name === selectedTeam);
      } else if (typeof driver.teams === "string") {
        const teamsArray = driver.teams.split(",");
        return teamsArray.includes(selectedTeam);
      }
    }

    return false;
  };

  const getCardsForCurrentPage = () => {
    const filteredCards = getFilteredCards();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCards.slice(startIndex, endIndex);
  };


  const handlerChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <h1 className={styles.homeTitle}>Drive To Survive</h1>
      <Navbar handlerChange={handlerChange} handlerSubmit={handlerSubmit} />
      <div className={styles.filterContainer}>
        <div>
          <Link to={"/create"}>
          <button className={styles.button}>Create</button>
          </Link>
        </div>
        <Select
          options={originOptions}
          value={originOptions.find((option) => option.value === selectedOrigin)}
          onChange={handleOriginChange}
          className={styles.selectOrigin}
          placeholder="Selecciona un origen"
        />
        <Select
          options={teamOptions}
          value={teamOptions.find((option) => option.value === selectedTeam)}
          onChange={handleTeamChange}
          className={styles.selectTeam1}
          placeholder="Selecciona una escuderia"
        />
         <Select
          options={nationalityOptions}
          value={nationalityOptions.find((option) => option.value === selectedNationality)}
          onChange={handleNationalityChange}
          className={styles.selectTeam2}
          placeholder="Selecciona una nacionalidad"
        />
      </div>
      <Cards allDrivers={getCardsForCurrentPage()} />
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Página anterior
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= allDrivers.length}
        >
          Página siguiente
        </button>
      </div>
    </div>
  );
}

export default Home;