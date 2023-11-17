import styles from"./navbar.module.css"

function Navbar({handlerChange, handlerSubmit}) {

    return (
      <div className={styles.searchBox}>
        <form onChange={handlerChange}>
          <input placeholder="Busqueda" type="search" />
          <button type="submit" onClick={handlerSubmit}>Buscar</button>
        </form>
      </div>
    )
  }

  export default Navbar