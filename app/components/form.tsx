"use client";
import { useForm } from "react-hook-form";
import { createPost, updatePost } from "../actions/post";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Tables } from "@/types/database";
import { useToast } from "@/components/ui/use-toast";

const MAX_LENGTH = 50;
const formSchema = z.object({
  body: z
    .string()
    .min(1, "必須入力です。")
    .max(MAX_LENGTH, `最大${MAX_LENGTH}文字です。`),
});

const FormComponent = ({
  defaultValues,
}: {
  defaultValues?: Tables<"posts">;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      body: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.body);
    if (defaultValues) {
      return updatePost(defaultValues.id, values.body)
        .then(() => {
          router.refresh();
          toast({
            title: "更新成功！",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        })
        .catch(() => {
          toast({
            title: "更新失敗！",
            variant: "destructive",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        });
    } else {
      return createPost(values.body)
        .then(() => {
          router.refresh();
          toast({
            title: "作成成功！",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        })
        .catch(() => {
          toast({
            title: "作成失敗！",
            variant: "destructive",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>本文</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          type="submit"
        >
          送信
        </Button>
      </form>
    </Form>
  );
};

export default FormComponent;
