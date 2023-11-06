import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

const Review = (
	{ id, paperTitle, contents, reviewerName }: { id: string, paperTitle: string, contents: string, reviewerName: string }
) => {
	return (
			<Card>
				<CardHeader>
					<CardTitle className="truncate leading-normal">
						{paperTitle}
					</CardTitle>
					<CardDescription>
						Reviewer: {reviewerName}
					</CardDescription>
				</CardHeader>
				<CardContent className='break-words whitespace-pre-line'>
						{contents}
				</CardContent>
			</Card>
	)
}

export default Review