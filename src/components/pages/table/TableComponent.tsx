"use client";

import { Mem, Meme } from "@/components/types";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useEffect, useState } from "react";

interface Props {
  memes: Meme[];
}

export const TableComponent = ({ memes }: Props) => {
  const [data, setData] = useState<Mem[]>([]);

  const onDelete = (idx: number, value: string) => {
    setData((prev) => {
      return prev.reduce((acc: Mem[], el: Mem, index: number) => {
        if (idx !== index) {
          acc.push(el);
        } else {
          acc.push({
            ...el,
            properties: el.properties.filter((item) => item !== value),
          });
        }

        return acc;
      }, []);
    });
  };

  useEffect(() => {
    setData(memes);
    console.log(data);
  }, [memes]);

  return (
    <Table>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Image</TableColumn>
        <TableColumn>Likes</TableColumn>
        <TableColumn>Properties</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>

      <TableBody>
        {data?.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell className="text-center">{row.name}</TableCell>
            <TableCell className="text-center">
              <img src={row.image} alt={row.name} width={200} height={200} />
            </TableCell>
            <TableCell className="text-center">{row.likes}</TableCell>
            <TableCell className="text-center">
              <Input
                startContent={
                  <>
                    {row.properties.map((el) => (
                      <Chip
                        key={el}
                        color="primary"
                        className="flex text-nowrap gap-2"
                      >
                        {el}
                        {/* <Button onPress={() => onDelete(index, el)}>X</Button> */}
                      </Chip>
                    ))}
                  </>
                }
                classNames={{ innerWrapper: ["flex", "gap-4"] }}
              />
            </TableCell>
            <TableCell className="text-center">
              <Button color="primary">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
