import React from 'react'
import { BlurImage } from '../components/blurImage'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const imageSchema = z.object({
  id: z.string().min(1),
  href: z.string().min(1),
  imageSrc: z.string().min(1),
  name: z.string().min(1),
  username: z.string().min(1)
})

export type Image = {
  id: number
  href: string
  imageSrc: string
  name: string
  username: string
}

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )

  const { data } = await supabaseAdmin.from('images').select('*').order('id')
  return {
    props: {
      images: data
    }
  }
}

const Gallery = ({ images }: { images: Image[] }) => {
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

export default Gallery
