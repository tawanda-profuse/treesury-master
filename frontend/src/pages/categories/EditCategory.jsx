import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import CategoryForm from "../../components/Partials/CategoryForm";
import useFetch from "../../utils/useFetch";
import { useEffect } from "react";

const EditCategory = () => {
  const { id } = useParams();
  const url = window.location.origin.includes("localhost")
  ? `http://localhost:7000/categories/${id}`
  : `https://treesury-master.vercel.app/categories/${id}`;
  const [data, error, isPending] = useFetch(url);
  useEffect(() => {
    if(data.trees){
      document.title = `Editing ${data.categoryName} Tree Category`;
    }
  });
  
  return (
    <>
      <h2 className="page-header">Edit Category</h2>
      {error && <label>{error}</label>}
      {isPending && <label>Loading...</label>}
      {data.trees && (
        <form
          action={`${url}?_method=PUT`}
          method="POST"
        >
          <CategoryForm category={data.categoryName} />
          <div className="form-row form-row-end btn-row">
            <Link className="btn btn-danger" to={`/categories/${id}`}>
              Cancel
            </Link>
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditCategory;
