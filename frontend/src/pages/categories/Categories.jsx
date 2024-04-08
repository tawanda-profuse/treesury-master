import { useEffect } from "react";
import CategoryList from "../../components/Partials/CategoryList";
import useFetch from "../../utils/useFetch";
import "./Categories.css";

const Categories = () => {
  useEffect(() => {
    document.title = "Tree Categories";
  }, []);
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000/categories"
    : "https://treesury.onrender.com/categories";
  const [data, isPending, error] = useFetch(url);
  return (
    <>
      <h2 className="page-header">Search Categories</h2>
      <form action="/categories" method="GET">
        <div className="form-row">
          <div className="form-item">
            <label>Category Name</label>
            <input type="text" name="name" />
          </div>
        </div>
      </form>
      <div className="form-row form-row-end">
        <button className="btn btn-primary search-button" type="submit">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <br />
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <CategoryList categories={data} />}
    </>
  );
};
export default Categories;
