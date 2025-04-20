import { Meme } from "@/components/types";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";

interface Props {
  memes: Meme[];
}

export const List = ({ memes }: Props) => {
  return (
    <>
      {memes?.map((el: Meme) => (
        <Card
          key={el.name}
          classNames={{
            base: "h-full border rounded-sm",
            body: "flex flex-col justify-between p-2",
          }}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">{el.name}</p>
          </CardHeader>
          <CardBody>
            <Image
              alt="Card background"
              src={el.image}
              width={450}
              height={250}
              className="mx-auto"
            />

            <p>Likes: {el.likes ?? 0}</p>
            <a href={el.image}>Link</a>
          </CardBody>
        </Card>
      ))}
    </>
  );
};
