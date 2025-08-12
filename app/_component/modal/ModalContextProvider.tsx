"use client";

import React, { PropsWithChildren, ReactElement, useState } from "react";
import Shadow from "./Shadow";
import { ModalContext } from "@/app/_context/ModalContext";

const ModalContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [modal, setModal] = useState<ReactElement>();
  return (
    <ModalContext.Provider value={{ setModal }}>
      {props.children}
      {modal && (
        <>
          <Shadow />
          <div className="z-50">{modal}</div>
        </>
      )}
    </ModalContext.Provider>
  );
};
export default ModalContextProvider;
