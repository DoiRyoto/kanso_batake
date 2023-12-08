import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import { Separator } from './ui/separator'
import { reviewType } from '@/constants'
import { SiDoi } from "react-icons/si";
import { IoIosPaper } from "react-icons/io";

const Review = (
	{ reviewData }: { reviewData: reviewType }
) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="truncate leading-normal">
					{reviewData.paperTitle}
				</CardTitle>
				<CardDescription>
					{reviewData.authors}
				</CardDescription>
				<CardDescription>
					{reviewData.journal_name}. {reviewData.year}. {reviewData.journal_vol}. {reviewData.journal_pages}
				</CardDescription>
					<div className="flex flex-row gap-2 py-3">
						<a href={`https://www.doi.org/${reviewData.doi}`} target='_blank'>
							<SiDoi size='2rem' />
						</a>
						<a href={`${reviewData.link}`} target='_blank'>
							<IoIosPaper size='2rem' />
						</a>
					</div>
				<Separator />
			</CardHeader>
			<CardContent>
				Reviewer: <Link href={`/user/${reviewData.createdBy}`}>{reviewData.reviewerName}</Link>
			</CardContent>
			<CardContent className='break-words whitespace-pre-line'>
				{reviewData.contents}
			</CardContent>
		</Card>
	)
}

export default Review