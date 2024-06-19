"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

<<<<<<< HEAD
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
  };

=======
>>>>>>> eafc2d953f72d7c18068a158261c686db0ba429e
  return (
    <CardWrapper
      headerLabel="Login"
      backButtonHref="/auth/register"
      backButtonLabel="Back to Home"
      showSocial
    >
      <Form {...form}>
<<<<<<< HEAD
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
=======
        <form className="space-y-6" onSubmit={form.handleSubmit(console.log)}>
>>>>>>> eafc2d953f72d7c18068a158261c686db0ba429e
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
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
                    <Input {...field} placeholder="********" type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button variant="default" type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
