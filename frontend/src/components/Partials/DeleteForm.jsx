const DeleteForm = ({ ID, directory }) => {
  const url = window.location.origin.includes("localhost")
    ? `http://localhost:7000/${directory}`
    : `https://treesury.onrender.com/${directory}`;

  return (
    <form
      className="categ-form-del"
      action={`${url}/${ID}?_method=DELETE`}
      method="POST"
    >
      <button className="btn btn-danger" title="Delete item" type="submit">
        <i className="fas fa-trash"></i>
      </button>
    </form>
  );
};

export default DeleteForm;
