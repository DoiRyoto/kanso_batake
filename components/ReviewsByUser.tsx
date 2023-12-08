import { fetchReviewsByUser } from '@/actions/review.action'
import React from 'react'
import Review from './Review'

const ReviewsByUser = async ({ userId } : { userId: string }) => {
	const reviewsData = await fetchReviewsByUser(userId)
	
	if(reviewsData.length == 0){
		return <div>No Reviews.</div>
	}
	
  return (
    <div className="flex flex-col gap-2">
			{
				reviewsData.map((review) => {
					return (
						<Review key={review.id} reviewData={review} />
					)
				})
			}
		</div>
  )
}

export default ReviewsByUser