import { useQuery } from "@tanstack/react-query";

export function useGetContest(id: string) {
  return useQuery({
    queryKey: ["getContest", id],
    queryFn: async () => {
      const response = await fetch(`/api/contest/${id}`);
      return response.json();
    },
  });
}
