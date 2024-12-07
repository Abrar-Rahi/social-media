import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const PhotosShow = ({ imageData, imageLoading }) => {

  const [showMore, setShowMore] = useState(false)

  const photoCount = () => {
    const total_count = imageData?.total_count || 0
    return total_count === 0 ? "Loading..." : `${total_count} Photos`
  }

  return (
    <div>
      <div>
        <div className='flex items-center justify-between'>
          <h1 className='font-gilroyBold text-black text-lg'>Photos</h1>
          {imageData?.resources?.length > 4 &&
            <button onClick={() => setShowMore((prev) => !prev)} className='px-3 py-1.5 bg-blue text-white font-gilroyMedium text-sm rounded-lg'>
              {showMore ? "Show Less" : "Show More"}
            </button>}
        </div>
        <span className='font-gilroyNormal text-black text-sm'>
          {photoCount()}
        </span>
      </div>
      {imageLoading ?
        <SkeletonTheme baseColor="#f0f2f5" highlightColor="#66717f">
          <p>
            <Skeleton height={50} count={6} />
          </p>
        </SkeletonTheme>

        :

        <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-4 mt-4 min-h-[300px]'>
          {imageData?.resources && imageData?.resources?.length && imageData?.resources?.slice(0, showMore ? imageData?.resources?.length : 4).map((img) => (
            <img key={img.asset_id} src={img.secure_url} alt="photos" className='w-ful h-full object-cover' />
          ))}
        </div>
      }
    </div>
  )
}

export default PhotosShow