import React, { useState } from 'react'


const Card = ({ props }) => {

  // const resultStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  // const label = visible ? 'hide' : 'view'
  console.log(props)
  return (<div><p>Player A: {props.playerA?.name} played {props.playerA?.played}, Player B: {props.playerB?.name} played {props.playerB?.played}</p></div>)
  // return (
  //   <div style={resultStyle} className='result'>
  //     <div>
  //       <i>{result.title}</i> by {result.author} <button onClick={() => setVisible(!visible)}>{label}</button>
  //     </div>
  //     {visible && (
  //       <div>
  //         <div>{result.url}</div>
  //         <div>likes {result.likes}
  //           <button onClick={() => dispatch(handleLike(result.id))}>like</button>
  //         </div>
  //         <div>{result.user.name}</div>
  //         {own && <button onClick={() => dispatch(handleRemove(result.id))}>remove</button>}
  //       </div>
  //     )}
  //   </div>
  // )
}

export default Card