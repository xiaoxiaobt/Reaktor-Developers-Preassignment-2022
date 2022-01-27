import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <>
      <p>
        <Link to={'/'} style={{ padding: '10px' }}>Home</Link>
        <Link to={'/status'} style={{ padding: '10px' }}>Results</Link>
        <Link to={'/users'} style={{ padding: '10px' }}>Users</Link>
      </p>
    </>
  )
}

export default Navigation