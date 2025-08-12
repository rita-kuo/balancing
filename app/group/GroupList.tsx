"use client";

import React from "react";

import { Group as Model } from "@/app/_model/group";
import Link from "next/link";
import ListItemContainer from "../_component/container/ListItemContainer";

type GroupProps = Pick<Model, "id" | "name" | "members">;
const GroupBlock: React.FC<GroupProps> = (props) => {
  return (
    <div>
      <Link href={`/group/${props.id}`}>
        <ListItemContainer hoverStyle>
          <div className="font-bold text-xl">{props.name}</div>
          <div className="text-sm">
            {props.members.map((member) => member.name).join(", ")}
          </div>
        </ListItemContainer>
      </Link>
    </div>
  );
};

export default GroupBlock;
