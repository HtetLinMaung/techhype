import { useContext, useEffect } from "react";
import { appContext } from "../../../../contexts/AppProvider";
import { getTranslation } from "../../../../utils/language-translator";
import Link from "next/link";
import Image from "next/image";
import config from "../../../../app.config.json";
import moment from "moment";
import rest from "../../../../utils/rest";

export default function VscodeTopTip({ item }) {
  const [state, dispatch] = useContext(appContext);

  useEffect(() => {
    const elements = document.querySelectorAll(".code-container");
    if (elements) {
      for (const element of elements) {
        element.addEventListener("click", (e) => {
          // copy to window clipboard
          const text = e.target.innerText;
          navigator.clipboard.writeText(text);
          const toast = document.createElement("div");
          toast.style.transform = "scale(0) translateX(50%)";
          toast.className =
            "py-3 px-5 sm:pr-28 md:pr-28 lg:pr-28 xl:pr-28 rounded-lg top-16 right-1/2 fixed z-50 text-base flex items-center justify-center bg-white text-black translate-x-1/2 ease-in-out duration-300";
          toast.innerText = "Copied to clipboard";
          const body = document.querySelector("body");
          body.appendChild(toast);
          setTimeout(() => {
            toast.style.transform = "scale(1) translateX(50%)";
          }, 500);
          setTimeout(() => {
            toast.style.transform = "scale(0) translateX(50%)";
            setTimeout(() => {
              body.removeChild(toast);
            }, 500);
          }, 3000);
        });
      }
    }
  }, []);

  return (
    <div className="px-3 lg:px-0 xl:px-0 2xl:px-0 container mx-auto py-10 text-xl">
      <h1 className="text-6xl my-12 pb-7 text-center center-title">
        {getTranslation(state.lang, item.title)}
      </h1>

      <div className="flex flex-wrap-reverse">
        <section className="m-1 xl:w-3/4 sm:m-6 xl:m-0">
          <div className="lesson-card bluish-color overflow-hidden w-full rounded-xl shadow-lg inline-flex flex-col">
            <Image
              src={config.server + item.wallpaper}
              alt={item.title}
              width={1920}
              height={1024}
            />

            <div className="p-5 flex">
              <div className="p-2">
                <p className="text-lg leading-10  text-gray-300 my-5">
                  {getTranslation(state.lang, item.description)}
                </p>
                <div className="my-5 flex">
                  <div className="mr-2">
                    <Image
                      className="rounded-full"
                      src={config.server + item.author_profile}
                      alt={item.author_name}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <em>
                      By{" "}
                      <span className="text-blue-400">{item.author_name}</span>
                    </em>
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  {/* Last Updated Feb, 9, 2022 */}
                  <div className="mb-1">
                    Created {moment(item.created_at).format("MMM, DD, YYYY")}
                  </div>
                  <span className="py-1 px-2 text-sm tag-last-updated mr-2 rounded-sm">
                    Last Updated{" "}
                    {moment(item.created_at).format("MMM, DD, YYYY")}
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col p-3 items-end">
                <div className="flex mb-auto">
                  {item.git_url ? (
                    <button
                      onClick={() => {
                        location.href = item.git_url;
                      }}
                      className="text-sm font-bold btn-code text-black py-2 px-6 hover:-translate-y-1 ease-in-out duration-300 m-1 rounded-md flex  justify-items-center items-center"
                    >
                      <svg
                        aria-hidden="true"
                        data-prefix="far"
                        data-icon="code-merge"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="svgcode-merge w-3 mr-2"
                      >
                        <path
                          fill="currentColor"
                          d="M304 192c-38 0-69.8 26.5-77.9 62-23.9-3.5-58-12.9-83.9-37.6-16.6-15.9-27.9-36.5-33.7-61.6C138.6 143.3 160 114.1 160 80c0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-35.8-23.5-66.1-56-76.3V246.1c1.6 1.7 3.3 3.4 5 5 39.3 37.5 90.4 48.6 121.2 51.8 12.1 28.9 40.6 49.2 73.8 49.2 44.2 0 80-35.8 80-80S348.2 192 304 192zM80 48c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm0 416c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32zm224-160c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32z"
                        ></path>
                      </svg>{" "}
                      CODE
                    </button>
                  ) : (
                    ""
                  )}

                  <button
                    onClick={() => {
                      location.href = item.discord_url;
                    }}
                    className="text-sm font-bold btn-discord  py-3 px-6 hover:-translate-y-1 ease-in-out duration-300 m-1 rounded-md flex  justify-items-center items-center"
                  >
                    <svg
                      viewBox="0 0 256 199"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 mr-2"
                    >
                      <path
                        d="M216.856 17.0966C200.285 9.34329 182.566 3.7085 164.042 0.5C161.767 4.61318 159.109 10.1455 157.276 14.5464C137.584 11.585 118.073 11.585 98.743 14.5464C96.9108 10.1455 94.1926 4.61318 91.8972 0.5C73.3526 3.7085 55.6134 9.36399 39.0421 17.1377C5.61752 67.6465 -3.44332 116.901 1.08711 165.456C23.256 182.011 44.7404 192.068 65.8621 198.649C71.0772 191.471 75.7284 183.841 79.7352 175.8C72.104 172.901 64.795 169.322 57.8888 165.168C59.721 163.811 61.5131 162.391 63.2446 160.931C105.367 180.633 151.135 180.633 192.755 160.931C194.506 162.391 196.298 163.811 198.11 165.168C191.184 169.343 183.855 172.921 176.224 175.821C180.23 183.841 184.862 191.492 190.097 198.669C211.239 192.088 232.743 182.032 254.912 165.456C260.228 109.168 245.831 60.3662 216.856 17.0966ZM85.4739 135.595C72.829 135.595 62.4592 123.79 62.4592 109.415C62.4592 95.0396 72.6076 83.2146 85.4739 83.2146C98.3405 83.2146 108.71 95.0189 108.489 109.415C108.509 123.79 98.3405 135.595 85.4739 135.595ZM170.525 135.595C157.88 135.595 147.511 123.79 147.511 109.415C147.511 95.0396 157.659 83.2146 170.525 83.2146C183.392 83.2146 193.761 95.0189 193.54 109.415C193.54 123.79 183.392 135.595 170.525 135.595Z"
                        fill="white"
                      />
                    </svg>{" "}
                    DISCORD
                  </button>
                </div>
                <div>
                  {item.tags.map((tag, i) => (
                    <Link key={tag._id} href={tag.href} passHref>
                      <span
                        className="py-1 px-2 text-sm mr-2 rounded-sm cursor-pointer tracking-wider"
                        style={{ background: tag.background, color: tag.color }}
                      >
                        {tag.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "Most of us think VS Code is a simple code editor. But it's not. To open project in your editor, you pull up your file explorer and then click open with VS Code. But you can do it more quickly from command line."
            )}
          </p>
          <h1
            id="launching-from-the-command-line"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            {getTranslation(state.lang, "Launching from the command line")}
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "You can also run VS Code from the command line by typing 'code'. But in Mac & Linux, you need to add VS Code executable to your PATH environment variable."
            )}
          </p>
          <div className="inline-flex bluish-color text-lg text-gray-300 p-2 pr-5 rounded-t-md shadow-lg">
            <svg
              aria-hidden="true"
              data-prefix="fas"
              data-icon="terminal"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="svgterminal w-6 h-6 mr-2"
            >
              <path
                fill="currentColor"
                d="M257.981 272.971L63.638 467.314c-9.373 9.373-24.569 9.373-33.941 0L7.029 444.647c-9.357-9.357-9.375-24.522-.04-33.901L161.011 256 6.99 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L257.981 239.03c9.373 9.372 9.373 24.568 0 33.941zM640 456v-32c0-13.255-10.745-24-24-24H312c-13.255 0-24 10.745-24 24v32c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24z"
              ></path>
            </svg>{" "}
            command line
          </div>
          <div className="p-5 mb-4 bluish-color shadow-lg rounded-r-xl rounded-b-xl code-container">
            <pre className="code-font text-base text-gray-300 font-normal">
              <span className="text-gray-500">
                {"# open current directory \n"}
              </span>
              code . {"\n\n"}
              <span className="text-gray-500">{"# open index.ts file\n"}</span>
              code index.ts
            </pre>
          </div>
          <h1
            id="searching-files"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            {getTranslation(state.lang, "Searching files")}
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "You can search files quickly with Command Palette by typing CTRL + P or Cmd + P. It is quicker than trying to find the files in your file explorer."
            )}
          </p>
          <video
            src="/movies/CommandPallete.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>
          <h1
            id="running-commands"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            {getTranslation(state.lang, "Running Commands")}
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "Command Palette can do more than finding files. If you type right angle bracket '>', it will give you access to all the commands you can run on VS Code."
            )}
          </p>
          <video
            src="/movies/CommandPallete2.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>
          <h1
            id="finding-with-ctrl-f"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            {getTranslation(state.lang, "Finding with CTRL + F")}
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "When working in a big file, the worst thing you do is scroll around the page and looking for functions or interfaces. You can type CTRL + F or Cmd + F to open the Find Widget in the editor. From there you can search the things you need."
            )}
          </p>
          <video
            src="/movies/CtrlF.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>
          <h1
            id="finding-with-symbols"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            {getTranslation(state.lang, "Finding with symbols")}
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "You can also find with symbols in Command Palette. With '@' symbol, you can get symbol list to quickly navigate around the page. You can also type CTRL + SHIFT + . or Cmd + SHIFT + . to do the same thing. But sometime you want to find symbol throughout the entire project. You can also type '#' symbol in Command Pallete to get a list of all symbols."
            )}
          </p>
          <video
            src="/movies/Symbol.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>

          <h1
            id="searching-with-line-number-and-highlighting"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            {getTranslation(
              state.lang,
              "Searching with line number & highlighting"
            )}
          </h1>

          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "You can jump to specific line by typing CTRL + G followed by line number. From there you can highlight the line by holding SHIFT + ARROW key."
            )}
          </p>

          <video
            src="/movies/LineNumber.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>

          <h1
            id="multiline-editing"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            {getTranslation(state.lang, "Multiline Editing")}
          </h1>

          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "If you find the word you want to edit, type CTRL + D or Cmd + D to select it. If this word or code is multiple occurance, you can edit them all by pressing CTRL + D or Cmd + D multiple times. Holding down ALT + CLICK or OPTION + CLICK with mouse can also be used for multiline editing like renaming tags. But you can make it more easier by using Auto Rename Tag extension."
            )}
          </p>

          <video
            src="/movies/Multiline.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>

          <h1
            id="cutting-and-moving"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            {getTranslation(state.lang, "Cutting & moving")}
          </h1>

          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "You don't need to select a line to cut it. You can just type CTRL + X or Cmd + X to cut the line. But if your goal is to move a line, just type ALT + UP / DOWN or OPTION + UP / DOWN."
            )}
          </p>

          <video
            src="/movies/Cut.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>

          <h1
            id="toggling-comments"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            {getTranslation(state.lang, "Toggling comments")}
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "You can toggle comments by first highlighting your codes and typing CTRL + / or Cmd + /. You can make your comments more easier to read with Better Comments Extension."
            )}
          </p>
          <video
            src="/movies/Comments.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>
          <h1
            id="integrated-terminal"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            Integrated Terminal
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "You can open terminal directly in VS Code by typing CTRL + `. You can also rename your terminal and change color or icon. To clear terminal you can type CTRL + K or Cmd + K."
            )}
          </p>
          <video
            src="/movies/Terminal.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>
          <h1
            id="running-tasks"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            {getTranslation(state.lang, "Running Tasks")}
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "If you have to run repeated commands. You can configure tasks in VS Code."
            )}
          </p>
          <video
            src="/movies/Task.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>
          <h1
            id="source-control"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            Source Control
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "You don't need to know complex git commands. VS Code give all the possible commands for you."
            )}
          </p>
          <video
            src="/movies/SourceControl.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>
          <h1 id="remote-ssh" className="my-6 text-2xl text-gray-300 sub-title">
            {getTranslation(state.lang, "Remote SSH")}
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "Sometime you want to develop on the same operating system you deploy or use more high performance than your local machine. You can use Remote SSH Extension."
            )}
          </p>
          <video
            src="/movies/SSH.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>

          <h1
            id="auto-creating-folders"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            {getTranslation(state.lang, "Auto-Creating folders")}
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "You can also create files in directories that doesn't exist yet. Just type /foldername/filename. It will auto create folders for you."
            )}
          </p>

          <video
            src="/movies/AutoCreate.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>

          <h1
            id="pasting-json-as-type"
            className="my-6 text-2xl text-gray-300 sub-title"
          >
            {getTranslation(state.lang, "Pasting JSON as Type")}
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "When writing typescript code, declaring types and schemas for JSON data is very time consuming. Paste JSON as Code extension can automatically create types from JSON."
            )}
          </p>

          <video
            src="/movies/PasteJson.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>

          <h1 id="renaming" className="my-6 text-2xl text-gray-300 sub-title">
            {getTranslation(state.lang, "Renaming")}
          </h1>
          <p className="text-lg leading-10  text-gray-300 my-5">
            {getTranslation(
              state.lang,
              "Sometime you want to rename a function for a whole project because of bad naming. The first thing you would do is find the whole projects and rename it. It can be dangerous. The better idea is find the function or name you want to edit and then right click it. There you can find its all references and implementations. From there you can use rename symbol options to rename it accross all of your files."
            )}
          </p>

          <video
            src="/movies/Translate.mov"
            muted
            onMouseOver={(e) => {
              e.target.play();
            }}
          ></video>
        </section>
        <aside className="w-full mx-1 mb-2 sm:mx-6 xl:w-auto xl:mr-0 xl:ml-2">
          <nav
            id="tableOfContents"
            className="sticky top-28 bluish-color rounded-xl shadow-lg p-3 overflow-y-auto"
            style={{ maxHeight: "80vh" }}
          >
            <ul>
              {item.table_of_contents.map((item, index) => (
                <li
                  key={`content${index}`}
                  className="text-sm text-gray-300 p-2"
                >
                  <a href={item.href} className="ease-in-out duration-500">
                    {getTranslation(state.lang, item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let item = null;
  const [res, err] = await rest.get("/lessons/vscode-top-tips");

  if (!err) {
    item = res.data.data;
  }

  return {
    props: {
      item,
    },
  };
}
