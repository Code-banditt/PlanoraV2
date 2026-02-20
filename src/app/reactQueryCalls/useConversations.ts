import { useQuery } from "@tanstack/react-query";

export function useConversations(userId?: string) {
  return useQuery({
    queryKey: ["conversations", userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await fetch(`/api/conversations/get?userId=${userId}`);
      const data = await res.json();
      return data.conversations || [];
    },
    enabled: !!userId,
  });
}
