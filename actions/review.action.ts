"use server"

import { collection, getDocs, setDoc, doc, query, orderBy } from "firebase/firestore"
import db from "@/lib/firebase/store"
import { reviewType } from "@/constants"
import { revalidatePath, unstable_noStore } from "next/cache"
import { redirect } from "next/navigation"

export async function getAllReviews() {
    unstable_noStore();
    const col = query(collection(db, "reviews"), orderBy("id", "desc"))

    let result: reviewType[] = []
    const allReviewsSnapshot = await getDocs(col)
    allReviewsSnapshot.forEach((doc) => {
        result.push(doc.data() as reviewType)
    })

    return result
}

export async function setReview(reviewData: reviewType) {
    unstable_noStore();
    await setDoc(doc(db, `reviews/${reviewData.id}`), reviewData)

    revalidatePath('/create');
    redirect("/")
}