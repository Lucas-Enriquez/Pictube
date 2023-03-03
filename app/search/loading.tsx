'use client'
import React from 'react'
import Spinner from '../../components/Spinner/Spinner'

function loading() {
  return (
    <Spinner message={"Looking results for you..."}/>
  )
}

export default loading