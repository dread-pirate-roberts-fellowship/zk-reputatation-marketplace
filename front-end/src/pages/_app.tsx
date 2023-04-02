import type { AppProps } from "next/app";
import { ChakraProvider, LightMode, Spinner } from "@chakra-ui/react";
import theme from "../theme/theme";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";

const UseInkProvider = dynamic(
  () => import("useink").then((def) => def.UseInkProvider),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UseInkProvider
      config={{
        dappName: "dread-pirate-roberts-fellowship-marketplace",
        providerUrl: "wss://ws.test.azero.dev",
      }}
    >
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </UseInkProvider>
  );
}

export default MyApp;
