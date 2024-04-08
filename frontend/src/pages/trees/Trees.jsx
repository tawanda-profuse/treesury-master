import { useEffect } from "react";
import CategoryGrid from "../../components/Partials/DataGrid";
import useFetch from "../../utils/useFetch";
import TreeList from "../../components/TreeList/TreeList";

const Trees = () => {
  useEffect(() => {
    document.title = "All Trees";
  }, []);
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000/trees"
    : "https://treesury.onrender.com/trees";
  const [data, isPending, error] = useFetch(url);
  return (
    <>
      <h2 className="page-header">Search Trees</h2>
      <form action="/trees" method="GET">
        <div className="form-row">
          <div className="form-item">
            <label>Tree Name</label>
            <input type="text" name="tree_name" />
          </div>
        </div>
        <div className="form-row form-row-end">
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
      <br />
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <TreeList trees={data} />}
    </>
  );
};

export default Trees;
