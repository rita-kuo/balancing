import CreateButton from "./CreateButton";
import UserItem from "./UserItem";
import userService from "@/app/user/service";
import React from "react";

export default async function Page() {
  const users = await userService().getUsers();

  return (
    <div className="[&>*+*]:mt-3">
      <CreateButton />
      {users.map((user) => (
        <UserItem key={`user-${user.id}`} {...user} />
      ))}
    </div>
  );
}
