import { IoPersonCircle } from "@/app/_lib/icons";
import groupService from "@/app/group/service";
import { FC } from "react";

const Members = (async (props: { groupId: number }) => {
  const members = await groupService()
    .getGroupById(props.groupId)
    .then((res) => res?.members ?? []);

  return (
    <>
      {members.map((member) => (
        <div
          key={`member-${member.id}`}
          className="h-full w-28 grid grid-rows-[auto_max-content]"
        >
          <IoPersonCircle className="h-full w-auto text-primary-700 m-auto" />
          <div className="m-auto">{member.name}</div>
        </div>
      ))}
    </>
  );
}) as unknown as FC<{
  groupId: number;
}>;

export default Members;
