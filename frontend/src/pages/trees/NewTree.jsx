import { useEffect } from "react";
import { Link } from "react-router-dom";
import TreeForm from "../../components/Partials/Tree_Form";
import Header from "../../components/Header/Header";

const NewTree = () => {
  useEffect(() => {
    document.title = "Add New Tree";
  }, []);
  const treeUrl = window.location.origin.includes("localhost")
    ? "http://localhost:7000/trees"
    : "https://treesury-master.vercel.app/trees";

  const newTree = {
    tree_name: "",
    category: "",
    description: "",
    coverImage: [],
  };

  return (
    <div className="container">
      <Header />
      <div className="inner-container">
        <div className="top-space">
          <h2 className="page-header">New Tree</h2>
          <Link
            className="new-category"
            title="Add new category"
            to="/category/new"
          >
            <i className="fas fa-plus"></i>
          </Link>
        </div>
        <form action={treeUrl} method="POST">
          <TreeForm tree={newTree} />
          <div className="form-row form-row-end">
            <Link className="btn btn-danger" to="/trees">
              Cancel <i className="fas fa-times"></i>
            </Link>
            <button className="btn btn-primary" type="submit">
              Add <i className="fas fa-plus"></i>
            </button>
          </div>
        </form>
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

export default NewTree;
