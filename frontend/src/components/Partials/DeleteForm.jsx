const DeleteForm = (url) => {
  return (
    <form className="categ-form-del" method="POST" action={`${url}?_method=DELETE`}>
      <button className="btn btn-danger" type="submit" title="Delete item">
        <i className="fas fa-trash"></i>
      </button>
    </form>
  );
};

export default DeleteForm;
