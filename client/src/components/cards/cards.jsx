import Card from "../card/card"
import styles from './cards.module.css';

function Cards({allDrivers}) {


const DriversList = allDrivers


    return (
   <div className= {styles.cardsList}>
      {DriversList && DriversList.map((driver, index) => 
        <Card key={index} driver = {driver}/>)}
   </div>
    )
  }

  export default Cards