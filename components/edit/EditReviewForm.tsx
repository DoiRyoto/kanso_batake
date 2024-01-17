"use client";

// 必要なライブラリやコンポーネントをインポート
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { setReview, updateReview } from "@/actions/review.action";
import { paperData, reviewType } from "@/constants";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import CancelEditReview from "../CancelEditReview";
import { fetchPaperByDOI, paperDetailsType, paperErrorType } from "@/actions/paper.action";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";

import { delEmpty_tag } from "@/lib/utils";

// フォームのバリデーションスキーマを定義
const FormSchema = z.object({
  // 各フィールドにバリデーションルールを設定
  title: z.string().min(1, {
    message: "Title Required",// Titleは必須
  }),
  ReviewContents: z.string().min(2, {
    message: "ReviewContents must be at least 2 characters.",// レビュー内容は最低2文字必要
  }),
  // Tagsフィールドのバリデーションルール（特に制限なし）
  Tags: z.string(),
});

// ReviewFormコンポーネントを定義
export function ReviewForm({
  userId,
  userName,
  review,
}: {
  userId: string;
  userName: string;
  review: reviewType;
}) {
  const authors: Array<{ name: string; }> = [{ name: review.authors }]

  const isLoading = useRef(false);// ローディング状態を追跡するためのuseRef
  const [paper, setPaper] = useState<paperDetailsType & paperErrorType>({
    title: review.paperTitle,
    year: review.year,
    externalIds: {
      DOI: review.doi,
    },
    url: review.link,
    journal: {
      name: review.journal_name,
      pages: review.journal_pages,
      volume: review.journal_vol,
    },
    authors: authors,
    venue: review.venue,
    error: "",
  }
  )

  // useFormフックを使ってフォームを初期化
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),// zodResolverを使ってバリデーションを設定
    defaultValues: {
      // フォームフィールドのデフォルト値を設定
      ReviewContents: review.contents ? review.contents : "",
      title: review.paperTitle ? review.paperTitle : "",
      Tags: review.tags ? review.tags.toString() : "",
    },
  });

  // フォーム送信時の処理を定義
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if(!paper || (paper && paper.error)){
      alert("DOIが見つかりません\n手動入力に切り替えてください")
      return
    }

    isLoading.current = true;

    // 提出用のレビューデータを準備
    const reviewData: reviewType = {
      id: review.id,
      contents: data.ReviewContents,
      paperTitle: paper.title,
      venue: paper.venue,
      year: paper.year,
      journal_name: paper.journal.name,
      journal_pages: paper.journal.pages,
      journal_vol: paper.journal.volume,
      authors: paper.authors[0].name,
      doi: paper.externalIds.DOI,
      link: paper.url,
      reviewerName: userName,
      createdBy: userId,
      tags: delEmpty_tag(data.Tags),
    };

    try {
      // レビューデータの送信を試みる
      await updateReview(userId, reviewData);
    } catch (error) {
      console.log(error);
    }
  }

  const onChageHandler = useDebouncedCallback(async(e) => {
    const paperData = await fetchPaperByDOI(e.target.value)
    form.setValue("title", paperData.title)
    setPaper(paperData)
  }, 300)
  const onChangeContentsHandler = async(e: { target: { value: string; }; }) => {
    form.setValue("ReviewContents", e.target.value)
  }
  const onChangeTagsHandler = async(e: { target: { value: string; }; }) => {
    form.setValue("Tags", e.target.value)
  }
  
  // フォームのレンダリングを行う
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
      <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-row gap-1">
                タイトル<p className="text-red-600">*</p></FormLabel>
              <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {form.getValues("title") ? form.getValues("title") : "Search paper by DOI..."}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[50vw] p-0">
                  <Command>
                    <CommandInput placeholder="Search paper by DOI..." onChangeCapture={onChageHandler}/>
                  </Command>
                </PopoverContent>
              </Popover>
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
              <FormLabel className="flex flex-row gap-1">レビュー<p className="text-red-600">*</p></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="論文のレビューを入力してください。"
                  id="message"
                  rows={10}
                  {...field}
                  onChange={onChangeContentsHandler}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タグ(半角カンマ区切りで入力)</FormLabel>
              <FormControl>
                <Input placeholder="タグを入力してください。"
                  {...field}
                  onChange={onChangeTagsHandler}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoading.current ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <div className="flex flex-row gap-3">
            <Button type="submit">Save</Button>
            <CancelEditReview  userId={userId}/>
          </div>
        )}
      </form>
    </Form>
  );
}
