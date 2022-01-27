import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'

const Users = () => {
  // const dispatch = useDispatch()
  const match = useMatch('/users/:name')
  const playerName = match.params.name

  return (<div>{playerName}</div>)
}

export default Users