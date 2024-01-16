"use client";

// 必要なライブラリやコンポーネントをインポート
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ReactMarkDown from 'react-markdown';
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { setReview } from "@/actions/review.action";
import { paperData, reviewType } from "@/constants";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import CancelCreateReview from "../CancelCreateReview";
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
}: {
  userId: string;
  userName: string;
}) {
  const isLoading = useRef(false);// ローディング状態を追跡するためのuseRef
  const [paper, setPaper] = useState<paperDetailsType & paperErrorType>()
  const [isPreview, setPreview] = useState(false);
  const bePreview = () => {
    setPreview(true);
  }
  const beEdit = () => {
    setPreview(false);
  }

  // useFormフックを使ってフォームを初期化
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),// zodResolverを使ってバリデーションを設定
    defaultValues: {
      // フォームフィールドのデフォルト値を設定
      ReviewContents: "",
      title: "",
      Tags: "",
    },
  });

  // フォーム送信時の処理を定義
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if(!paper || (paper && paper.error)){
      alert("不正なDOIです")
      return
    }

    isLoading.current = true;

    // 提出用のレビューデータを準備
    const reviewData: reviewType = {
      id: Date.now().toString(),// レビューIDを現在のタイムスタンプで生成
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
      await setReview(userId, reviewData);
    } catch (error) {
      console.log(error);
    }
  }

  const onChageHandler = useDebouncedCallback(async(e) => {
    const paperData = await fetchPaperByDOI(e.target.value)
    form.setValue("title", paperData.title)
    setPaper(paperData)
  }, 300)

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

        <Button
        type="button"
        onClick={beEdit}
        className={`
            ${!isPreview ? "bg-white border border-gray-300 hover:bg-white  text-gray-800" : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:border-gray-400 focus:ring focus:ring-gray-200"}
            px-4 py-2 rounded-none rounded-l-md text-[2px] w-fit
        `}>
        Edit
        </Button>
        <Button
        type="button"
        onClick={bePreview}
        className={`
            ${isPreview ? "bg-white border border-gray-300 hover:bg-white text-gray-800" : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:border-gray-400 focus:ring focus:ring-gray-200"}
            px-4 py-2 rounded-none rounded-r-md text-[2px] w-fit
        `}>
        Preview
        </Button>
        

        {!isPreview ? 
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        :
        <>
        <p className="text-sm font-medium">プレビュー</p>
        <Card>
        <CardContent className="markdown">
            <ReactMarkDown>{form.getValues("ReviewContents")}</ReactMarkDown>
        </CardContent>
        </Card>
        </>
        }
        

        <FormField
          control={form.control}
          name="Tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タグ(半角カンマ区切りで入力)</FormLabel>
              <FormControl>
                <Input placeholder="タグを入力してください。" {...field} />
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
            <Button type="submit">Submit</Button>
            <CancelCreateReview />
          </div>
        )}
      </form>
    </Form>
  );
}
