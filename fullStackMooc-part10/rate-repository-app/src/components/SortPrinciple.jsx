import React from "react";
import RNPickerSelect from "react-native-picker-select";

const SortPrinciple = ({ sortPrinciple, setSortPrinciple }) => {
  const handleValueChange = (value) => {
    if (value && value !== sortPrinciple) {
      setSortPrinciple(value);
    }
  };

  return (
    <RNPickerSelect
      onValueChange={handleValueChange}
      style={{ inputAndroid: { color: "black" } }}
      fixAndroidTouchableBug
      value={sortPrinciple}
      items={[
        { label: "Latest repositories", value: "latest" },
        { label: "Highest rated repositories", value: "highest" },
        { label: "Lowest rated repositories", value: "lowest" },
      ]}
    />
  );
};

export default SortPrinciple;
