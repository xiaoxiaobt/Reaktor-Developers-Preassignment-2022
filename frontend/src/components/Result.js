import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'

const Result = () => {
  // const dispatch = useDispatch()
  const match = useMatch('/results/:id')
  const gameID = match.params.id

  return (<div>{gameID}</div>)
}

export default Result