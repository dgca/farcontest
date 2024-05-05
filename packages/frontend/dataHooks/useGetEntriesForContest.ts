import { useQuery } from "@tanstack/react-query";

export function useGetEntriesForContest(contestId: string) {
  return useQuery({
    queryKey: ["getEntriesForContest", contestId],
    queryFn: async () => {
      const response = await fetch(`/api/contest/${contestId}/entries`);
      return response.json();
    },
  });
}
