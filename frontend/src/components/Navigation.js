import React from 'react'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

const Navigation = () => {

  //   const dispatch = useDispatch()
  //   const handleLogout = () => {
  //     dispatch({ type: 'LOGOUT', data: user })
  //   }


  return (
    <>
      <p>
        <Link to={'/blogs'} style={{ padding: '10px' }}>blogs</Link>
        <Link to={'/users'} style={{ padding: '10px' }}>users</Link>

      </p>
    </>
  )
}

export default Navigation