import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {

  return (
    <div className='sticky-nav'>
      <a href="/#top" className='navitem'><b>Reaktor preassignment</b></a>
      <Link to='/' className='navitem'>Home</Link>
      <Link to='/users' className='navitem'>Users</Link>
    </div>
  )
}

export default Navigation