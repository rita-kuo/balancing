"use client";

import Image from "next/image";
import { post } from "@/app/_util/api";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import clsx from "clsx";
import { BiLoaderAlt } from "react-icons/all";
import queryString from "querystring";

const LoginWithLine = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(() => {
    setLoading(true);
    post("/api/line/create-login-info")
      .then((res) => res?.json())
      .then((info: { state: string; nonce: string; client_id: string }) => {
        const payload = {
          ...info,
          response_type: "code",
          redirect_uri: encodeURI(
            `${process.env.NEXT_PUBLIC_HOST_NAME}/dashboard`,
          ),
          scope: "profile openid email",
        };
        router.push(
          `https://access.line.me/oauth2/v2.1/authorize?${queryString.stringify(payload)}`,
        );
      })
      .catch(() => setLoading(false));
  }, [router]);

  return (
    <div className="text-base w-max">
      <button
        onClick={onClick}
        className={clsx(
          "h-max inline-block rounded m-[0.4em] overflow-hidden",
          loading ? "border border-[#e5e5e599] bg-white" : "bg-[#06c755]",
        )}
      >
        <div
          className={clsx(
            "flex h-[3em]",
            loading ? "" : "hover:bg-black/10 active:bg-black/30",
          )}
        >
          <Image
            src="/lineLogo.png"
            alt="LINE Logo"
            width={100}
            height={100}
            className={clsx(
              "w-[3em] h-full",
              loading ? "invert opacity-[17.7%]" : "",
            )}
          />
          <div
            className={clsx(
              "border-l h-full px-[3em] relative flex items-center",
              loading
                ? "border-[#E5E5E5]/[60%] text-[#1E1E1E]/[20%]"
                : "border-black/[8%]  text-white",
            )}
          >
            Log in with LINE
            {loading && (
              <BiLoaderAlt className="w-4 h-4 animate-spin inline align-text-top absolute right-[1.5em]" />
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default LoginWithLine;
