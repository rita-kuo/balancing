import { IoPerson } from "react-icons/all";
import Image from "next/image";
import React from "react";
import { User } from "@/app/_model/user";
import clsx from "clsx";

const Avatar: React.FC<{ user?: User; size: string }> = (props) => {
  return (
    <div
      className={clsx(
        "relative bg-primary-600 rounded-full overflow-hidden",
        props.size,
      )}
    >
      <IoPerson className="p-3.5 h-full w-full text-white" />
      {props.user?.avatar && (
        <Image src={props.user.avatar} alt={props.user.name} fill />
      )}
    </div>
  );
};

export default Avatar;
