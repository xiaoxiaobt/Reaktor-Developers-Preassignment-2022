import React, { useState } from 'react'
import { useMatch } from 'react-router-dom'

const User = () => {
  const match = useMatch('/users/:name')
  const playerName = match.params.name

  return (<h1>{playerName}</h1>)
}

export default User