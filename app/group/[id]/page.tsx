import groupService from "../service";
import AddMemberButton from "./AddMember";
import { IoPerson } from "@/app/_lib/icons";
import CreateBalanceButton from "@/app/_component/britad/balance/CreateButton";
import { PageProps } from "@/app/_lib/next-type";
import Members from "./MemberList";
import BalanceList from "./BalanceList";
import userService from "@/app/user/service";
import { User } from "@/app/_model/user";

export default async function Page(props: PageProps) {
  const groupId = Number.parseInt((await props.params)?.id);
  const group = await groupService().getGroupById(groupId);
  const addMemberOptions = (await userService().getUsers({
    notInGroup: groupId,
  })) as User[];
  return (
    <div className="[&>*+*]:mt-5">
      <div className="flex justify-between">
        <div className="flex gap-4 items-end">
          <div className="font-bold text-3xl">{group?.name}</div>
          <div className="flex items-center">
            <IoPerson className="mr-1" />
            {group?.members.length}
          </div>
        </div>
        <AddMemberButton
          groupId={groupId}
          addMemberOptions={addMemberOptions}
        />
      </div>
      <div className="w-full flex h-28 overflow-auto [&>*+*]:ml-4">
        <Members groupId={groupId} />
      </div>
      <div className="border-t" />
      <div className="flex items-end">
        <div className="text-2xl font-bold">收支表</div>
        <CreateBalanceButton ownerType="GROUP" ownerId={groupId} />
      </div>
      <div>
        <BalanceList groupId={groupId} />
      </div>
    </div>
  );
}
