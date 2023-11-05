import Reviews from "@/components/Reviews"
import { Suspense } from "react"
import Loading from "./loading"
import ReviewPostButton from "@/components/CreateReview"

export default async function Home() {
  return (
    <div className="flex flex-col gap-10 mt-2">
      <ReviewPostButton />
      <Suspense fallback={<Loading />}>
        <Reviews />
      </Suspense>
    </div>
  )
}
