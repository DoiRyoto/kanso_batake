import { fetchUser } from '@/actions/user.action'
import { ReviewForm } from '@/components/create/ReviewForm'
import { ReviewFormManual } from '@/components/create/ReviewFormManual'
import { SwitchDemo } from '@/components/ReviewFormModeChangeSwitch'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

const page = async(
  { searchParams } : {
    searchParams: { mode?: string }
  }
) => {
  const user = await currentUser()
  if(!user) return null
  const userInfo = await fetchUser(user.id)

  return (
    <div className="mt-7 w-full">
      <SwitchDemo defaultChecked={searchParams.mode !== "manual"} />
      { (searchParams.mode == "manual") ? <ReviewFormManual userId={user.id} userName={userInfo.name} /> : <ReviewForm userId={user.id} userName={userInfo.name}/>}
    </div>
  )
}

export default page