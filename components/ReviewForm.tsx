"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { setReview } from "@/actions/review.action"
import { reviewType } from "@/constants"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const FormSchema = z.object({
  PaperTitle: z.string().min(2, {
    message: "PaperTitle must be at least 2 characters.",
  }),
  ReviewerName: z.string().min(2, {
    message: "ReviewerName must be at least 2 characters.",
  }),
  ReviewContents: z.string().min(2, {
    message: "ReviewContents must be at least 2 characters.",
  }),
})

export function ReviewForm() {
  const isLoading = useRef(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      PaperTitle: "",
      ReviewerName: "",
      ReviewContents: ""
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    isLoading.current = true

    const reviewData: reviewType = {
      id: Date.now().toString(),
      contents: data.ReviewContents,
      paperTitle: data.PaperTitle,
      reviewerName: data.ReviewerName
    }

    try {
      await setReview(reviewData)
    } catch (error) {
      console.log(error)
    }

    router.push("/")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="PaperTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>論文名</FormLabel>
              <FormControl>
                <Input placeholder="論文のタイトルを入力してください。" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ReviewerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>投稿者(あなたの名前)</FormLabel>
              <FormControl>
                <Input placeholder="投稿者の名前を入力してください。" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ReviewContents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>レビュー</FormLabel>
              <FormControl>
              <Textarea placeholder="論文のレビューを入力してください。" id="message" rows={10} {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          isLoading.current ? 
            (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
            ) : (
              <Button type="submit" >Submit</Button>
            )
        }
      </form>
    </Form>
  )
}