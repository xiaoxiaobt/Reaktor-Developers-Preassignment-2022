import React, { useState } from 'react'
// import { handleLike, handleRemove } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

const Result = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const match = useRouteMatch('/results/:id')
  const gameID = match.params.id

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'



  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author} <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={() => dispatch(handleLike(blog.id))}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {own && <button onClick={() => dispatch(handleRemove(blog.id))}>remove</button>}
        </div>
      )}
    </div>
  )
}

export default Result