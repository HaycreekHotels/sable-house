import Image from "next/image";
import Link from "next/link";
import MenuDrawer from "./MenuDrawer";

import Logo from "../../../../../public/images/logos/SH_Primary Logo Offwhite.png";

export default function NavBar() {
  return (
    <nav className="bg-transparent flex justify-between items-center h-20 p-6">
      <button
        className="relative bg-transparent cursor-pointer flex flex-col justify-between h-6 w-10 p-0"
        aria-label="Menu"
        aria-expanded="false"
      >
        <span className="bg-white rounded-lg h-px w-full transition-all delay-150 ease-in-out"></span>
        <span className="bg-white rounded-lg h-px w-full transition-all delay-150 ease-in-out"></span>
        <span className="bg-white rounded-lg h-px w-full transition-all delay-150 ease-in-out"></span>
      </button>
      <Image
        src={Logo}
        width={100}
        height="auto"
        alt="Sabal House Hotel logo"
      />

      <Link
        className="flex justify-center items-center bg-black text-secondary text-sm uppercase font-bold py-2 px-4"
        href="#"
      >
        Book Your Stay
      </Link>
    </nav>
  );
}
