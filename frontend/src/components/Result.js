import React, { useState } from 'react'
import { useMatch } from 'react-router-dom'

const Result = () => {
  const match = useMatch('/results/:id')
  const gameID = match.params.id

  return (<div>{gameID}</div>)
}

export default Result