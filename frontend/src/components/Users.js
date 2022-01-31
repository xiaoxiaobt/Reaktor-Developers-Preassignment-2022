import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import PlayerChip from './PlayerChip'

/**
 * `Users` list all users in alphabetical order
 * The user list is obtained from the database,
 * ideally it should also consider potential users
 * that are not yet registered in the database.
 */
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