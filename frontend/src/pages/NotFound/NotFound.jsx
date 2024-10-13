import Header from "../../components/Header/Header";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <div className="container">
        <Header />
        <div className="inner-container">
          <div className="not-found">
            <h1 className="page-header">Page Not Found</h1>
            <div className="tree-animation">
              <i className="fas fa-tree"></i>
            </div>
          </div>
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

export default NotFound;
