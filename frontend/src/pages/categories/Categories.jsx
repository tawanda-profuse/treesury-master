import { useEffect, useState } from "react";
import CategoryList from "../../components/Partials/CategoryList";
import useFetch from "../../utils/useFetch";
import "./Categories.css";

const CategoryIndex = () => {
  useEffect(() => {
    document.title = "Tree Categories";
  }, []);
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000/categories"
    : "https://treesury.onrender.com/categories";
  const [data, isPending, error] = useFetch(url);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <h2 className="page-header">Search Categories</h2>
      <form>
        <div className="form-row">
          <div className="form-item">
            <label>Family Name</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a tree family name."
            />
          </div>
        </div>
      </form>
      <br />
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <CategoryList categories={filteredData} />}
    </>
  );
};
export default CategoryIndex;
