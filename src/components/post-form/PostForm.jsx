import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import {Button, Select, Input, RTE} from '../index'

import ConfigurationService from '../../appwrite/Configuration'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',

        },
    })

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
      try {
        console.log("Form submitted with data:", data);
        if(post){
          const file = data.image[0] ? await ConfigurationService.uploadFile(data.image[0]) : null
          console.log("File upload result (edit):", file);

          if(file){
            console.log("Deleting old featured image:", post.featuredImage);
            await ConfigurationService.deleteFile(post.featuredImage)
          }

          console.log("Updating post with data:", { ...data, featuredImage: file ? file.$id : undefined });
          const dbPost = await ConfigurationService.updatePost(post.$id, {
            ...data,
            featuredImage: file? file.$id : undefined,
          })
          console.log("Update post result:", dbPost);

          if(dbPost){
            navigate(`/post/${dbPost.$id}`)
          }
        }else{
          console.log("Uploading new file:", data.image[0]);
          const file = await ConfigurationService.uploadFile(data.image[0]);
          console.log("File upload result (new):", file);

          if(file){
            const fileID = file.$id
            console.log("Creating new post with data:", { ...data, userID: userData?.$id });
            const dbPost = await ConfigurationService.createPost({
              Title: data.title,
              slug: data.slug,
              Content: data.content,
              Status: data.status,
              featuredImage: fileID,
              userID: userData?.$id,
            })
            console.log("Create post result:", dbPost);
            if(dbPost){
              navigate(`/post/${dbPost.$id}`)
            }
          } else {
            console.error("File upload failed, cannot create post.");
          }
        }
      } catch (error) {
        console.error("Error in submit:", error);
        // Optionally, set an error state and display it in the UI
      }
    }

    const slugTransform = useCallback((value) => {
      if(value && typeof value === 'string'){
        return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-");
        
      }
      return ''
    }, [])

    React.useEffect(() => {
      const subscription = watch((value, { name }) => {
          if (name === "title") {
              setValue("slug", slugTransform(value.title), { shouldValidate: true });
          }
      });
      return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    


return (
  <form onSubmit={handleSubmit(submit)}
  className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
          <Input
              label="Title: "
              placeholder="Title"
              className='mb-4'
              {...register("title", 
              {required: true})}
          />

          <Input
              label='Slug: '
              placeholder='Slug'
              className='mb-4'
              {...register('slug',
              {required: true})}
              onInput={(e) => {
                setValue('slug', slugTransform(e.currentTarget.value), 
                {shouldValidate: true});
              }}
          />
          <RTE 
          label='Content: '
          name='content'
          control={control}
          defaultValue={getValues('content')}/>

      </div>

      <div className='w-1/3 px-2'>
        <Input
          label='Featured Image: '
          type='file'
          className='mb-4'
          accept='image/png, image/jpg, image/jpeg, image/gif'
          {...register('image', {required: !post})}
        />

        {post && (
            <div className='w-full mb-4'>
                <img 
                src={ConfigurationService.getFilePreview(post.featuredImage)} 
                alt= {post.title}
                className='rounded-lg'
              />
            </div>
        )}
        <Select
            options={['active', 'inactive']}
            label='Status'
            className='mb-4'
            {...register('status',{
              required: true
            })}
        />

        <Button type="submit">Submit</Button>
      </div>
  </form>
)
}

export default PostForm

//useForm also gives us watching capability, 
//if we want to continously monitor any field

//1. user may come to this form for giving new value
//2. or to edit existing value
//if the user has come to edit we have to give him default values