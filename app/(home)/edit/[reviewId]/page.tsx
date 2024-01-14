import { fetchUser } from '@/actions/user.action'
import { ReviewForm } from '@/components/EditReviewForm'
import { ReviewFormManual } from '@/components/EditReviewFormManual'
import { SwitchDemo } from '@/components/ReviewFormModeChangeSwitch'
import { currentUser } from '@clerk/nextjs'
import { fetchReview } from '@/actions/review.action'
import React from 'react'

const page = async(
    { params: { reviewId }, searchParams } : { params : { reviewId: string }, searchParams: { mode?: string } }
) => {
  const user = await currentUser()
  if(!user) return null
  const userInfo = await fetchUser(user.id)
  const review = await fetchReview(reviewId)

  return (
    <div className="mt-7 w-full">
      <SwitchDemo />
      { (searchParams.mode == "manual") ? 
      <ReviewFormManual userId={user.id} userName={userInfo.name} review={review}/>:
      <ReviewForm userId={user.id} userName={userInfo.name} review={review}/>}
    </div>
  )
}

export default page