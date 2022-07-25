import React, { useState } from 'react'
import Image from 'next/image'
import { Image as TImage } from '../pages'

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  image: TImage
}

export const BlurImage = ({ image }: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  console.log(image)

  return (
    <a href="#" className="group">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={image.imageurl}
          layout="fill"
          objectFit="cover"
          objectPosition={'center'}
          alt=""
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
          )}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{image.username}</p>
    </a>
  )
}
