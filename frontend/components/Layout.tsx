import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <Header />
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
