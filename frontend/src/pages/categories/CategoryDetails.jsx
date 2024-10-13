import { useParams } from "react-router-dom";
import useFetch from "../../utils/useFetch";
import { useEffect } from "react";
import CategoryGrid from "../../components/Partials/CategoryGrid";
import Header from "../../components/Header/Header";

const CategoryDetails = () => {
  const { id } = useParams();
  const url = window.location.origin.includes("localhost")
    ? `http://localhost:7000/categories/${id}`
    : `https://treesury-master.vercel.app/categories/${id}`;
  const [data, error, isPending] = useFetch(url);

  useEffect(() => {
    if (data) {
      document.title = `Trees in the ${data.categoryName} category`;
    }
  });

  return (
    <div className="container">
    <Header/>
    <div className="inner-container">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <>
          <h2 className="page-header">Trees in the {data.categoryName} Family</h2>
          <CategoryGrid information={data} />
        </>
      )}
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

export default CategoryDetails;
