import { useEffect, useState } from "react";
import TreeList from "../../components/TreeList/TreeList";
import "./Home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";

const Home = () => {
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000/trees"
    : "https://treesury-master.vercel.app/trees";
  const [trees, setTrees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    document.title = "Treesury Home";

    const fetchData = async (queryParams = "") => {
      try {
        const response = await axios.get(`${url}${queryParams}`);
        setTrees(response.data.trees);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(error.response.data?.message);
        console.error("Error: ", error);
      } finally {
        setIsPending(false);
      }
    };

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", currentPage);
    fetchData(`?${searchParams.toString()}`);
  }, [location.search, currentPage, url]);

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="inner-container">
        <h2 className="page-header">All Trees</h2>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...🔃</div>}
        {trees && (
          <TreeList
            trees={trees}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
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

export default Home;
