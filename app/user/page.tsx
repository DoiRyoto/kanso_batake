import { ReviewForm } from '@/components/ReviewForm'
import React from 'react'
import {miuraData} from '@/constants/'

const page = () => {
  return (
    <div className="mt-5">
      <ul>
        <li>{miuraData.name}</li>
        {/* <li>{miuraData.affiliation}</li>   */}
        {/* <li>{miuraData.field}</li>   */}
        <li>{miuraData.role}</li>  
        {/* <li>{miuraData.reviews}</li>   */}
      </ul>
    </div>
  )
}

export default page