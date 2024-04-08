import { useState } from "react";

const FormFields = ({categoryName}) => {
  const [name, setName] = useState(categoryName);
  return (
    <div className="form-row">
      <div className="form-item">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={categoryName}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
          placeholder="Enter the name of the category."
        />
      </div>
    </div>
  );
};

export default FormFields;
