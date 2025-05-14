import { getUser } from "@/utils/supabase/server"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSideBar } from "@/components/SideBar"

export default async function AuthenticatedLayout({ children }) {
  const user = await getUser()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {user && <AppSideBar user={user} />}
        <main className="flex flex-1 flex-col overflow-auto px-4 xl:px-8">
          <div className="flex items-start gap-2 py-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
