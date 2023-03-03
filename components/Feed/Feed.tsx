import React, { useEffect, useState } from 'react'
import { client } from '../../app/client';
import { feedQuery } from '../../utils/data';
import MasonryLayout from '../MasonryLayout/MasonryLayout';

function Feed() {
  const [pins, setPins] = useState(null)

  useEffect(() => {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
        })
  }, [pins?.length])


  return (
    <div>
      <MasonryLayout pins={pins}/>
    </div>
    )
  
}

export default Feed