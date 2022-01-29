import React from 'react'
import Avatar from '@mui/material/Avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar'

const ROCKLEFT = <ListItemAvatar><Avatar alt="Rock" src="avatars/r-left.png" /></ListItemAvatar>
const PAPERLEFT = <ListItemAvatar><Avatar alt="Paper" src="avatars/p-left.png" /></ListItemAvatar>
const SCISSIORSLEFT = <ListItemAvatar><Avatar alt="Scissors" src="avatars/s-left.png" /></ListItemAvatar>
const ROCKRIGHT = <ListItemAvatar><Avatar alt="Rock" src="avatars/r-right.png" /></ListItemAvatar>
const PAPERRIGHT = <ListItemAvatar><Avatar alt="Paper" src="avatars/p-right.png" /></ListItemAvatar>
const SCISSIORSRIGHT = <ListItemAvatar><Avatar alt="Scissors" src="avatars/s-right.png" /></ListItemAvatar>
const PENDING = <ListItemAvatar><Avatar alt="Pending" src="avatars/pending.png" /></ListItemAvatar>

export default { ROCKLEFT, PAPERLEFT, SCISSIORSLEFT, ROCKRIGHT, PAPERRIGHT, SCISSIORSRIGHT, PENDING }