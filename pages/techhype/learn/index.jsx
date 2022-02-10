import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../../../contexts/AppProvider";
import { getTranslation } from "../../../utils/language-translator";
import rest from "../../../utils/rest";
import config from "../../../app.config.json";

// const items = [
//   {
//     image: "/wallpapers/Vscode.PNG",
//     href: "/techhype/learn/vscode-top-tips",
//     title: "VSCODE Top Tips",
//     description: `Learn VS Code Productivity tips and tricks that will help you write code faster.`,
//     tags: [
//       {
//         text: "#vscode",
//         class:
//           "py-1 px-2 text-sm tag-vscode mr-2 rounded-sm cursor-pointer tracking-wider",
//         href: "/",
//       },
//     ],
//     author_profile: "/profiles/hlm.jpg",
//     author_name: "Htet Lin Maung",
//   },
// ];

export default function Learn({ items }) {
  const [state, dispatch] = useContext(appContext);

  return (
    <div className="container mx-auto px-4 pt-10 text-xl">
      <h1 className="text-4xl my-7">Latest Lessons</h1>

      <div className="grid md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 justify-items-center gap-5">
        {items.map((item) => (
          <div
            key={item._id}
            className="lesson-card bluish-color overflow-hidden max-w-md rounded-xl shadow-lg inline-flex flex-col hover:-translate-y-1 ease-in-out duration-300"
          >
            <Link href={item.href} passHref>
              <Image
                className="cursor-pointer"
                src={config.server + item.wallpaper}
                alt={item.title}
                width={500}
                height={281}
              />
            </Link>
            <div className="p-5">
              <h1 className="text-2xl my-5">
                {getTranslation(state.lang, item.title)}
              </h1>
              <p className="text-xl leading-10  text-gray-300 my-5">
                {getTranslation(state.lang, item.description)}
              </p>
              {item.tags.map((tag, i) => (
                <Link key={tag._id} href={tag.href} passHref>
                  <span
                    className="py-2 px-3 my-1 text-sm mr-2 rounded-md cursor-pointer tracking-wider"
                    style={{
                      background: tag.background,
                      color: tag.color,
                    }}
                  >
                    {tag.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let items = [];
  const [res, err] = await rest.get("/lessons", {
    page: 1,
    per_page: 24,
  });

  if (!err) {
    items = res.data.data;
  }

  return {
    props: {
      items,
    },
  };
}
