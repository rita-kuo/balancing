"use client";

import { IoCheckmark } from "../_lib/icons";
import React from "react";
import ListItemContainer from "../_component/container/ListItemContainer";
import { User } from "@prisma/client";
import useUserContext from "@/app/_context/UserContext";

const UserItem: React.FC<Pick<User, "id" | "name" | "email"> & {}> = (
  props,
) => {
  const { currentUser } = useUserContext();
  return (
    <ListItemContainer className="flex justify-between items-center">
      <div>
        <div className="font-bold">{props.name}</div>
        <div>{props.email}</div>
      </div>
      {props.id === currentUser?.id && (
        <IoCheckmark className="h-8 w-auto text-green-500" />
      )}
    </ListItemContainer>
  );
};

export default UserItem;
