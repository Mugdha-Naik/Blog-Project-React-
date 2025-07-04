import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import ConfigurationService from '../appwrite/Configuration'

function AllPost() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        ConfigurationService.listPost().then((result) => {
            if (result && result.documents) {
                setPosts(result.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost