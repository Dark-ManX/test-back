"use client";

import Head from "next/head";
import { TableComponent } from "@/components/pages";
import { useGetMemesQuery } from "@/store/services/memesApi";

const TablePage = () => {
  const { data } = useGetMemesQuery({});
  fetch("");

  return (
    <>
      <Head>
        <title>Table</title>
      </Head>
      <TableComponent memes={data} />
    </>
  );
};

export default TablePage;
