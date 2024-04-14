import useFetch from "../../utils/useFetch";
import UploadTreeImage from "../UploadTreeImage";
import { useState } from "react";

const TreeForm = ({ tree }) => {
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000/categories"
    : "https://treesury.onrender.com/categories";
  const [categories, isPending, error] = useFetch(url);
  const [treeName, setTreeName] = useState(tree.tree_name);
  const [categoryID, setCategoryID] = useState(tree.category);
  const [description, setDescription] = useState(tree.description);
  const [coverImage, setCoverImage] = useState(tree.coverImage.data);

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
      <div className="form-row">
        <div className="form-item">
          <label>Tree Name</label>
          <input
            type="text"
            name="tree_name"
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
            onChange={(e) => setCategoryID(e.target.value)}
            value={categoryID}
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
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default TreeForm;
