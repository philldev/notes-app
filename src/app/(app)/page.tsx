import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) redirect("/api/auth/signin");

  const firstDoc = await prisma.document.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (firstDoc) {
    redirect(`/${firstDoc.id}`);
  } else if (!firstDoc) {
    const doc = await prisma.document.create({
      data: {
        userId: user.id,
      },
    });
    redirect(`/${doc.id}`);
  }

  return <div></div>;
}
