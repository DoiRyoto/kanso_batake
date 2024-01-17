"use client"

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const CancelEditReview = ({
    userId,
}: {
    userId: string;
}) => {
  const router = useRouter()

  const clickHandler = () => {
    router.push(`/user/${userId}`)
  }

  return (
    <Button onClick={clickHandler} variant="outline" type='button'>
        Cancel
    </Button>
  )
}

export default CancelEditReview