import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'

const ROCKLEFT = <Avatar alt="Rock" src="avatars/r-left.png" />
const PAPERLEFT = <Avatar alt="Paper" src="avatars/p-left.png" />
const SCISSIORSLEFT = <Avatar alt="Scissors" src="avatars/s-left.png" />
const ROCKRIGHT = <Avatar alt="Rock" src="avatars/r-right.png" />
const PAPERRIGHT = <Avatar alt="Paper" src="avatars/p-right.png" />
const SCISSIORSRIGHT = <Avatar alt="Scissors" src="avatars/s-right.png" />
const PENDING = <Avatar alt="Pending" src="avatars/pending.png" />


const ResultEntry = ({ props }) => {
  const leftAvatar = props.type === 'GAME_BEGIN' ? PENDING : props.playerA.played === 'ROCK' ? ROCKLEFT : props.playerA.played === 'PAPER' ? PAPERLEFT : SCISSIORSLEFT
  const rightAvatar = props.type === 'GAME_BEGIN' ? PENDING : props.playerB.played === 'ROCK' ? ROCKRIGHT : props.playerB.played === 'PAPER' ? PAPERRIGHT : SCISSIORSRIGHT

  const playerAwins = props.playerA.played === 'ROCK' && props.playerB.played === 'SCISSORS' ||
    props.playerA.played === 'PAPER' && props.playerB.played === 'ROCK' ||
    props.playerA.played === 'SCISSORS' && props.playerB.played === 'PAPER'
  const playerBwins = props.playerB.played === 'ROCK' && props.playerA.played === 'SCISSORS' ||
    props.playerB.played === 'PAPER' && props.playerA.played === 'ROCK' ||
    props.playerB.played === 'SCISSORS' && props.playerA.played === 'PAPER'

  return (
    <div className='resultEntry'>
      <a href={`/results/${props.id}`}>
        <ListItem>
          <ListItemAvatar>{leftAvatar}</ListItemAvatar>
          <ListItemText primary={props.playerA.name + (playerAwins ? '🏆' : '')} className="left playerName" />
          <ListItemText primary="V.S." style={{ textAlign: 'center' }} />
          <ListItemText primary={(playerBwins ? '🏆' : '') + props.playerB.name} className="right playerName" />
          <ListItemAvatar>{rightAvatar}</ListItemAvatar>
        </ListItem>
      </a>
      <Divider component="li" />
    </div >
  )
}

export default ResultEntry