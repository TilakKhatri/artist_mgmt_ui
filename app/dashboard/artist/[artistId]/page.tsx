"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import ArtistApis from "@/services/artists-api";

import { CalendarIcon, MapPinHouse, Slash } from "lucide-react";
import { MusicClient } from "@/components/tables/music-table/table";

import { usePathname } from "next/navigation";

export default function ArtistDetailpage({
  params,
}: {
  params: { artistId: number };
}) {
  const { getArtistDetailApi } = new ArtistApis();
  const path = usePathname();
  console.log(path.split("/")[2]);
  const {
    data: artistDetail,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["artists", params?.artistId],
    queryFn: async () => await getArtistDetailApi(params.artistId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    // <ScrollArea>
    <section className="relative flex flex-col pt-40 pb-24 mt-8 overflow-auto md:overflow-scroll h-screen">
      <Image
        src="https://pagedone.io/asset/uploads/1705473908.png"
        width={200}
        height={500}
        alt="cover-image"
        className="w-full absolute top-0 left-0 z-0 h-60"
      />
      <div className="flex flex-col justify-center items-center w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center justify-center sm:justify-start relative z-10 mb-5">
          <Image
            src="https://pagedone.io/asset/uploads/1705471668.png"
            width={200}
            height={200}
            alt="user-avatar-image"
            className="border-4 border-solid border-white rounded-full"
          />
          <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
            {artistDetail?.artist?.name}
          </h3>
          <p className="flex space-x-2 font-semibold text-base leading-7 text-gray-600  max-sm:text-center">
            <MapPinHouse width={24} height={24} />{" "}
            <span> {artistDetail?.artist?.address}</span>
          </p>
          <p className="my-2 flex space-x-2 font-normal text-base leading-7 text-gray-600  max-sm:text-center">
            <CalendarIcon width={24} height={24} />
            <span>{artistDetail?.artist?.dob}</span>
          </p>
        </div>
        {/* <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
          <div className="block">
            <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
              {artistDetail?.artist?.name}
            </h3>
            <p className="flex space-x-2 font-semibold text-base leading-7 text-gray-600  max-sm:text-center">
              <MapPinHouse width={24} height={24} />{" "}
              <span> {artistDetail?.artist?.address}</span>
            </p>
            <p className="my-2 flex space-x-2 font-normal text-base leading-7 text-gray-600  max-sm:text-center">
              <CalendarIcon width={24} height={24} />
              <span>{artistDetail?.artist?.dob}</span>
            </p>
          </div>
        </div> */}
        {/* <Button variant="primary">Add New Music</Button> */}
      </div>

      <div className="space-y-2 mt-6 h-auto">
        <MusicClient data={artistDetail} />
      </div>
    </section>
  );
}
