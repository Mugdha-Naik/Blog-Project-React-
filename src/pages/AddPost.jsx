import React from 'react'
import { Container, PostForm } from '../components/index'
import parse from 'html-react-parser';

function AddPost() {
  return (
    <div>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost