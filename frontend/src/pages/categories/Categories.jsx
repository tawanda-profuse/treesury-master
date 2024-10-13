import { useEffect, useState } from "react";
import CategoryList from "../../components/Partials/CategoryList";
import useFetch from "../../utils/useFetch";
import "./Categories.css";
import Header from "../../components/Header/Header";

const CategoryIndex = () => {
  useEffect(() => {
    document.title = "Tree Categories";
  }, []);
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000/categories"
    : "https://treesury-master.vercel.app/categories";
  const [data, isPending, error] = useFetch(url);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="container">
      <Header />
      <div className="inner-container">
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
      </div>
      <footer>
        <a
          href="https://en.wikipedia.org/wiki/List_of_tree_genera"
          target="_blank"
          rel="noreferrer"
        >
          Tree Family Reference <i className="fas fa-tree"></i>
        </a>
      </footer>
    </div>
  );
};
export default CategoryIndex;
