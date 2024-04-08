import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./TreeList.css";
import { Buffer } from "buffer";

const TreeList = ({ trees }) => {
  return (
    <>
      <div className="tree-grid">
        {trees.map((tree) => (
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
    </>
  );
};

export default TreeList;
