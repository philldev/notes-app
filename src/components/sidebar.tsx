"use client";

import { ChevronRightIcon, FileIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Image from "next/image";
import { useCurrentUser } from "./auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SidebarNotes } from "./sidebar-notes";
import { NewNoteButton } from "./new-note-button";

export function Sidebar() {
  const { user } = useCurrentUser();
  const router = useRouter();

  return (
    <div className="border-r w-[250px] fixed left-0 inset-y-0 p-4 px-2">
      <div className="space-y-4">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="justify-start gap-4 w-full">
                <Image
                  width={24}
                  height={24}
                  className="rounded-md"
                  src={user?.image!}
                  alt="profile picture"
                />
                <span className="font-medium">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuItem
                className="w-full"
                onClick={() => {
                  signOut();
                  router.refresh();
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <NewNoteButton />
        <SidebarNotes />
      </div>
    </div>
  );
}
