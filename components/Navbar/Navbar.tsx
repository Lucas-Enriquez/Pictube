import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import navBarStyles from "./navbar.module.scss";
import { AiOutlineLoading3Quarters, GoSignOut, IoMdSearch } from "../../utils";
import { User } from "../../app/types";


function Navbar({ closeToggle }) {
  const [searchTerm, setSearchTerm] = useState("");

  const paramsOne = useSearchParams();
  const search = paramsOne.get('q')

  const { data } = useSession();
  const router = useRouter();

  const user:User = data?.user

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
      router.push(`./search?q=${searchTerm}`);
    }
  };


  return (
    <div className={navBarStyles.sidebarContainer}>
      <div className="flex">
        <Link
          href="/"
          className={navBarStyles.sidebarLogo}
          onClick={handleCloseSidebar}
        >
          <Image
            width="1000"
            height="1000"
            src={"/assets/logo1.png"}
            alt="logo"
            className="w-9 object-cover"
          />
        </Link>
      </div>
      <div className="flex gap-x-3 items-center justify-center">
        {/*
            Acá va a ir la barra de búsqueda
          */}
        <div className="w-full flex justify-center">
          <div className="flex justify-start items-center w-[600px] px-2 rounded-full bg-white border-2 border-gray-100 outline-none focus-within:shadow-sm">
            <IoMdSearch fontSize={21} className="ml-1" />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={!search ? "Search": searchTerm}
              value={searchTerm}
              onKeyDown={handleKeyDown}
              className="p-2 w-full bg-white outline-none rounded-full"
            />
          </div>
        </div>

        <Link className="w-full" href={`user-profile/${user?.id}`}>
          {data === undefined ? (
            <AiOutlineLoading3Quarters
              color="#2b2c2f"
              className="w-9 h-12 spinnerAnimation"
            />
          ) : (
            <Image
              width={100}
              height={100}
              src={data?.user.image}
              alt="user-pic"
              className={navBarStyles.profilePicture}
            />
          )}
        </Link>
        <Link href="/create-pin" className={navBarStyles.createPin}>
          <p>Upload</p>
        </Link>
        <div className={navBarStyles.logout}>
          <GoSignOut onClick={() => signOut()} className="pt-1" size={36} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
