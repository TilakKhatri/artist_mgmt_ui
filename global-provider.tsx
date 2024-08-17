"use client";

import { store } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [isMount, IsSetMount] = useState(false);
  useEffect(() => {
    IsSetMount(true);
  }, []);

  if (!isMount) return null;
  return (
    <>
      <Provider store={store}>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
          <main suppressHydrationWarning>{children}</main>
        </div>
      </Provider>
    </>
  );
}

export default GlobalProvider;
