import React from 'react'
import * as Spinners from 'react-loader-spinner'

const Loading = () => {
  const Spinner = Spinners['BallTriangle']
  return (
    <div>
      <Spinner
        height="150px"
        width="150px"
        wrapperStyle={{
          justifyContent: 'center',
        }}
      />
    </div>
  )
}

export default Loading
