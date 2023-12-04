import { fetchUser } from '@/actions/user.action'
import { ReviewForm } from '@/components/ReviewForm'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

const page = async() => {
  const user = await currentUser()
  if(!user) return null
  const userInfo = await fetchUser(user.id)

  return (
    <div className="mt-5">
      <ReviewForm userId={user.id} userName={userInfo.name}/>
    </div>
  )
}

export default page