import React from 'react'

function Button({
    children,
    type='button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props

    //these props will contains all the extra properties that the user may define
    //other than the ones that we included, so we can spread props and use them 
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button