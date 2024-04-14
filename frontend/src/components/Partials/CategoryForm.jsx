import { useState } from "react";

const CategoryForm = ({ category }) => {
  const [formValue, setFormValue] = useState(category);

  return (
    <div class="form-row">
      <div class="form-item">
        <label>Name</label>
        {category && (
          <input
            type="text"
            name="name"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            required
            placeholder={`${formValue ? "" : "Enter the name of the category."}`} 
          />
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
