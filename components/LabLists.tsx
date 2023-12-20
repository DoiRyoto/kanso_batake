import React from "react";
import { labType } from "@/constants";
import LabCard from "./LabCard";

const LabLists = async ({ tag } : { tag?: string }) => {
  const labLists: labType[] = [];

  return (
    
    <div className="flex flex-col gap-2">
      {labLists.map((lab) => {
        return <LabCard key={lab.value} labData={lab} />;
      })}
    </div>
  );
};

export default LabLists;