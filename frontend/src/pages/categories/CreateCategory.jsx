import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Categories.css";
import Header from "../../components/Header/Header";

const CreateCategory = () => {
  useEffect(() => {
    document.title = "Add New Tree Category";
  }, []);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000/categories"
    : "https://treesury-master.vercel.app/categories";

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
      navigate("/categories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="inner-container">
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
              Cancel <i className="fas fa-times"></i>
            </Link>
            <button
              className="btn btn-primary edit-button"
              type="submit"
              title="Add item"
            >
              Add <i className="fas fa-plus"></i>
            </button>
          </div>
        </form>
      </div>
      <footer>
        <a
          href="https://en.wikipedia.org/wiki/List_of_tree_genera"
          target="_blank"
          rel="noreferrer"
        >
          Tree Family Reference <i className="fas fa-tree"></i>
        </a>
      </footer>
    </div>
  );
};

export default CreateCategory;
