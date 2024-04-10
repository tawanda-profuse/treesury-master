import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../../utils/useFetch";
import UploadTreeImage from "../../components/UploadTreeImage";

const NewTree = () => {
  useEffect(() => {
    document.title = "Add New Tree";
  }, []);
  const history = useHistory();
  const [treeName, setTreeName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [trees, setTrees] = useState([]);
  const categoryUrl = window.location.origin.includes("localhost")
    ? "http://localhost:7000/categories"
    : "https://treesury.onrender.com/categories";
  const [categories, isPending, error] = useFetch(categoryUrl);
  const treeUrl = window.location.origin.includes("localhost")
    ? "http://localhost:7000/trees"
    : "https://treesury.onrender.com/trees";

  const handleFileUpload = (fileItems) => {
    if (fileItems.length > 0) {
      const uploadedFile = fileItems[0].file;
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result; // Get base64-encoded string
        setCoverImage(base64String); // Store base64 string in state
      };
      // Read the uploadedFile (Blob) as data URL
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleAddTree = async (event) => {
    event.preventDefault();
    const response = await fetch(treeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        treeName,
        category,
        description,
        coverImage,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add tree");
    }

    const newTree = await response.json();
    
    try {
      console.log(newTree);
      setTreeName("");
      setCategory("");
      setDescription("");
      setCoverImage(null);
      setTrees([newTree, ...trees]);
      history.push(`/trees/${newTree._id}`);
    } catch (error) {
      console.error("Error adding tree:", error);
    }
  };

  return (
    <>
      <div className="top-space">
        <h2 className="page-header">New Tree</h2>
        <Link
          className="new-category"
          title="Add new category"
          to="/category/new"
        >
          <i className="fas fa-plus"></i>
        </Link>
      </div>
      <form onSubmit={(e) => handleAddTree(e)}>
        <div className="form-row">
          <div className="form-item">
            <label>Tree Name</label>
            <input
              type="text"
              name="tree_name"
              placeholder="Enter a tree name"
              value={treeName}
              onChange={(e) => setTreeName(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label>Family (Genus)</label>
            {error && <label>{error}</label>}
            {isPending && <label>{isPending}</label>}
            <select
              id="category-selector"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories &&
                categories.map((category) => (
                  <option
                    label={category.name}
                    value={category._id}
                    key={category._id}
                  ></option>
                ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-item form-item-no-grow">
            <label>Image</label>
            <UploadTreeImage handleFileUpload={handleFileUpload} />
          </div>
          <div className="form-item">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Give details about the tree"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row form-row-end">
          <Link className="btn btn-danger" to="/trees">
            Cancel <i className="fas fa-times"></i>
          </Link>
          <button className="btn btn-primary" type="submit">
            Add <i className="fas fa-plus"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default NewTree;
