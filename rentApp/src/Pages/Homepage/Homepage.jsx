import Header from '../../Components/Header/Headers';
import SearchFlats from '../../Components/SearchFlats/SearchFlats';
import Flats from '../../Components/Flats/Flats';

const Homepage = () => {
  return (
    <div className='main'>
      <Header />
      <SearchFlats />
      <Flats />
    </div>
  );
};

export default Homepage;
