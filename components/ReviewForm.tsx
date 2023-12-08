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
  venue: z.string().min(0, {
    message: "venue must be at least 0 characters.",
  }),
  year: z.string().min(2, {
    message: "year must be at least 2 characters.",
  }),
  journal_name: z.string().min(0, {
    message: "journal name must be at least 0 characters.",
  }),
  journal_pages: z.string().min(0, {
    message: "journal pages must be at least 0 characters.",
  }),
  journal_vol: z.string().min(0, {
    message: "journal volume must be at least 0 characters.",
  }),
  authors: z.string().min(1, {
    message: "authors must be at least 1 characters.",
  }),
  doi: z.string().min(0, {
    message: "doi must be at least 0 characters.",
  }),
  link: z.string().min(0, {
    message: "link must be at least 0 characters.",
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
      ReviewContents: "",
      venue:"",
      year:"",
      journal_name:"",
      journal_pages:"",
      journal_vol:"",
      authors:"",
      doi:"",
      link:"",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    isLoading.current = true

    const reviewData: reviewType = {
      id: Date.now().toString(),
      contents: data.ReviewContents,
      paperTitle: data.PaperTitle,
      venue:data.venue,
      year:data.year,
      journal_name:data.journal_name,
      journal_pages:data.journal_pages,
      journal_vol:data.journal_vol,
      authors:data.authors,
      doi:data.doi,
      link:data.link,
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
          name="venue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>学術会議の名前</FormLabel>
              <FormControl>
                <Input placeholder="会議名を入力してください。" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
      <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>発表年</FormLabel>
              <FormControl>
                <Input placeholder="発表された年を入力してください。" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="journal_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>雑誌名</FormLabel>
              <FormControl>
                <Input placeholder="雑誌名を入力してください。" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="journal_pages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ページ</FormLabel>
              <FormControl>
                <Input placeholder="雑誌でのページを入力してください。" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="journal_vol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ページ</FormLabel>
              <FormControl>
                <Input placeholder="雑誌での巻数を入力してください。" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>著者名</FormLabel>
              <FormControl>
                <Input placeholder="著者名を入力してください。" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="doi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>DOI</FormLabel>
              <FormControl>
                <Input placeholder="DOIを入力してください。" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="URLを入力してください。" {...field} />
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