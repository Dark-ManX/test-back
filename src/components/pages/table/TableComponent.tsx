"use client";

import { Meme } from "@/components/types";
import {
  useGetMemesQuery,
  useLazyGetMemeQuery,
  useUpdateMemeMutation,
} from "@/store/services/memesApi";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { SyntheticEvent, useEffect, useState, KeyboardEvent } from "react";

export const TableComponent = () => {
  const { data: memes, isFetching: memesFetching } = useGetMemesQuery({});
  const [getMeme, { data: currentMeme, isFetching, isSuccess }] =
    useLazyGetMemeQuery();
  const [updateMeme] = useUpdateMemeMutation();

  const [editData, setEditData] = useState<Meme | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleEdit = async (id: number) => {
    try {
      onOpen();
      await getMeme({ id });
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  };

  const onDelete = (value: string) => {
    setEditData((prev) => {
      if (prev) {
        return {
          ...prev,
          properties: prev.properties.filter((el) => el !== value),
        };
      }

      return prev;
    });
  };

  const handleUpdate = async () => {
    try {
      await updateMeme({
        id: editData?.id,
        data: { properties: editData?.properties },
      });
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  };

  const handlePropertiesChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    setInputValue(value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditData((prev) => {
        if (prev && inputValue && !prev?.properties.includes(inputValue)) {
          return {
            ...prev,
            properties: [...prev.properties, inputValue],
          };
        }

        return prev;
      });
      setInputValue("");
    }
  };

  useEffect(() => {
    if (isSuccess) setEditData(currentMeme);
  }, [isFetching]);

  return (
    <>
      <Table classNames={{ base: "overflow-scroll" }}>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Image</TableColumn>
          <TableColumn>Likes</TableColumn>
          <TableColumn>Properties</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>

        <TableBody
          isLoading={memesFetching}
          loadingContent={<Spinner classNames={{ base: "mt-10 mx-auto" }} />}
        >
          {memes?.map((row: Meme) => (
            <TableRow key={row.id}>
              <TableCell className="text-center">{row.name}</TableCell>
              <TableCell className="text-center">
                <div className="inline-block mx-auto">
                  <img
                    src={row.image}
                    alt={row.name}
                    width={200}
                    height={200}
                  />
                </div>
              </TableCell>
              <TableCell className="text-center">{row.likes ?? 0}</TableCell>
              <TableCell className="text-center max-w-[200px]">
                <div className="inline-flex gap-2 flex-wrap">
                  {row.properties.map((el) => (
                    <Chip key={el}>
                      {el}
                      {/* <Button onPress={() => onDelete(index, el)}>X</Button> */}
                    </Chip>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button color="primary" onPress={() => handleEdit(row.id)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        shouldBlockScroll={false}
        backdrop="opaque"
        size="md"
        classNames={{
          backdrop:
            "fixed top-0 left-0 size-full bg-[rgba(0,0,0,0.4)] opacity-50",
          closeButton: "absolute top-5 right-5",
          footer: "mx-auto gap-4",
          wrapper: "top-1/2 left-1/2 p-4 translate-[-50%] w-[550px]",
        }}
      >
        <ModalContent className="bg-white w-full p-4">
          {isFetching ? (
            <p>Loading...</p>
          ) : (
            (onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {currentMeme.name}
                </ModalHeader>
                <ModalBody>
                  <Input
                    value={inputValue}
                    variant="bordered"
                    placeholder="Input property"
                    startContent={
                      <div className="flex flex-wrap gap-2 items-center max-w-full">
                        {editData &&
                          editData.properties.map((el) => {
                            return (
                              <Chip
                                key={el}
                                variant="bordered"
                                onClose={() => onDelete(el)}
                                classNames={{ dot: "text-nowrap" }}
                              >
                                {el}
                              </Chip>
                            );
                          })}
                      </div>
                    }
                    onChange={handlePropertiesChange}
                    onKeyUp={handleKeyUp} //eslint-disable-line
                    classNames={{
                      base: "border p-2 gap-2",
                      input: "p-2 border",
                    }}
                    // className="max-w-[500px] border-gray-700 border gap-4 flex-wrap"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleUpdate}>
                    Update
                  </Button>
                </ModalFooter>
              </>
            )
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
