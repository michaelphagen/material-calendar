import React, { FunctionComponent } from "react";
import List from "@material-ui/core/List";
import EquipmentItem from "./EquipmentItem";
import Equipment from "../resources/Equipment";

interface EquipmentStandardListProps {
  equipmentList?: Equipment[];
  reserveEquipment: (id: number, quantity: number) => void;
  selectedEquipment: {
    [k: string]: any;
  };
  setFieldValue: (field: string, value: any) => void;
}
const EquipmentStandardList: FunctionComponent<EquipmentStandardListProps> = ({
  equipmentList,
  selectedEquipment,
  setFieldValue,
  reserveEquipment,
}) => {
  // Create list of single elements. may not work properly for singletons
  return (
    <List
      style={{
        flexDirection: "column",
        minWidth: "100%",
      }}
    >
      {equipmentList &&
        equipmentList.map((item) => (
          <EquipmentItem
            key={item.id}
            item={item}
            values={selectedEquipment[item.modelId]}
            setFieldValue={setFieldValue}
            reserveEquipment={reserveEquipment}
          />
        ))}
    </List>
  );
};
export default EquipmentStandardList;
