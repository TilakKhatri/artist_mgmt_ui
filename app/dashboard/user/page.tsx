import { UserClient } from "@/components/tables/user-tables/user-table";
import { users } from "@/constants/data";

export default function page() {
  return (
    <div>
      <div className="space-y-2">
        <UserClient data={users} />
      </div>
    </div>
  );
}
