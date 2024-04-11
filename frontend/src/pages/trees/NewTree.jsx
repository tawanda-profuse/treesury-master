import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../../utils/useFetch";
import UploadTreeImage from "../../components/UploadTreeImage";

const NewTree = () => {
  useEffect(() => {
    document.title = "Add New Tree";
  }, []);
  const [coverImage, setCoverImage] = useState(null);
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
      console.log(coverImage);
      // Read the uploadedFile (Blob) as data URL
      reader.readAsDataURL(uploadedFile);
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
      <form action={treeUrl} method="POST">
        <div className="form-row">
          <div className="form-item">
            <label>Tree Name</label>
            <input
              type="text"
              name="tree_name"
              placeholder="Enter a tree name"
              required
            />
          </div>
          <div className="form-item">
            <label>Family (Genus)</label>
            <select id="category-selector" name="category">
              {error && <option>{error}</option>}
              {isPending && <option>Loading...</option>}
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
