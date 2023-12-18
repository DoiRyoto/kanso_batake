import { fetchReviewsByFilter } from "@/actions/review.action";
import React from "react";
import Review from "./Review";

const Reviews = async ({ tag } : { tag?: string }) => {
  const reviewsData = await fetchReviewsByFilter(tag)

  return (
    <div className="flex flex-col gap-2">
      {reviewsData.map((review) => {
        return <Review key={review.id} reviewData={review} />;
      })}
    </div>
  );
};

export default Reviews;
