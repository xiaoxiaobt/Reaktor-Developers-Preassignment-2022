import React, { useState } from 'react'
// import { handleLike, handleRemove } from '../reducers/resultReducer'
import { useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'

const Result = () => {
  const dispatch = useDispatch()
  // const [visible, setVisible] = useState(false)
  const match = useMatch('/results/:id')
  const gameID = match.params.id

  // const resultStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  // const label = visible ? 'hide' : 'view'

  return (<div></div>)
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

export default Result