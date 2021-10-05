import React, { useState } from "react";

function Dropdown({ title, items, changePageSize }) {
    const [open, setOpen] = useState(false);
  
    const toggle = () => {
      setOpen(!open);
    };
  
    const handleOnClick = (item) => {
      changePageSize(item)
      title=item;
      toggle(!open);
      
    };
  
    return (
      <div className="dropdown-wrapper">
        <div
          tabIndex={0}
          role="button"
          onClick={() => toggle(!open)}
        >
          <button>
            {title}
          </button>
        </div>
        {open && (
          <ul className="dropdown-list">
            {items.map((item, index) => (
              <li key={index} onClick={() => handleOnClick(item)}> 
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  export default Dropdown;