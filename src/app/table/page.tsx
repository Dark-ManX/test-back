"use client";

import Head from "next/head";
import { TableComponent } from "@/components/pages";

const TablePage = () => {
  return (
    <>
      <Head>
        <title>Table</title>
      </Head>
      <TableComponent />
    </>
  );
};

export default TablePage;
