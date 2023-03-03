'use client'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import MasonryLayout from '../../../components/MasonryLayout/MasonryLayout'
import Search404 from '../../../components/Search-404/Search-404'
import { searchQuery } from '../../../utils/data'
import { client } from '../../client'

function page() {
  const categoryName = usePathname().slice(10)
  const [pins, setPins] = useState(null)

  const fetchCategoryPins = async () => {
    const data = await client.fetch(searchQuery(categoryName))
    setPins(data)
  }

  useEffect(() => {
    fetchCategoryPins()
  }, [categoryName])
  

  if(!categoryName || pins?.length === 0) return <Search404 text="No pins were found"/>
  return (
    <>
      <MasonryLayout pins={pins} />
    </>
  )
}

export default page