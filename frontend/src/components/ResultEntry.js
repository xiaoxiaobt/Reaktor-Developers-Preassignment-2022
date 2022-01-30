import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { Link } from 'react-router-dom'
import helpers from '../utils/helpers'
import avatars from './Avatars'


const ResultEntry = ({ props }) => {
  const playerA = props.playerA
  const playerB = props.playerB
  const leftAvatar = props.type === 'GAME_BEGIN' ? avatars.PENDING : playerA.played === 'ROCK' ? avatars.ROCKLEFT : playerA.played === 'PAPER' ? avatars.PAPERLEFT : avatars.SCISSIORSLEFT
  const rightAvatar = props.type === 'GAME_BEGIN' ? avatars.PENDING : playerB.played === 'ROCK' ? avatars.ROCKRIGHT : playerB.played === 'PAPER' ? avatars.PAPERRIGHT : avatars.SCISSIORSRIGHT

  const playerAwins = helpers.isWinner(playerA, playerB)
  const playerBwins = helpers.isWinner(playerB, playerA)

  return (
    <li className='resultEntry'>
      <ListItem component={Link} to={`/results/${props.id}`} disablePadding>
        {leftAvatar}
        <div className="playerContainer">
          <Link to={`/user/${playerA.name}`} id="leftPlayerName">
            <ListItemText primary={playerA.name + (playerAwins ? '🏆' : '')} />
          </Link>
        </div>
        <ListItemText primary='V.S.' id="centervs" />
        <div className="playerContainer">
          <Link to={`/user/${playerB.name}`} id="rightPlayerName">
            <ListItemText primary={(playerBwins ? '🏆' : '') + playerB.name} />
          </Link>
        </div>
        {rightAvatar}
      </ListItem>
      <Divider component="li" />
    </li>
  )
}

export default ResultEntry