import { AppProps } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { makeServer } from "../services/mirage";
import { QueryClientProvider } from "react-query";
import { querytClient } from "../services/queryClient";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={querytClient}>
      <SidebarDrawerProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SidebarDrawerProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
