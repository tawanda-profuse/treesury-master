import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Categories.css";

const CreateCategory = () => {
  useEffect(() => {
    document.title = "Add New Tree Category";
  }, []);
  const history = useHistory();
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000/categories"
    : "https://treesury.onrender.com/categories";

  const handleAddCategory = async (event) => {
    event.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    const newCategory = await response.json();

    try {
      setCategory([newCategory, ...category]);
      setName("");
      history.push("/categories");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2 className="page-header">New Category</h2>
      <form onSubmit={(e) => handleAddCategory(e)}>
        <div className="form-row">
          <div className="form-item">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              placeholder="Enter the name of the category."
            />
          </div>
        </div>
        <div className="form-row form-row-end btn-row">
          <Link className="btn btn-danger" to="/categories" title="Cancel">
            <i className="fas fa-times"></i>
          </Link>
          <button
            className="btn btn-primary edit-button"
            type="submit"
            title="Add item"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateCategory;
