"use client"

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const CalcelCreateReview = () => {
  const router = useRouter()

  const clickHandler = () => {
    router.push("/")
  }

  return (
    <Button onClick={clickHandler} variant="outline" type='button'>
        Cancel
    </Button>
  )
}

export default CalcelCreateReview