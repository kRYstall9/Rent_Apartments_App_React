import styles from '../MyFlats/MyFlats.module.css';
import Header from '../../Components/Header/Headers';
import AddFlat from '../../Components/AddFlat/AddFlat';
import Flats from '../../Components/Flats/Flats';

const MyFlats = () => {
  return (
    <div className={styles.main}>
     <Header/>
     <AddFlat/>
     <Flats/>
    </div>
  )
}

export default MyFlats