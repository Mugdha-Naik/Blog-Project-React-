import React from 'react'

function Logo  ({width = '100px'}) {
  return (
    <div>
      <img src="/TreeLogo.png" alt="logo" width={width} />
    </div>
  )
}

export default Logo