import groupService from "@/app/group/service";
import React, { FC } from "react";
import Avatar from "@/app/_component/britad/user/Avatar";
import { User } from "@/app/_model/user";

const Members = (async (props: { groupId: number }) => {
  const members = await groupService()
    .getGroupById(props.groupId)
    .then((res) => res?.members ?? []);

  return (
    <>
      {members.map((member) => (
        <div
          key={`member-${member.id}`}
          className="h-full w-28 gap-2 grid grid-rows-[auto_max-content] justify-center"
        >
          <Avatar user={member as User} size="h-20 w-20" />
          <div className="m-auto">{member.name}</div>
        </div>
      ))}
    </>
  );
}) as unknown as FC<{
  groupId: number;
}>;

export default Members;
