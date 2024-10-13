import { Link } from "react-router-dom";
import "./TreeList.css";
import { Buffer } from "buffer";

const TreeList = ({
  trees,
  handleNextPage,
  handlePreviousPage,
  currentPage,
  totalPages,
}) => {
  return (
    <>
      <div className="tree-grid">
        {trees?.map((tree) => (
          <Link to={`/trees/${tree._id}`} key={tree._id}>
            <img
              className="tree-cover"
              src={`data:${tree.coverImageType};base64, ${Buffer.from(
                tree.coverImage.data
              ).toString("base64")}`}
              alt=""
            />
            {tree.tree_name}
          </Link>
        ))}
      </div>
      {trees.length > 0 && <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          style={{
            backgroundColor: currentPage === 1 ? "#ccc" : "",
          }}
        >
          Previous
        </button>
        <span>
          Page{" "}{currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          style={{ backgroundColor: currentPage === totalPages ? "#ccc" : "" }}
        >
          Next
        </button>
      </div>}
    </>
  );
};

export default TreeList;
