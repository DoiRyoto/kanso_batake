import { fetchReviewsByFilter } from "@/actions/review.action";
import { fetchUser } from "@/actions/user.action";
import { currentUser } from '@clerk/nextjs';
import React from "react";
import Review from "./Review";


const Reviews = async ({ tag } : { tag?: string }) => {
  const reviewsData = await fetchReviewsByFilter(tag)
  const _user = await currentUser();
  if (!_user) {
    return (
      <>
      {
          tag ? (
              <div className="flex gap-1 m-1 text-muted-foreground">
                  Searching in : <p>{tag}</p>
              </div>
          ) : null
      }
      <div className="flex flex-col gap-2">
        {reviewsData.map((review) => {
          return <Review key={review.id} reviewData={review}/>;
        })}
      </div>
      </>
    );
  }

  return (
    <>
    {
        tag ? (
            <div className="flex gap-1 m-1 text-muted-foreground">
                Searching in : <p>{tag}</p>
            </div>
        ) : null
    }
    <div className="flex flex-col gap-2">
      {reviewsData.map((review) => {
        return <Review key={review.id} reviewData={review}/>;
      })}
    </div>
    </>
  );
};

export default Reviews;
