"use client";
import { useEffect, useRef, useState } from "react";
import { get, post } from "@/app/_util/api";
import { useSearchParams } from "next/navigation";
import useUserContext from "@/app/_context/UserContext";
import UserBriefing from "@/app/_model/dto/UserBriefing";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { BiLoaderAlt } from "react-icons/all";

ChartJS.register(ArcElement, Tooltip, Legend);

const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const { currentUser, refreshUser, state: userState } = useUserContext();
  const init = useRef(false);
  const [briefing, setBriefing] = useState<UserBriefing>();
  const percentage = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (init.current) return;

    init.current = true;
    (code && state
      ? post("/api/line/login", { code, state })
          .then(() => get("/api/me"))
          .then(refreshUser)
      : userState === "init"
        ? refreshUser().then()
        : Promise.resolve()
    )
      .then(() => get("/api/user/briefing"))
      .then(setBriefing);
  }, [code, state, refreshUser, userState]);

  return (
    <div className="space-y-2">
      <h1>{`Hi, ${currentUser?.name ?? ""}`}</h1>
      <h2>近 30 天支出分佈</h2>
      <div className="relative w-full pt-[100%]">
        {briefing ? (
          <div className="absolute w-full h-full top-0 left-0">
            <Pie
              data={{
                labels: briefing.expensePercentageIn30Days.map(
                  (data) => `${data.balanceName} (${data.amountPercentage}%)`,
                ),
                datasets: [
                  {
                    label: "金額",
                    data: briefing.expensePercentageIn30Days.map(
                      (data) => data.totalAmount,
                    ),
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        ) : (
          <BiLoaderAlt className="animate-spin w-14 h-14 absolute m-auto top-0 bottom-0 left-0 right-0" />
        )}
      </div>
    </div>
  );
};

export default Page;
