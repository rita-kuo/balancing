import React, { PropsWithChildren, ReactNode } from "react";

import { IoClose } from "@/app/_lib/icons";
import { ModalProps } from "../../modal/Modal";
import { clickableIconStyle } from "@/app/_style/icons";
import ClickOutsideContainer from "../../container/ClickOutsideContainer";
import clsx from "clsx";
import { IoBusiness, IoLogOut, IoPerson } from "react-icons/all";
import Link from "next/link";
import useUserContext from "@/app/_context/UserContext";
import { post } from "@/app/_util/api";

interface MenuProps extends ModalProps {}

const Block: React.FC<
  PropsWithChildren<{
    onClick?: () => void;
    href?: string;
  }>
> = (props) => (
  <div
    className={clsx(
      "rounded bg-white shadow divide-y",
      (props.onClick || props.href) && "cursor-pointer",
    )}
  >
    {props.children}
  </div>
);

const Clickable: React.FC<
  PropsWithChildren<{
    icon?: ReactNode;
    onClick?: () => void;
    href?: string;
  }>
> = (props) => {
  const content = (
    <div className="flex gap-2 p-3 items-center">
      {props.icon}
      {props.children}
    </div>
  );
  return (
    <div className="cursor-pointer" onClick={props.onClick}>
      {props.href ? (
        <Link href={props.href} className="block">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
};

const Menu: React.FC<MenuProps> = (props) => {
  const { currentUser, state } = useUserContext();
  return (
    <ClickOutsideContainer
      onOutsideClick={props.onClose}
      className="fixed top-0 right-0 w-[70vw] md:w-[20vw] h-screen bg-white z-50"
    >
      <div className="relative p-3 bg-primary-200 min-h-full space-y-2">
        <IoClose
          className={`${clickableIconStyle} w-7 h-7 ml-auto`}
          onClick={props.onClose}
        />
        <Block>
          <Clickable
            href={state === "loggedOut" ? "/login" : "/dashboard"}
            onClick={() => props.onClose()}
          >
            <div className="flex gap-3 items-center">
              <div className="bg-primary-600 rounded-full">
                <IoPerson className="p-3.5 h-14 w-14 text-white" />
              </div>
              <div className="flex-1">{currentUser?.name ?? "登入"}</div>
            </div>
          </Clickable>
        </Block>
        <Block>
          <Clickable
            href="/group"
            icon={<IoBusiness />}
            onClick={() => props.onClose()}
          >
            群組
          </Clickable>
          <Clickable
            href="/user"
            icon={<IoPerson />}
            onClick={() => props.onClose()}
          >
            使用者管理
          </Clickable>
        </Block>
        <Block>
          <Clickable
            onClick={() =>
              post("/api/logout").then(() => {
                props.onClose();
                window.location.href = "/login";
              })
            }
            icon={<IoLogOut />}
          >
            登出
          </Clickable>
        </Block>
      </div>
    </ClickOutsideContainer>
  );
};

export default Menu;
