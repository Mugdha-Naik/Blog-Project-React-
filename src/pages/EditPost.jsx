import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/container/PostForm'
import ConfigurationService from '../appwrite/Configuration'
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {
    const [posts, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            ConfigurationService.getPost(slug).then((post) => {
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }

    },[slug, navigate])
  return posts ? (
    <div className='py-8'>
        <Container>
            <PostForm post={posts}/>
        </Container>
    </div>
    
  ) : null
}

export default EditPost