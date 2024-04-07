import bookGrid from "../components/bookGrid";

const Home = () => {
  return (
  <>
  <h2 className="page-header">All Trees</h2>
  <bookGrid trees = {null} />
  </>
);
};

export default Home;
