import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../../utils/useFetch";

const NewTree = () => {
  useEffect(() => {
    document.title = "Add New Tree";
  }, []);
  const history = useHistory();
  const [treeName, setTreeName] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [description, setDescription] = useState("");
  const [trees, setTrees] = useState([]);
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000"
    : "https://treesury.onrender.com";
  const [categories, isPending, error] = useFetch(`${url}/categories`);

  const handleAddTree = async (event) => {
    event.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        treeName,
        category,
        coverImage,
        description,
      }),
    });

    const newTree = await response.json();

    try {
      setTrees([newTree, ...trees]);
      setTreeName("");
      setCategory("");
      setCoverImage("");
      setDescription("");
      history.push("/trees");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2 class="page-header">New Tree</h2>
      <form onSubmit={(e) => handleAddTree(e)}>
        <div class="form-row">
          <div class="form-item">
            <label>Tree Name</label>
            <input
              type="text"
              name="tree_name"
              value={treeName}
              onChange={(e) => setTreeName(e.target.value)}
            />
          </div>
          <div class="form-item">
            <label>Family (Genus)</label>
            <select
              id="category-selector"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories &&
                categories.map((category) => (
                  <option label={category.name} value={category._id}></option>
                ))}
            </select>
          </div>
          <Link
            class="new-category"
            title="Add new category"
            to="/category/new"
          >
            <i class="fas fa-plus"></i>
          </Link>
        </div>
        <div class="form-row">
          <div class="form-item form-item-no-grow">
            <label>Image</label>
            <input type="file" name="cover" class="book-cover filepond" onChange={(e) => setCoverImage(e.target.value)}/>
          </div>
          <div class="form-item">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Give details about the tree"
            ></textarea>
          </div>
        </div>
        <div class="form-row form-row-end btn-row">
          <a class="btn btn-danger" href="/trees">
            Cancel
          </a>
          <button class="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default NewTree;
