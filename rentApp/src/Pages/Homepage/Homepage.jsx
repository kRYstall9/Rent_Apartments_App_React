import "./Homepage.css";
import Header from "../Homepage/Components/Header";
import SearchFlats from "../Homepage/Components/SearchFlats";
import MyFlats from '../MyFlats';

const Homepage = () => {
  return (
    <div className="main-homepage">
      <Header />
      <SearchFlats />
      <MyFlats />
    </div>
  );
};

export default Homepage;
