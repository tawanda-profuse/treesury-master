import { useEffect, useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data.filter((item) =>
    item.tree_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <h2 className="page-header">Search Trees</h2>
      <form>
        <div className="form-row">
          <div className="form-item">
            <label>Tree Name</label>
            <input
              type="text"
              name="tree_name"
              placeholder="Search for a tree name"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </form>
      <br />
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <TreeList trees={filteredData} />}
    </>
  );
};

export default Trees;
