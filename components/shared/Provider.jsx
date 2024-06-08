"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function GlobalProvider({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" richColors />
        {children}
      </QueryClientProvider>
    </>
  );
}
