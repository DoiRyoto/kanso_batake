import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { cn } from '@/lib/utils'

const Review = (
	{ id, paperTitle, contents, reviewerName }: { id: string, paperTitle: string, contents: string, reviewerName: string }
) => {
	return (
			<Card>
				<CardHeader>
					<CardTitle className="tru">
						{paperTitle}
					</CardTitle>
					<CardDescription>
						Reviewer: {reviewerName}
					</CardDescription>
				</CardHeader>
				<CardContent className='break-words'>
						{contents}
				</CardContent>
			</Card>
	)
}

export default Review