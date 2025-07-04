import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ConfigurationService from '../appwrite/Configuration'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

export default function Post(){
    const [post, setPost] = useState(null);
    const navigate = useNavigate()
    const {slug} = useParams()

    //(useParams() are used to get dynamic values from the url)

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userID === userData.$id : false

    useEffect(() => {
      if(slug){
        ConfigurationService.getPost(slug).then((post)=> {
            if(post){
                console.log("Post data:", post);
                console.log("Featured Image ID:", post.featuredImage);
                const previewUrl = ConfigurationService.getFilePreview(post.featuredImage);
                console.log("Image Preview URL:", previewUrl);
                setPost(post);
            }else{
                navigate('/')
            }
        })
      }else{
        navigate('/')
      }
    }, [slug, navigate]);

    const deletePost = () =>{
        ConfigurationService.deletePost(post.$id).then((status) => {
            if(status){
                ConfigurationService.deleteFile(post.featuredImage)
                navigate('/');

            }
        })
    }
    
    return post ? (
        <div className='py-8'>
            <Container>
                <div  className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img 
                    src={ConfigurationService.getFilePreview(post.featuredImage)} 
                    alt={post.Title} 
                    className='rounded-xl'
                    onError={(e) => {
                        console.error("Image failed to load:", e);
                        e.target.style.display = 'none';
                    }}
                    />

                    {isAuthor && (
                        <div className='absolute right-6 top-6'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor='bg-green-500'
                                className='mr-3'>
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor= 'bg-red-500'
                            onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className='w-full mb-6'>
                    <h1 className='text-2xl font-bold'>
                        {post.Title}
                    </h1>
                    <div className='browser-css'>
                        {typeof post.Content === 'string' ? parse(post.Content) : null}
                    </div>
                </div>
            </Container>
        </div>
    ) : null
}