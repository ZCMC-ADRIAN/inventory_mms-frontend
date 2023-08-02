import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import localApi from "../API/Api";
import DataContext from "../Context/Context";
import { Input } from "@chakra-ui/react";

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
  const {poNum, setPONum, poSelected, setPoSelected} = useContext(DataContext);
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const fetchData = async () => {
    try {
      const responsePO = await localApi.get("po");
      setOptions(responsePO.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const { value } = event.target;
    setPONum(value);

    const filteredOptions = options.filter((option) =>
      option.po_number.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  const handleSelectOption = (option) => {
    setPONum(option.po_number); // Set the selected option's PO number as the query
    setFilteredOptions([]); // Clear the filteredOptions to hide the dropdown list
    if(poNum === ''){
      setPoSelected(false);
    }else {
      setPoSelected(true);
    }
  };

  return (
    <div>
      <div className="dropdown-container">
        <Input
          type="text"
          placeholder="Search..."
          value={poNum}
          onChange={handleSearch}
        />
        {poNum && filteredOptions.length > 0 ? (
          <ul className="dropdown-list">
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleSelectOption(option)}>
                {option.po_number}
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export { AttachExistingEquipment, SearchPO };
