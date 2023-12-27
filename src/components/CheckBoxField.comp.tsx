import React, { useState } from 'react';

interface ICheckBoxProps {
  label: string;
}

const CheckBoxField: React.FC<ICheckBoxProps> = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {label}
      </label>
    </div>
  );
};

export default CheckBoxField;
