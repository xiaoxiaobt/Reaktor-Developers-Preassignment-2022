import React from 'react'
import { Link } from 'react-router-dom'
import { Chip } from '@mui/material'

/**
 * Display player in a `Chip` (rounded button)
 * @param {object} props - props
 * @param {string} props.name - name of the player
 */
const PlayerChip = ({ name }) => {
  return <Chip label={name} variant="outlined"
    component={Link} to={`/users/${name}`}
  />
}

export default PlayerChip