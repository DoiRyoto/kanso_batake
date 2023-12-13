"use server"

import { collection, getDocs, setDoc, doc, query, orderBy, where } from "firebase/firestore"
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

export async function setReview(userId: string, reviewData: reviewType) {
    unstable_noStore();
    await Promise.all([setDoc(doc(db, `reviews/${reviewData.id}`), reviewData), setDoc(doc(db, `users/${userId}/reviews/${reviewData.id}`), reviewData)])
    
    revalidatePath('/create');
    redirect("/")
}

export async function fetchReviewsByUser(userId: string) {
    unstable_noStore();

    const col = query(collection(db, `users/${userId}/reviews`), orderBy("id", "desc"))

    let result: reviewType[] = []

    try {
        const allReviewsSnapshot = await getDocs(col)
        allReviewsSnapshot.forEach((doc) => {
            result.push(doc.data() as reviewType)
        })

        return result
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch reviews.")
    }
}

export async function fetchReviewsByTag(searchTag: string) {
    unstable_noStore();
    const col = query(collection(db, "reviews"), where("tags", "array-contains", searchTag));
    let result: reviewType[] = []
    try {
        const allReviewsSnapshot = await getDocs(col)
        allReviewsSnapshot.forEach((doc) => {
            result.push(doc.data() as reviewType)
        })

        return result
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch reviews.")
    }
}