'use client'
import React, { useEffect, useState } from 'react'
import MasonryLayout from '../../components/MasonryLayout/MasonryLayout'
import Search404 from '../../components/Search-404/Search-404'
import Spinner from '../../components/Spinner/Spinner'
import { searchQuery } from '../../utils/data'
import { client } from '../client'

function search({params, searchParams}) {
  const [error, setError] = useState(null)
  const [results, setResults] = useState(null)
  const searchTerm = searchParams?.q

  const capitalizedTerm = searchTerm?.charAt(0).toUpperCase() + searchTerm?.slice(1)

  const fetchResults = async () => {
    try {
      const foundResults = await client.fetch(searchQuery(searchTerm))
      setResults(foundResults)
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  useEffect(() => {
    fetchResults()
  }, [searchTerm])

  console.log(searchParams.q)
  console.log(searchTerm)

  if(!searchParams.q || !searchTerm) return <Search404/>
  if(results === null) return <Spinner message={`We are loading your results for: ${capitalizedTerm}`}/>
  if(results.length === 0) return (<div className='text-center mt-10 text-2xl'>No pins found!</div>)
  return (
    <MasonryLayout pins={results}/>
  )
}

export default search