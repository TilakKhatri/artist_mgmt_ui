"use client";

import UserApis from "@/services/users-api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { UserClient } from "@/components/tables/user-tables/user-table";
import { useMemo } from "react";

export default function UserPage({ searchParams }: any) {
  // Extract page and limit from searchParams with default values
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;

  const query = useMemo(
    () => `?page=${page}&limit=${pageLimit}`,
    [page, pageLimit]
  );

  const { getUserssApi } = new UserApis();

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users", page, pageLimit],
    queryFn: async () => await getUserssApi(query),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="space-y-2">
        <UserClient data={users} />
      </div>
    </div>
  );
}
