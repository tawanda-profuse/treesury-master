import { useEffect, useState } from "react";
import TreeList from "../../components/TreeList/TreeList";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";

const Trees = () => {
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000/trees"
    : "https://treesury-master.vercel.app/trees";
  const [trees, setTrees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "All Trees";

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

  const handleSearch = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const searchParams = new URLSearchParams(form);
    searchParams.set("page", currentPage);
    navigate(`?${searchParams.toString()}`);
  };

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
    <>
      <div className="container">
        <Header />
        <div className="inner-container">
          <h2 className="page-header">Search Trees</h2>
          <form onSubmit={handleSearch}>
            <div className="form-row">
              <div className="form-item">
                <label>Tree Name</label>
                <input
                  type="text"
                  name="tree_name"
                  placeholder="Search for a tree name"
                />
              </div>
            </div>
            <div className="form-row">
              <button className="">Search</button>
            </div>
          </form>
          <br />
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}
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
    </>
  );
};

export default Trees;
