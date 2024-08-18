"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useMemo } from "react";
import { ArtistClient } from "@/components/tables/artist-table/table";
import ArtistApis from "@/services/artists-api";

export default function ArtistPage({ searchParams }: any) {
  // Extract page and limit from searchParams with default values
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;

  const query = useMemo(
    () => `?page=${page}&limit=${pageLimit}`,
    [page, pageLimit]
  );

  const { getArtistsApi } = new ArtistApis();

  const {
    data: artists,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["artists", page, pageLimit],
    queryFn: async () => await getArtistsApi(query),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="space-y-2">
        <ArtistClient data={artists} />
      </div>
    </div>
  );
}
