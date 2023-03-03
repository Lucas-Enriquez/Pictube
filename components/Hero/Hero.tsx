'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { IoMdSearch } from '../../utils';

import { categories } from '../../utils/data';
import navbarStyles from './navbar.module.scss';

function Hero({ searchTerm, setSearchTerm }) {
  const router = useRouter();
  const pathName = usePathname();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.target.value);
      router.push(`./search?q=${searchTerm}`);
    }
  };

  return (
    <>
      {/*Categorías*/}
      <div className={navbarStyles.navbarContainer}>
        <div className={navbarStyles.categoriesContainer}>
          {categories.map((category) => (
            <Link
              href={`category/${category.name}`}
              key={category.name}
              className={pathName === `/category/${category.name}` ? navbarStyles.active : navbarStyles.category}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/*Título de Hero*/}
        <div className={navbarStyles.titleContainer}>
          <h1 className={navbarStyles.title}>Explore user's pins</h1>
        </div>

        {/*Barra de búsqueda*/}
        <div className=" mt-5 pb-7 w-full flex justify-center">
          <div className="flex justify-start items-center w-[600px] px-2 rounded-full bg-white border-none outline-none focus-within:shadow-sm">
            <IoMdSearch fontSize={21} className="ml-1" />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              value={searchTerm}
              onKeyDown={handleKeyDown}
              className="p-2 w-full bg-white outline-none rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
