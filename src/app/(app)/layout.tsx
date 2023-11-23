import { Sidebar } from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/components/auth-provider";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (!user) redirect("/api/auth/signin");

  return (
    <AuthProvider user={user}>
      <div className="">
        <Sidebar />
        <div className="ml-[250px] min-h-screen">{children}</div>
      </div>
    </AuthProvider>
  );
}
