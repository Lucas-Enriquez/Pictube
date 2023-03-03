import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { User } from "../../app/types";


import {
  AiFillCloseCircle,
  AiOutlineUpload,
  HiMenu,
  VscLoading,
  IoMdSearch,
} from "../../utils";

function MobileSidebar({ toggleSidebar, setToggleSidebar }) {
  const { data }: { data: any } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const user:User = data?.user

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
      setToggleSidebar(false);
      router.push(`./search?q=${searchTerm}`);
    }
  };

  return (
    <>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={30}
            color="#0d0c22"
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link href="/">
            <Image
              width="100"
              height="100"
              src="/assets/logo1.png"
              alt="logo"
              className="w-12"
            />
          </Link>
          <Link href={`user-profile/${user?.id}`}>
            {data === undefined ? (
              <VscLoading
                size={"30px"}
                className="spinnerAnimation border-gray-900 border-2 w-full rounded-full"
              />
            ) : (
              <Image
                width={100}
                height={100}
                src={data?.user.image}
                alt="user-pic"
                className="w-9 h-9 rounded-full "
              />
            )}
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-full flex flex-col items-center bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>

            <div className="border-2 border-transparent z-10 mt-10 flex justify-start items-center px-2 rounded-md bg-gray-100 focus-within:shadow-sm hover:border-2 hover:bg-white hover:border-sky-500 transition-all ease-in-out m-5 w-5/6">
              <IoMdSearch fontSize={21} className="ml-1" />
              <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                value={searchTerm}
                onKeyDown={handleKeyDown}
                className="p-2 w-full outline-none rounded-md bg-gray-100 hover:bg-white transition-all ease-in-out"
              />
            </div>

            <div className="bg-[#fb91a4] text-center px-4 py-2 w-5/6 rounded-md">
              <Link
                href="/create-pin"
                onClick={() => setToggleSidebar(false)}
                className="flex justify-center items-center gap-x-2 text-white"
              >
                <p className="text-xl font-semibold">Upload</p>
                <AiOutlineUpload size={"32px"} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MobileSidebar;
