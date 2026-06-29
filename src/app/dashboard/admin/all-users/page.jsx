import AllUsersTable from "@/components/dashboard/AllUsersTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const UsersManagementPage = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const allUsers = await res.json();


  return (
    <div className="pt-10 pb-20 h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {allUsers?.length > 0 ? (
        <AllUsersTable allUsers={allUsers} />
      ) : (
        <div className="flex min-h-[40vh] items-center justify-center">
          <h3 className="text-2xl font-semibold text-center">
            No Users Found.
          </h3>
        </div>
      )}
    </div>
  );
};

export default UsersManagementPage;
