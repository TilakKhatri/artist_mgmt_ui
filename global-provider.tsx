"use client";

import { store } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [isMount, IsSetMount] = useState(false);
  useEffect(() => {
    IsSetMount(true);
  }, []);

  if (!isMount) return null;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <div>
            <Toaster position="top-center" reverseOrder={false} />
            <main suppressHydrationWarning>{children}</main>
          </div>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default GlobalProvider;
