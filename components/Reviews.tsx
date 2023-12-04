import { getAllReviews } from '@/actions/review.action'
import React from 'react'
import Review from './Review'

const Reviews = async () => {
	const reviewsData = await getAllReviews()
	
  return (
    <div className="flex flex-col gap-2">
			{
				reviewsData.map((review) => {
					return (
						<Review key={review.id} id={review.id} paperTitle={review.paperTitle} contents={review.contents} reviewerName={review.reviewerName} userId={review.createdBy}/>
					)
				})
			}
		</div>
  )
}

export default Reviews