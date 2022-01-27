import React, { useState } from 'react'
// import { handleLike, handleRemove } from '../reducers/resultReducer'
import { useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = () => {
  const dispatch = useDispatch()
  // const [visible, setVisible] = useState(false)
  const match = useMatch('/users/:name')
  const playerName = match.params.name

  // const resultStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  // const label = visible ? 'hide' : 'view'

  return (<div>{playerName}</div>)
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

export default User