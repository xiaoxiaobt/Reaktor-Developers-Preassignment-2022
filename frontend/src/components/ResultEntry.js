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
    <div className='resultEntry'>
      <ListItem component={Link} to={`/results/${props.id}`}>
        {leftAvatar}
        <ListItemText primary={playerA.name + (playerAwins ? '🏆' : '')} className="left playerName" />
        <ListItemText primary="V.S." style={{ textAlign: 'center' }} />
        <ListItemText primary={(playerBwins ? '🏆' : '') + playerB.name} className="right playerName" />
        {rightAvatar}
      </ListItem>
      <Divider component="li" />
    </div >
  )
}

export default ResultEntry