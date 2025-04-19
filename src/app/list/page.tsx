"use client";

import { Listbox, ListboxItem } from "@heroui/listbox";

const ListPage = () => {
  return (
    <Listbox>
      {[1, 2, 3, 4].map((el, idx) => (
        <ListboxItem key={idx}>{el}</ListboxItem>
      ))}
    </Listbox>
  );
};

export default ListPage;
