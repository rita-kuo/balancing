import React, { PropsWithChildren } from "react";
import Header from "./Header";
import ModalContextProvider from "../modal/ModalContextProvider";
import { UserProvider } from "@/app/_context/UserContext";

const Layout: React.FC<PropsWithChildren> = (props) => {
  return (
    <UserProvider>
      <ModalContextProvider>
        <Header />
        <div className="md:max-w-4xl m-auto p-4">{props.children}</div>
      </ModalContextProvider>
    </UserProvider>
  );
};

export default Layout;
