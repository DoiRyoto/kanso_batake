import ReviewHeader from '@/components/ReviewerHeader'
import ReviewsByUser from '@/components/ReviewsByUser'
import React from 'react'

const page = async(
  { params: { userId }, searchParams } : { params : { userId: string }, searchParams?: { tag?: string }}
) => {
  return (
    <div className='flex flex-col gap-5'>
      <ReviewHeader userId={userId}/>
      <ReviewsByUser userId={userId} tag={searchParams?.tag} />
    </div>
  )
}

export default page