import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { labType } from "@/constants";

const LabCard = ({ labData }: { labData: labType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate leading-normal">
          {labData.value}
        </CardTitle>
        <CardDescription>
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className="flex gap-2">
      </CardContent> 
    </Card>
  );
};

export default LabCard;
