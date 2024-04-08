import "./TreeList.css";
import { Buffer } from "buffer";

const TreeList = ({ trees }) => {
  const treeCoverClass = "tree-cover-large";
  const treeListClass = "tree-grid-large";
  return (
    <>
      <div className={`tree-grid ${treeListClass}`}>
        {trees.map((tree) => (
          <a href={`/trees/${tree._id}`} key={tree._id}>
            <img
              className={`tree-cover ${treeCoverClass}`}
              src={`data:${tree.coverImageType};base64, ${Buffer.from(
                tree.coverImage.data
              ).toString("base64")}`}
              alt=""
            />
            {tree.tree_name}
          </a>
        ))}
      </div>
    </>
  );
};

export default TreeList;
