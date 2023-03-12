'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MasonryLayout from '../../components/MasonryLayout/MasonryLayout'
import Search404 from '../../components/Search-404/Search-404'
import Spinner from '../../components/Spinner/Spinner'
import { searchQuery } from '../../utils/data'
import { client } from '../client'

function search() {
  const [error, setError] = useState(null)
  const [results, setResults] = useState(null)

  const paramsOne = useSearchParams();
  const search = paramsOne.get('q')

  const capitalizedTerm = search?.charAt(0).toUpperCase() + search?.slice(1)

  const fetchResults = async () => {
    try {
      const foundResults = await client.fetch(searchQuery(search))
      setResults(foundResults)
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  useEffect(() => {
    fetchResults()
  }, [search])


  if(!search) return <Search404/>
  if(results === null) return <Spinner message={`We are loading your results for: ${capitalizedTerm}`}/>
  if(results.length === 0) return (<div className='text-center mt-10 text-2xl'>No pins found!</div>)
  return (
    <MasonryLayout pins={results}/>
  )
}

export default search