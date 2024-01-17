import { fetchReviewsByFilter } from "@/actions/review.action";
import React from "react";
import Review from "./Review";
import { currentUser } from "@clerk/nextjs";

const Reviews = async ({ tag }: { tag?: string }) => {
  const user = await currentUser();
  const reviewsData = await fetchReviewsByFilter(tag);
  const clamp = true

  return (
    <>
      {tag ? (
        <div className="flex gap-1 m-1 text-muted-foreground">
          Searching in : <p>{tag}</p>
        </div>
      ) : null}
      <div className="flex flex-col gap-2">
        {reviewsData.map((review) => {
          return <Review key={review.id} reviewData={review} userId={user?.id} clamp={clamp}/>;
        })}
      </div>
    </>
  );
};

export default Reviews;
