import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import localApi from "../API/Api";
import DataContext from "../Context/Context";

const AttachExistingEquipment = () => {
  const { selectEquipment, setSelectEquipment } = useContext(DataContext);
  const [data, setData] = useState([]); //Fetch Equipments

  const fetchData = async () => {
    let responseEquipment = await localApi.get("equipments");
    setData(responseEquipment.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Select
        options={data.map((det) => ({
          value: det.desc,
          label: det.desc,
        }))}
        isClearable
        onChange={(selectedOption) =>
          setSelectEquipment(
            selectedOption ? selectedOption.label : null,
            selectedOption ? selectedOption.value : null
          )
        }
        placeholder="Select Equipment"
      />
    </div>
  );
};

const SearchPO = () => {
  const options = [
    "Apple",
    "Banana",
    "Cherry",
    "Grapes",
    "Orange",
    "Pineapple"
  ];
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setQuery(value);

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  const handleSelectOption = (option) => {
    setQuery(option); // Set the selected option as the query
    setFilteredOptions([]); // Clear the filteredOptions to hide the dropdown list
  };

  return (
    <div>
      <div className="dropdown-container">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
        />
        {query && filteredOptions.length > 0 && (
          <ul className="dropdown-list">
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleSelectOption(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export { AttachExistingEquipment, SearchPO };
