import Reviews from "@/components/Reviews"
import { Suspense } from "react"
import ReviewPostButton from "@/components/top/CreateReview"
import Search from "@/components/TagSearchBar"

export default async function Home({
    searchParams,
  }: {
    searchParams?: {
      tag?: string
    };}
) {
  return (
    <div className="flex flex-col gap-10 mt-2">
      <div className="flex flex-row gap-20">
        <Search placeholder="タグを入力"/>
        <ReviewPostButton />
      </div>
      <Suspense>
        <Reviews tag={searchParams?.tag}/>
      </Suspense>
    </div>
  )
}
