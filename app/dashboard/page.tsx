import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityIcon, LucideMicVocal, UsersIcon } from "lucide-react";

export default function DashboardPage() {
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
            <div className="text-2xl font-bold">10</div>
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
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              This is number of artists.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <ActivityIcon width={20} height={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73</div>
            <p className="text-xs text-muted-foreground">
              Number of users plus artists
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
