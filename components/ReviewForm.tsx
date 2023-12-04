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
import { useRef } from "react"
import { Loader2 } from "lucide-react"
import CalcelCreateReview from "./CancelCreateReview"

const FormSchema = z.object({
  PaperTitle: z.string().min(2, {
    message: "PaperTitle must be at least 2 characters.",
  }),
  ReviewContents: z.string().min(2, {
    message: "ReviewContents must be at least 2 characters.",
  }),
})

export function ReviewForm({ userId, userName} : { userId: string , userName: string}) {
  const isLoading = useRef(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      PaperTitle: "",
      ReviewContents: ""
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    isLoading.current = true

    const reviewData: reviewType = {
      id: Date.now().toString(),
      contents: data.ReviewContents,
      paperTitle: data.PaperTitle,
      reviewerName: userName,
      createdBy: userId
    }

    try {
      await setReview(userId, reviewData)
    } catch (error) {
      console.log(error)
    }
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
              <div className="flex flex-row gap-3">
                <Button type="submit" >Submit</Button>
                <CalcelCreateReview />
              </div>
            )
        }
      </form>
    </Form>
  )
}