"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login";
import { useTransition } from "react";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(data).then((data: any) => {
        console.log("🚀 ~ login ~ data:", data);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Login"
      backButtonHref="/auth/register"
      backButtonLabel="Back to Home"
      showSocial
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isPending}
            variant="default"
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
