"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import { z } from "zod";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";

const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ResetSchema>) => {
    startTransition(() => {
      reset(data).then((data: any) => {
        console.log("🚀 ~ file: reset-form.tsx:35 ~ reset ~ data:", data);
        setError(data?.error);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Reset Your Password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {error && (
            <FormMessage className="text-destructive" role="alert">
              {error}
            </FormMessage>
          )}

          <Button
            disabled={isPending}
            variant="default"
            type="submit"
            className="w-full"
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
