import React, { useState } from 'react'

const Card = ({ props }) => {


  return (<div><p>Player A: {props.playerA?.name} played {props.playerA?.played}, Player B: {props.playerB?.name} played {props.playerB?.played}</p></div>)

}

export default Card