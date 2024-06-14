import React, { useState } from "react";
import { GoFilter } from "react-icons/go";

const FilterComponent = ({ onFilterChange }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const filters = {
    Category: [
      "Artificial Intelligence",
      "Web Development",
      "Machine Learning",
    ],
    Level: ["Beginner", "Intermediate", "Advanced"],
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleOptionSelect = (filter, option) => {
    setSelectedOptions((prev) => {
      const options = prev[filter] || [];
      let newOptions;
      if (options.includes(option)) {
        newOptions = options.filter((item) => item !== option);
      } else {
        newOptions = [...options, option];
      }
      const updatedOptions = {
        ...prev,
        [filter]: newOptions,
      };
      onFilterChange(updatedOptions); // Call onFilterChange here
      return updatedOptions;
    });
  };

  const handleResetFilters = () => {
    setSelectedOptions({});
    onFilterChange({});
  };

  return (
    <div className="relative">
      <GoFilter className="w-10 h-10 -ml-28 cursor-pointer select-none" onClick={toggleDropdown} />
      
      {dropdownVisible && (
        <div className="absolute right-0 mt-2 py-2 w-96 bg-white rounded-md shadow-lg z-10">
          <div className="grid grid-cols-2 gap-x-4 px-4">
            {Object.keys(filters).map((filter) => (
              <div key={filter}>
                <div className="py-2 text-gray-800 font-bold text-sm">
                  {filter}
                </div>
                {filters[filter].length > 0 ? (
                  filters[filter].map((option) => (
                    <div key={option} className="flex items-center py-1">
                      <input
                        type="checkbox"
                        checked={(selectedOptions[filter] || []).includes(
                          option
                        )}
                        onChange={() => handleOptionSelect(filter, option)}
                        className="form-checkbox h-4 w-4 text-blue-600 mr-2"
                      />
                      <span className="text-gray-800 text-sm">{option}</span>
                    </div>
                  ))
                ) : (
                  <div className="py-1 text-gray-800 text-sm">
                    No options available
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="px-4 py-2 mx-auto w-44">
            <button
              onClick={handleResetFilters}
              className="w-full px-4 py-2 bg-red-500 text-white border border-red-500 rounded-md shadow-sm hover:bg-red-600 focus:outline-none text-sm"
            >
              Reset Filters
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
