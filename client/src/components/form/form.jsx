import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDriver } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import styles from "./form.module.css"

function Form() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    surname: "",
    nationality: "",
    birthDate: ""
  });

  const [error, setError] = useState({
    name: "",
    surname: "",
    nationality: "",
    birthDate: ""
  });

  // Inicializa el estado del botón en true para deshabilitarlo al inicio
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  // Funciones de validación
  const validateName = (name) => {
    if (name.length < 5 || name.length > 11) {
      return "El nombre debe tener entre 5 y 11 caracteres";
    }
    return "";
  };

  const validateSurname = (surname) => {
    if (surname.length < 5 || surname.length > 11) {
      return "El apellido debe tener entre 5 y 11 caracteres";
    }
    return "";
  };

  const validateBirthDate = (birthDate) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(birthDate)) {
      return "El formato de fecha debe ser dd/mm/aaaa";
    }
    return "";
  };

  const [message, setMessage] = useState(""); // Agrega un estado para el mensaje

  

  const checkButtonEnabled = () => {
    const hasErrors = Object.values(error).some((value) => value !== "");
    const isComplete =
      Object.values(input).every((value) => value !== "") &&
      !hasErrors;

    setButtonDisabled(!isComplete);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    });

    let errorMessage = "";
    if (name === "name" && value) {
      errorMessage = validateName(value);
    } else if (name === "surname" && value) {
      errorMessage = validateSurname(value);
    } else if (name === "birthDate" && value) {
      errorMessage = validateBirthDate(value);
    }

    

    setError({
      ...error,
      [name]: errorMessage
    });

    checkButtonEnabled();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createDriver(input));
      setMessage("El corredor se creó con éxito.");
    } catch (error) {
      setMessage("Error al crear el corredor. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.colorLetra}> Nombre </label>
          <input className={styles.inputField} name="name" value={input.name} onChange={handleChange} />
          {error.name && <span className={styles.errorMessage}>{error.name}</span>}
        </div>
        <div>
          <label className={styles.colorLetra}> Apellido </label>
          <input className={styles.inputField} name="surname" value={input.surname} onChange={handleChange} />
          {error.surname && <span className={styles.errorMessage}>{error.surname}</span>}
        </div>
        <div>
          <label className={styles.colorLetra}> Nacionalidad </label>
          <input className={styles.inputField} name="nationality" value={input.nationality} onChange={(e) => setInput({ ...input, nationality: e.target.value })} />
        </div>
        <div>
          <label className={styles.colorLetra}> Fecha de Nacimiento </label>
          <input className={styles.inputField} name="birthDate" value={input.birthDate} onChange={handleChange} />
          {error.birthDate && <span className={styles.errorMessage}>{error.birthDate}</span>}
        </div>
        <div>
            <label className={styles.colorLetra}> Team ID </label>
            <input className={styles.inputField} name="TeamId" value={input.TeamId} onChange={handleChange} />
            </div>
        <button type="submit" className={styles.submitButton} disabled={isButtonDisabled}>
          Create Driver
        </button>
        <Link to="http://localhost:5173/home">
          <button className={styles.backButton}> Volver a </button>
        </Link>
      </form>

      {message && <div className={styles.messageContainer}>{message}</div>}
    </div>
  );
}

export default Form;