import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ props }) => {
  if (props.type === 'GAME_BEGIN') {
    return (
      <div>
        <p>Player A:
          <Link to={`/users/${props.playerA.name}`} style={{ padding: '10px' }}>{props.playerA.name}</Link>,
          Player B:
          <Link to={`/users/${props.playerB.name}`} style={{ padding: '10px' }}>{props.playerB.name}</Link>
        </p>
      </div>
    )
  }
  return (
    <div>
      <p>Player A:
        <Link to={`/users/${props.playerA.name}`} style={{ padding: '10px' }}>{props.playerA.name}</Link>
        played {props.playerA.played},
        Player B:
        <Link to={`/users/${props.playerB.name}`} style={{ padding: '10px' }}>{props.playerB.name}</Link>
        played {props.playerB.played}
      </p>
    </div>
  )

}
export default Card