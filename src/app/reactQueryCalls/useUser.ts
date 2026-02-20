// app/reactQueryCalls/useUser.ts - Update with debugging
import { useQuery } from "@tanstack/react-query";

export function useUser(userId?: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) {
        console.log("❌ No userId provided to useUser");
        return null;
      }

      try {
        console.log(`🔍 Fetching user data for ID: ${userId}`);
        const res = await fetch(`/api/user/${userId}`);

        if (!res.ok) {
          console.error(
            `❌ Failed to fetch user: ${res.status}`,
            await res.text(),
          );
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        console.log(`✅ User data received for ${userId}:`, data);

        return data;
      } catch (error) {
        console.error("❌ Error in useUser:", error);
        return null;
      }
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}
