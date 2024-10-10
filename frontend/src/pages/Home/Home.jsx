import { useEffect } from "react";
import TreeList from "../../components/TreeList/TreeList";
import useFetch from "../../utils/useFetch";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    document.title = "Treesury Home";
  }, []);
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000/trees"
    : "https://treesury-master.vercel.app/trees";
  const [data, isPending, error] = useFetch(url);

  return (
    <>
      <h2 className="page-header">All Trees</h2>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...🔃</div>}
      {data && <TreeList trees={data} />}
    </>
  );
};

export default Home;
