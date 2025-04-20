"use client";

import { List } from "@/components/pages";
import { useGetMemesQuery } from "@/store/services/memesApi";
import Head from "next/head";

const ListPage = () => {
  const { data: memes } = useGetMemesQuery({});

  return (
    <>
      <Head>
        <title>List</title>
      </Head>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 px-2.5">
        <List memes={memes} />
      </div>
    </>
  );
};

export default ListPage;
