"use client";
import { useEffect } from "react";
import { get, post } from "@/app/_util/api";
import { useSearchParams } from "next/navigation";
import useUserContext from "@/app/_context/UserContext";

const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const { refreshUser } = useUserContext();

  useEffect(() => {
    (code && state
      ? post("/api/line/login", { code, state }).then(() => get("/api/me"))
      : Promise.resolve()
    ).then(refreshUser);
  }, [code, state, refreshUser]);

  return <div></div>;
};

export default Page;
