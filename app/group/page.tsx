import CreateButton from "./CreateButton";
import groupService from "@/app/group/service";
import React from "react";
import GroupBlock from "@/app/group/GroupList";

export default async function Page() {
  const groups = await groupService().getGroups();
  return (
    <div className="[&>*+*]:mt-3">
      <CreateButton />
      {groups?.map((group) => (
        <GroupBlock key={`group-${group.id}`} {...group} />
      ))}
    </div>
  );
}
