'use client';
import { SessionProvider } from "next-auth/react"
import {usePathname } from "next/navigation";
import { Hero, Navbar } from "../components";
import MobileSidebar from "../components/MobileSidebar/MobileSidebar";
import "./tailwind-global.scss"
import homePageStyles from './page.module.scss';
import { useState } from "react";


export default function RootLayout({children}: {children: React.ReactNode}) {
  
  const [toggleSidebar, setToggleSidebar] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')  

  const pathName = usePathname()
  return (
    <html>
      <head />
      <body className="hide-scrollbar">
          <SessionProvider>
            {
              pathName === '/login' ? (
                <>
                {children}
                </>
              ) : 
              (<>
                  <div className={homePageStyles.homeContainer}>
                    <Navbar closeToggle={toggleSidebar} />
                        <MobileSidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}/>
                      <div>
                        {
                          pathName === '/' && <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                        }
                      </div>
                      <div>
                      </div>
                      <div className="flex flex-col w-full h-full">
                      {children}
                    </div>
                  </div>
              </>)
            }
          </SessionProvider>
        </body>
    </html>
  )
}
