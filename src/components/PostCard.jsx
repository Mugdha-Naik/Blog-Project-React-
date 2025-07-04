import React from 'react'
import ConfigurationService from '../appwrite/Configuration'
import { Link } from 'react-router-dom'


function PostCard({$id, Title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <div >
                    <img src={ConfigurationService.getFilePreview(featuredImage)} alt={Title}
                    className='rounded-xl' />
                </div>
                <h2 className='text-bold text-xl'>{Title}</h2>
            </div>
        </div>
    </Link>
  )
}

export default PostCard