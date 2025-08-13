"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { User } from "@/app/_model/user";
import { usePathname, useRouter } from "next/navigation";
import { get } from "@/app/_util/api";

const userContext = createContext<{
  state: "init" | "loggedIn" | "loggedOut";
  currentUser?: User;
  refreshUser: () => Promise<void>;
}>({
  state: "init",
  refreshUser: () => Promise.resolve(),
});

const useUserContext = () => useContext(userContext);

export default useUserContext;

export const UserProvider = (props: { children: ReactNode }) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const loading = useRef(false);
  const [state, setState] = useState<"init" | "loggedIn" | "loggedOut">("init");
  const [currentUser, setCurrentUser] = useState<User>();

  const refreshUser = useCallback(
    () =>
      get("/api/me")
        .then((res: User) => {
          if (res) {
            setState("loggedIn");
            setCurrentUser(res);
          } else {
            throw new Error("User not found");
          }
        })
        .catch((e) => {
          setState("loggedOut");
          push("/login");
        }),
    [push],
  );

  useEffect(() => {
    if (
      !loading.current &&
      !pathname.startsWith("/login") &&
      !pathname.endsWith("/dashboard")
    ) {
      loading.current = true;
      refreshUser().then();
    }
  }, [pathname, state, refreshUser]);

  return (
    <userContext.Provider
      value={{
        state,
        currentUser,
        refreshUser,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};
