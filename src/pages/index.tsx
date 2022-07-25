import React from 'react'
import { firestore } from '../../firebase/clientApp'
import { InferGetServerSidePropsType, NextPage } from 'next'
import { BlurImage } from '../components/blurImage'
import { z } from 'zod'

import { collection, getDocs } from '@firebase/firestore'

const imageSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  username: z.string().min(1),
  imageurl: z.string().min(1)
})

const imagesSchema = z.array(imageSchema)

export type Image = z.infer<typeof imageSchema>
export type Images = z.infer<typeof imagesSchema>

export const getServerSideProps = async () => {
  const images: any = []
  const imageCollection = collection(firestore, 'images')
  const querySnapshot = await getDocs(imageCollection)

  querySnapshot.forEach((doc) => {
    const image = { ...doc.data(), id: doc.id }
    images.push(image)
  })

  try {
    const validatedImages = imagesSchema.parse(images)

    return {
      props: {
        images: validatedImages
      }
    }
  } catch (error) {
    console.error(error)

    return {
      props: {
        images: []
      }
    }
  }
}

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ images }) => {
  console.log(images)

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
        {images.length > 0 ? (
          images.map((image) => <BlurImage key={image.id} image={image} />)
        ) : (
          <span>No images</span>
        )}
      </div>
    </div>
  )
}

export default Home
