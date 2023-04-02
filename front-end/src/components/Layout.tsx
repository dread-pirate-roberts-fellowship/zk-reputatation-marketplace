import { Box, Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Header = dynamic(() => import("./Header"), {
  loading: () => <Spinner />,
  ssr: false,
});
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box px="200px">
      <Header />
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
