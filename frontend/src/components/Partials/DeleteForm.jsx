import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DeleteForm = ({id}) => {
  const history = useHistory();
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000/categories"
    : "https://treesury.onrender.com/categories";

  const deleteCategory = async () => {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    }).then(() => {
      history.push("/categories");
    }, 1000);
  };

  return (
    <form className="categ-form-del">
      <button
        className="btn btn-danger"
        title="Delete item"
        onClick={() => deleteCategory()}
      >
        <i className="fas fa-trash"></i>
      </button>
    </form>
  );
};

export default DeleteForm;
