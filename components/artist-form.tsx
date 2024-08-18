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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ArtistApis from "@/services/artists-api";
import toast from "react-hot-toast";
import { IArtist } from "@/types/artist";

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter artist  name" }),
  first_release_year: z.string({
    required_error: "A first release year of album is required.",
  }),
  no_of_album_release: z.coerce
    .number({
      required_error: "no of album is required",
      invalid_type_error: "It must be a number",
    })
    .positive(),
  address: z.string().optional(),
  gender: z.enum(["m", "f", "o"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  dob: z.string({
    required_error: "A date of birth is required.",
  }),
});

type ArtistFormValue = z.infer<typeof formSchema>;

type Iprops = {
  toggleModal: () => void;
  className?: string;
  data?: IArtist | null;
};
export default function ArtistForm({ className, toggleModal, data }: Iprops) {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const defaultValues = {
    name: "",
    address: "",
  };
  const form = useForm<ArtistFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Add User Mutation
  const addArtistMutation = useMutation({
    mutationFn: async (input: ArtistFormValue) => {
      return new ArtistApis().createArtistApi(input);
    },
    onSuccess: () => {
      toast.success("Artist added successfully");
      toggleModal();
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add artist");
    },
  });

  // Edit User Mutation
  const editArtistMutation = useMutation({
    mutationFn: async (input: ArtistFormValue) => {
      if (data?.id) {
        return new ArtistApis().editArtistByIdApi(data.id, input);
      }
    },
    onSuccess: () => {
      toast.success("Artist updated successfully");
      toggleModal();
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update artist");
    },
  });

  const onSubmit = async (input: ArtistFormValue) => {
    if (data) {
      // Edit operation
      editArtistMutation.mutate(input);
    } else {
      // Add new user operation
      addArtistMutation.mutate(input);
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
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Artist Name</FormLabel>
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
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="first_release_year"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Release Album</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Choose  date of first release album"
                      className="w-full"
                      disabled={loading}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="no_of_album_release"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Number of Album Release</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormField
            control={form.control}
            name="no_of_album_release"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Number of Album Release</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of album release"
                    disabled={loading}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <div className="flex items-center space-x-2">
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

          <Button
            disabled={loading}
            variant="primary"
            className="mt-12 ml-auto w-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
