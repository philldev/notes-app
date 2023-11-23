"use server";

import prisma from "@/lib/prisma";

export async function getDocuments({
  userId,
}: {
  userId?: string;
} = {}) {
  const documents = await prisma.document.findMany({
    where: {
      userId,
      deleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return documents;
}

export async function createDocument({ userId }: { userId: string }) {
  const doc = await prisma.document.create({
    data: {
      userId,
    },
  });

  return doc;
}

export async function updateDocument(
  id: string,
  {
    content,
    title,
    deleted,
  }: { content?: string; title?: string; deleted?: boolean },
) {
  const doc = await prisma.document.update({
    where: {
      id,
    },
    data: {
      content,
      title,
      deleted,
    },
  });

  return doc;
}

export async function deleteDocument(id: string) {
  await prisma.document.delete({
    where: {
      id,
    },
  });
}
