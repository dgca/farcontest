"use client";
import { SingleEntry } from "@/components/SingleEntry/SingleEntry";
import { useGetEntry } from "@/dataHooks/useGetEntry";

export function EntryPageContent({ entryId }: { entryId: string }) {
  const { data } = useGetEntry(entryId);
  if (!data) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entry = data.data as any;
  return (
    <SingleEntry
      id={entry.id}
      creator_fid={entry.creator_fid}
      content={entry.content}
      votes={entry.votes}
    />
  );
}
