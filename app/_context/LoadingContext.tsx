"use client";
import React, { createContext, useContext } from "react";
import { BiLoaderAlt } from "react-icons/all";

const LoadingContext = createContext<(loading: boolean) => void>(() => {});

export const useLoading = () => useContext(LoadingContext);

const LoadingContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <LoadingContext.Provider value={setLoading}>
      {props.children}
      {loading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 h-full w-full bg-white/50 z-40">
          <div className="relative h-full w-full">
            <BiLoaderAlt className="animate-spin absolute m-auto w-14 h-14 top-0 bottom-0 left-0 right-0" />
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
