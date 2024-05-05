import { useQuery } from "@tanstack/react-query";

export function useGetEntry(entryId: string) {
  return useQuery({
    queryKey: ["getEntry", entryId],
    queryFn: async () => {
      const response = await fetch(`/api/entries/${entryId}`);
      return response.json();
    },
  });
}
