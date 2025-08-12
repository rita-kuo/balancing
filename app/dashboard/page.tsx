"use client";
import { Suspense } from "react";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Dashboard } from "@/app/dashboard/dashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

const Page = () => (
  <Suspense fallback={null}>
    <Dashboard />
  </Suspense>
);

export default Page;
