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

import { useEffect, useMemo, useState } from "react";
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
import MusicApis from "@/services/music-api";
import toast from "react-hot-toast";
import { IMusic } from "@/types/artist";
import { usePathname } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(10, { message: "Please enter title  name" }),
  album_name: z.string().min(5, { message: "Please enter album name" }),
  genre: z.enum(["rnb", "country", "classic", "rock", "jazz"], {
    errorMap: () => ({ message: "Please select a genre" }),
  }),
});

type MusicFormValue = z.infer<typeof formSchema>;

type Iprops = {
  toggleModal: () => void;
  className?: string;
  data?: IMusic | null;
};
export default function MusicForm({ className, toggleModal, data }: Iprops) {
  const queryClient = useQueryClient();
  const path = usePathname();

  const artistId = useMemo(() => parseInt(path.split("/")[3], 10), [path]);
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    title: "",
    album_name: "",
  };
  const form = useForm<MusicFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Add User Mutation
  const addMusicMutation = useMutation({
    mutationFn: async (input: MusicFormValue) => {
      return new MusicApis().createMusicApi(artistId, input);
    },
    onSuccess: () => {
      toast.success("Music added successfully");
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["music"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add artist");
    },
  });

  // Edit User Mutation
  const editMusicMutation = useMutation({
    mutationFn: async (input: MusicFormValue) => {
      if (data?.id) {
        return new MusicApis().editMusicByIdApi(data.id, artistId, input);
      }
    },
    onSuccess: () => {
      toast.success("Music updated successfully");
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["music"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update artist");
    },
  });

  const onSubmit = async (input: MusicFormValue) => {
    if (data) {
      // Edit operation
      // console.log({...data,artist_id:artistId});
      editMusicMutation.mutate(input);
    } else {
      // Add new user operation
      addMusicMutation.mutate(input);
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
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Music Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter title of music"
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
            name="album_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Album Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter album name"
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
            name="genre"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Genre</FormLabel>
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
                    <SelectItem value="rnb">RNB</SelectItem>
                    <SelectItem value="country">Country</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="jazz">Jazz</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

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
