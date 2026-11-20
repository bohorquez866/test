"use client";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/lib/trpc/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      {children}
      <Toaster richColors closeButton />
    </TRPCReactProvider>
  );
}
