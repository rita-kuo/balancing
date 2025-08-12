import React from "react";
import "./globals.css";
import { UserProvider } from "@/app/_context/UserContext";
import ModalContextProvider from "@/app/_component/modal/ModalContextProvider";
import LoadingContextProvider from "@/app/_context/LoadingContext";
import Header from "@/app/_component/layout/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Balancing | BritaD",
  description: "BritaD Balancing Service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="text-primary-900">
      <body className="min-h-screen overflow-y-visible">
        <UserProvider>
          <ModalContextProvider>
            <LoadingContextProvider>
              <Header />
              <div className="flex-1 relative md:max-w-4xl m-auto p-4">
                {children}
              </div>
            </LoadingContextProvider>
          </ModalContextProvider>
        </UserProvider>
      </body>
    </html>
  );
}
