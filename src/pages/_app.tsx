import type { AppProps } from "next/app";
import { ChakraProvider, LightMode } from "@chakra-ui/react";
import theme from "../theme/theme";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
