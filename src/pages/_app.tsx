import type { AppProps } from "next/app";
import { ChakraProvider, LightMode, Spinner } from "@chakra-ui/react";
import theme from "../theme/theme";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { itemType } from "../utils/types";
import { doFetch } from "../utils/ipfs";
import {
  FakeItemContext,
  FakeItemDispatchContext,
  getItems,
  getStatusAndReputation,
} from "../utils/fake";

const UseInkProvider = dynamic(
  () => import("useink").then((def) => def.UseInkProvider),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [items, dispatch] = useReducer(itemsReducer, [] as itemType[]);
  async function loadItems() {
    const ipfsIds = await getItems();
    const tmp = await Promise.all(
      ipfsIds.map(async (ipfsId) => {
        let tmp = await doFetch(ipfsId);
        tmp = await getStatusAndReputation(ipfsId, tmp);
        return tmp;
      })
    );
    console.log("tmp", tmp);
    dispatch({ type: "changedAll", value: tmp });
    setLoading(false);
  }
  useEffect(() => {
    loadItems();
  }, []);
  if (!loading) {
    return (
      <FakeItemContext.Provider value={items}>
        <FakeItemDispatchContext.Provider value={dispatch}>
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
        </FakeItemDispatchContext.Provider>
      </FakeItemContext.Provider>
    );
  } else {
    return <Spinner />;
  }
}

function itemsReducer(
  items: itemType[],
  action: { type: string; value: itemType[] | itemType }
) {
  switch (action.type) {
    case "changedItem": {
      return items.map((tmp) => {
        if (tmp.name == (action.value as itemType).name)
          return action.value as itemType;
        else return tmp;
      });
    }
    case "changedAll": {
      return action.value as itemType[];
    }
    default:
      throw Error("Not planned");
  }
}

export default MyApp;
