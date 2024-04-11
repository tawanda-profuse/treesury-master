import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DeleteForm = ({ID, directory}) => {
  const history = useHistory();
  const url = window.location.origin.includes("localhost")
    ? `http://localhost:7000/${directory}`
    : `https://treesury.onrender.com/${directory}`;

  const deleteObject = async () => {
    fetch(`${url}/${ID}`, {
      method: "DELETE",
    }).then(() => {
      history.push(`/${directory}`);
    });
  };

  return (
    <form className="categ-form-del">
      <button
        className="btn btn-danger"
        title="Delete item"
        onClick={() => deleteObject()}
      >
        <i className="fas fa-trash"></i>
      </button>
    </form>
  );
};

export default DeleteForm;
