import React from "react";

import Logo from "../britad/Logo";
import MenuButton from "./MenuButton";
import Link from "next/link";

const Header: React.FC = (_) => {
  return (
    <div className="sticky top-0 z-50 flex justify-center py-2 bg-primary-800">
      <Link href="/dashboard">
        <Logo className="text-white" />
      </Link>
      <MenuButton />
    </div>
  );
};

export default Header;
