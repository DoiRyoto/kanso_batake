import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const CreateReview = () => {
  const router = useRouter()

  const clickHandler = () => {
    router.push("/create")
  }

  return (
    <Button onClick={clickHandler}>
        Create New Review
    </Button>
  )
}

export default CreateReview