"use client";
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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserApis from "@/services/users-api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  first_name: z.string().min(1, { message: "Please enter your first name" }),
  last_name: z.string().min(1, { message: "Please enter your last name" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must contain 8 characters" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  gender: z.enum(["m", "f", "o"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  dob: z.string({
    required_error: "A date of birth is required.",
  }),
});

type UserFormValue = z.infer<typeof formSchema>;

type Iprops = {
  toggleModal: () => void;
  className?: string;
  data?: User | null;
};
export default function AddUserForm({ className, toggleModal, data }: Iprops) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Add User Mutation
  const addUserMutation = useMutation({
    mutationFn: async (input: UserFormValue) => {
      return new UserApis().createUserApi(input);
    },
    onSuccess: () => {
      toast.success("User added successfully");
      toggleModal();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add user");
    },
  });

  // Edit User Mutation
  const editUserMutation = useMutation({
    mutationFn: async (input: UserFormValue) => {
      if (data?.id) {
        return new UserApis().editUserByIdApi(data.id, input);
      }
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      toggleModal();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update user");
    },
  });

  const onSubmit = async (input: UserFormValue) => {
    if (data) {
      // Edit operation
      editUserMutation.mutate(input);
    } else {
      // Add new user operation
      addUserMutation.mutate(input);
    }
  };

  useEffect(() => {
    form.reset(data);
  }, [data]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <div className="flex space-x-2 items-center">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your first name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your first name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                    type="password"
                    placeholder="Enter your passowrd..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Phone number..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-2 items-center">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m">male</SelectItem>
                      <SelectItem value="f">female</SelectItem>
                      <SelectItem value="o">other</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Choose your date of birth"
                      disabled={loading}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your address"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            variant="primary"
            className="my-4 ml-auto w-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
