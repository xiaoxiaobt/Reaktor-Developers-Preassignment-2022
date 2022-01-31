import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import PlayerChip from './PlayerChip'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAllUsers().then(allUsers => {
      const a = allUsers
        .reduce((r, a) => {
          r[a[0]] = r[a[0]] || []
          r[a[0]].push(a)
          return r
        }, Object.create(null))

      setUsers(Object.entries(a))
    })
  }, [])

  return (
    <>
      <h1>Players</h1>
      {users.map(([leadingAlphabet, arrayOfPlayers]) =>
        <div key={leadingAlphabet} name={leadingAlphabet}>
          <h2>{leadingAlphabet}</h2>
          {
            arrayOfPlayers.map(name =>
              <PlayerChip key={name} name={name} />
            )
          }
        </div>
      )
      }
    </>
  )
}

export default Users