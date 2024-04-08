import React from "react";
import { Buffer } from "buffer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CategoryGrid = ({ information }) => {
  const bookCoverClass = "book-cover-large";
  const bookGridClass = "book-grid-large";
  return (
    <div className={`book-grid ${bookGridClass}`}>
      {information.map((data) => (
        <Link to={`/trees/${data._id}`} key={data._id}>
          <img
            className={`book-cover ${bookCoverClass}`}
            src={`data:${data.coverImageType};base64, ${Buffer.from(
              data.coverImage.data
            ).toString("base64")}`}
            alt={data.tree_name}
          />
          {data.tree_name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
