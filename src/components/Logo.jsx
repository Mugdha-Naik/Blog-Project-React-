import React from 'react'
import TreeLogo from '../photos/TreeLogo.png'

function Logo  ({width = '100px'}) {
  return (
    <div>
      <img src={TreeLogo} alt="logo" width={width} />
    </div>
  )
}

export default Logo