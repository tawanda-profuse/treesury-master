import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DeleteForm from "./DeleteForm";

const CategoryList = ({ categories }) => {
  return (
    <>
      {categories.map((category) => (
        <div className="author-row" key={category._id}>
          <div className="author-name">{category.name}</div>
          <div className="btn-row">
            <Link
              className="btn btn-primary view-button"
              to={`/categories/${category._id}`}
              title="View category"
            >
              <i className="fas fa-eye"></i>
            </Link>
            <Link
              className="btn btn-primary edit-button"
              to={`/categories/${category._id}/edit`}
              title="Edit category"
            >
              <i className="fas fa-pen"></i>
            </Link>
            <DeleteForm ID={category._id} directory={"categories"} />
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryList;
