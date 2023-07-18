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

export default AttachExistingEquipment;
