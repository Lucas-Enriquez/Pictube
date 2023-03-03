'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../../../components/Spinner/Spinner';
import { pinDetailMorePinQuery, pinDetailQuery } from '../../../utils/data';
import { client } from '../../client';
import { MasonryLayout } from '../../../components';

import {FiArrowUpRight, MdDownloadForOffline} from '../../../utils'

interface User {
  name?: string,
  email?: string,
  id?: string,
  image?: string,
}

function PinDetail() {
  const [similarPins, setSimilarPins] = useState(null)
  const [pinDetails, setPinDetails] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)

  const {data} = useSession()
  const user: User = data?.user



  const params = usePathname()
  const pinId = params.slice(12)

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user.id } }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };


  const fetchPinDetails = async() => {
    let query = pinDetailQuery(pinId)
    
    const pin = await client.fetch(query)
    setPinDetails(pin[0])

    if(pin[0]) {
      const pins = pinDetailMorePinQuery(pin[0])
      client.fetch((pins)).then((res) => {
        setSimilarPins(res)
      })
    }
  }

  const query = `*[_type == "pin" && _id == '${pinId}']`

  const getComments = async () => {
    const data = await client.fetch(query)
  }
  getComments()


  useEffect(() => {
    fetchPinDetails()
  }, [pinId])

  if(pinDetails === null || pinDetails === undefined) return <Spinner message={"Loading"}/>
  

  return (
    <>
    <div className='flex flex-col mt-12 mx-auto bg-white xl:flex-row max-w-[550px] xl:max-w-[1015px]' style={{borderRadius: "32px"}}>
      <div className='flex justify-center items-center md:items-start flex-initial shadow-lg'>
        <img src={pinDetails?.image.asset.url}
        className="rounded-t-3xl rounded-b-lg w-full h-full"
        alt="user-post"/>
      </div>
          <div className='w-full p-5 flex-1 xl:min-w-[620px]'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center'>
                  <a href={`${pinDetails?.image.asset.url}?dl=`} download
                        onClick={(e) => {e.stopPropagation();}}
                        className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none">
                      <MdDownloadForOffline />
                  </a>
              </div>
              <a href={`${pinDetails?.destination}`} target="_blank" rel="noreferrer">
                <div className='px-4 py-2 text-white bg-zinc-900 hover:opacity-60 rounded-full flex justify-center items-center gap-x-3'>
                  <FiArrowUpRight color='white'/>
                  <p>Watch source</p>
                </div>
              </a>
          </div>
          <div>
            <h1 className='text-4xl font-bold break-words mt-3'>
              {pinDetails?.title}
            </h1>
            <p className='mt-3'>{pinDetails?.about}</p>
          </div>
            <Link href={`/user-profile/${pinDetails?.postedBy?._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={pinDetails?.postedBy?.image}
                alt="user-profile"
              />
              <p className="font-semibold capitalize">{pinDetails?.postedBy?.userName}</p>
            </Link>
            <h2 className='mt-5 text-2xl'>Comments</h2>
            <div className='max-h-[370px] overflow-y-auto'>
              {pinDetails?.comments?.map((comment, i) => (
                <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={i}>
                  <img src={comment?.postedBy?.image} alt="user-profile" className='w-10 h-10 rounded-full cursor-pointer'/>
                  <div className='flex flex-col'>
                    <p className='font-bold'>{comment?.postedBy?.userName}</p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex flex-wrap mt-6 gap-3'>
              <Link href={`/user-profile/${pinDetails?.postedBy?._id}`} className="">
                <img
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={pinDetails?.postedBy?.image}
                  alt="user-profile"
                />
              </Link>
              <input type="text" className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300' placeholder='Add a comment' value={comment} onChange={(e) => setComment(e.target.value)}/>
              <button type='button' className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
                onClick={addComment}>
                {addingComment ? 'Posting comment' : 'Post'}
              </button>
            </div>
          </div>
      </div>
      {similarPins ? (
        <>
          <h2 className='text-center font-bold text-2xl mt-8 mb-4'>
            More like this
          </h2>
          <MasonryLayout pins={similarPins}/>
        </>
      ): <Spinner message={"Loading more pins..."}/>}
    </>
  )
}

export default PinDetail