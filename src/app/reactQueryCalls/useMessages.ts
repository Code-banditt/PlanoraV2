// app/reactQueryCalls/useMessages.ts
import { useQuery } from "@tanstack/react-query";

export function useMessages(userId?: string, receiverId?: string) {
  return useQuery({
    queryKey: ["messages", userId, receiverId],
    queryFn: async () => {
      if (!userId || !receiverId) return [];
      const res = await fetch(
        `/api/message/get?senderId=${userId}&receiverId=${receiverId}`,
      );
      const data = await res.json();
      return data.messages || [];
    },
    enabled: !!userId && !!receiverId,
  });
}
