import { Link, useParams } from "react-router-dom";
import TreeForm from "../../components/Partials/Tree_Form";
import useFetch from "../../utils/useFetch";
import { useEffect } from "react";
import Header from "../../components/Header/Header";

const EditTree = () => {
  const { id } = useParams();
  const url = window.location.origin.includes("localhost")
    ? `http://localhost:7000/trees/${id}`
    : `https://treesury-master.vercel.app/trees/${id}`;
  const [data, error, isPending] = useFetch(url);

  useEffect(() => {
    if (data.tree) {
      document.title = `Editing Tree Details for ${data.tree.tree_name} Tree`;
    }
  });

  return (
    <div className="container">
      <Header />
      <div className="inner-container">
        <h2 className="page-header">Edit Tree Details</h2>
        {error && <label>{error}</label>}
        {isPending && <label>Loading...</label>}
        {data.tree && (
          <form action={`${url}?_method=PUT`} method="POST">
            <TreeForm tree={data.tree} />
            <div className="form-row form-row-end btn-row">
              <Link className="btn btn-danger" to="/trees">
                Cancel
              </Link>
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </div>
          </form>
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

export default EditTree;
