"use client";

import { SessionProvider } from "next-auth/react";

import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export const AuthProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  return <SessionProvider>{children}</SessionProvider>;
};
