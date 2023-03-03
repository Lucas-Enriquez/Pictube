'use client'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { MasonryLayout } from '../../../components'
import Spinner from '../../../components/Spinner/Spinner'
import { userPinsQuery, userQuery, userSavedPinsQuery } from '../../../utils/data'
import { client } from '../../client'
import { MdLogout } from "../../../utils";

interface User {
  name?: string,
  email?: string,
  id?: string,
  image?: string,
}

const page = () => {
  const [userData, setUserData] = useState(null)
  const [userCreated, setUserCreated] = useState(null)
  const [text, setText] = useState('created')
  const [activeBtn, setActiveBtn] = useState('created')

  const params = usePathname()
  const userId = params.slice(14)

  const {data} = useSession()
  const user:User = data?.user
  
  const fetchUserData = async () => {
    const fetchedData = await client.fetch(userQuery(userId))
    setUserData(fetchedData[0])
  }

  const fetchUserCreatedPins = async () => {
    const fetchedCreatedPins = await client.fetch(userPinsQuery(userId))
    setUserCreated(fetchedCreatedPins)
  }

  const fetchUserSavedPins = async () => {
    const userSavedPins = await client.fetch(userSavedPinsQuery(userId))
    setUserCreated(userSavedPins)
  }

  useEffect(() => {
    if(params !== undefined) {
      fetchUserData()

    }
  }, [userId])

  useEffect(() => {
    if(text === 'saved') {
      fetchUserSavedPins()
    } else if(text === 'created') {
      fetchUserCreatedPins()
    }
  }, [text, userId])

  const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
  const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

  console.log(user)


  if(userData === undefined || userData === null || data === undefined || user === undefined) return <Spinner message="Loading profile..."/>
  return (
    <>
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-[270px] 2xl:h-[510px] shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={userData.image}
              alt="user-pic"
            />
          </div>
          
          <h1 className="font-bold text-3xl text-center mt-3">
            {userData.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === user.id && (
              <button type="button" className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md" onClick={() => signOut()}>
                <MdLogout color="red" fontSize={21} />
              </button>
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText('created');
              setActiveBtn('created');
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText('saved');
              setActiveBtn('saved');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Saved
          </button>
        </div>


        {userCreated?.length > 0 && (<div className="px-2">
          <MasonryLayout pins={userCreated} />
        </div>)}


        {userCreated?.length === 0 && (
        <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
          No Pins Found!
        </div>
        )}
      </div>

    </div>
    </>
  )
}

export default page