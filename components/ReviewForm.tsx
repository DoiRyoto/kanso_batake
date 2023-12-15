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
import { Textarea } from "./ui/textarea";
import { setReview } from "@/actions/review.action";
import { reviewType } from "@/constants";
import { useRef } from "react";
import { Loader2 } from "lucide-react";
import CalcelCreateReview from "./CancelCreateReview";

// フォームのバリデーションスキーマを定義
const FormSchema = z.object({
  // 各フィールドにバリデーションルールを設定
  PaperTitle: z.string().min(2, {
    message: "PaperTitle must be at least 2 characters.",// 論文タイトルは最低2文字必要

  }),
  venue: z.string().min(0, {
    message: "venue must be at least 0 characters.",// 会場名は最低0文字（空でも可）
  }),
  year: z.string().min(2, {
    message: "year must be at least 2 characters.",// 発表年は最低2文字必要
  }),
  journal_name: z.string().min(0, {
    message: "journal name must be at least 0 characters.",// 雑誌名は最低0文字（空でも可）
  }),
  journal_pages: z.string().min(0, {
    message: "journal pages must be at least 0 characters.", // 雑誌のページ数は最低0文字（空でも可）
  }),
  journal_vol: z.string().min(0, {
    message: "journal volume must be at least 0 characters.",// 雑誌の巻数は最低0文字（空でも可）
  }),
  authors: z.string().min(1, {
    message: "authors must be at least 1 characters.",// 著者名は最低1文字必要
  }),
  doi: z.string().min(0, {
    message: "doi must be at least 0 characters.",// DOIは最低0文字（空でも可）
  }),
  link: z.string().min(0, {
    message: "link must be at least 0 characters.",// リンクは最低0文字（空でも可）
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

  // useFormフックを使ってフォームを初期化
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),// zodResolverを使ってバリデーションを設定
    defaultValues: {
      // フォームフィールドのデフォルト値を設定
      PaperTitle: "",
      ReviewContents: "",
      venue: "",
      year: "",
      journal_name: "",
      journal_pages: "",
      journal_vol: "",
      authors: "",
      doi: "",
      link: "",
      Tags: "",
    },
  });

  // フォーム送信時の処理を定義
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    isLoading.current = true;

    // 提出用のレビューデータを準備
    const reviewData: reviewType = {
      id: Date.now().toString(),// レビューIDを現在のタイムスタンプで生成
      contents: data.ReviewContents,
      paperTitle: data.PaperTitle,
      venue: data.venue,
      year: data.year,
      journal_name: data.journal_name,
      journal_pages: data.journal_pages,
      journal_vol: data.journal_vol,
      authors: data.authors,
      doi: data.doi,
      link: data.link,
      reviewerName: userName,
      createdBy: userId,
      tags: data.Tags.split(","),
    };

    try {
      // レビューデータの送信を試みる
      await setReview(userId, reviewData);
    } catch (error) {
      console.log(error);
    }
  }

  // フォームのレンダリングを行う
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="PaperTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-row gap-1">
                論文名
                <p className="text-red-600">*</p></FormLabel>
              <FormControl>
                <Input
                  placeholder="論文のタイトルを入力してください。"
                  {...field}
                />
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
              <FormLabel className="flex flex-row gap-1">
                著者名<p className="text-red-600">*</p></FormLabel>
              <FormControl>
                <Input placeholder="著者名を入力してください。" {...field} />
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
              <FormLabel className="flex flex-row gap-1">発表年<p className="text-red-600">*</p></FormLabel>
              <FormControl>
                <Input
                  placeholder="発表された年を入力してください。"
                  {...field}
                />
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
                />
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
                <Input
                  placeholder="雑誌でのページを入力してください。"
                  {...field}
                />
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
              <FormLabel>巻数</FormLabel>
              <FormControl>
                <Input
                  placeholder="雑誌での巻数を入力してください。"
                  {...field}
                />
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
            <CalcelCreateReview />
          </div>
        )}
      </form>
    </Form>
  );
}
