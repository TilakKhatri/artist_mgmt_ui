"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Load from "@/components/ui/loading";
import { getAnalyticData } from "@/services/analytics-api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  ActivityIcon,
  LucideMicVocal,
  UsersIcon,
  MusicIcon,
} from "lucide-react";

export default function DashboardPage() {
  const { error, data, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => await getAnalyticData(),
  });
  console.log(error, data, isLoading);
  if (isLoading) return <Load />;
  if (error) return new Error(error.message);

  return (
    <div className="flex flex-col space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon width={20} height={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.user_count}</div>
            <p className="text-xs text-muted-foreground">
              This is number of users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artists</CardTitle>
            <LucideMicVocal width={20} height={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.artist_count}</div>
            <p className="text-xs text-muted-foreground">
              This is number of artists.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Musics</CardTitle>
            <MusicIcon width={20} height={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.music_count}</div>
            <p className="text-xs text-muted-foreground">
              All the musics created for artist.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <ActivityIcon width={20} height={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(data?.artist_count) + Number(data?.user_count)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total members of system.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
