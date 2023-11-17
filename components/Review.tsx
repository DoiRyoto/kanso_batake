import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

const Review = (
	{ id, paperTitle, contents, reviewerName, userId }: { id: string, paperTitle: string, contents: string, reviewerName: string, userId: string }
) => {
	return (
			<Card>
				<CardHeader>
					<CardTitle className="truncate leading-normal">
						{paperTitle}
					</CardTitle>
					<CardDescription>
						<Link href={`/user/${userId}`}> Reviewer: {reviewerName}</Link>
					</CardDescription>
				</CardHeader>
				<CardContent className='break-words whitespace-pre-line'>
						{contents}
				</CardContent>
			</Card>
	)
}

export default Review