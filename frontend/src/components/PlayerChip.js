import React from 'react'
import { Link } from 'react-router-dom'
import { Chip } from '@mui/material'

const PlayerChip = ({ name }) => {
  return <Chip label={name} variant="outlined"
    component={Link} to={`/users/${name}`}
  />
}

export default PlayerChip