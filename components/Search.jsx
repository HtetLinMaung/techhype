import Link from "next/link";
import { useEffect } from "react";

export default function Search({ open, onClose, items, onInput }) {
  useEffect(() => {
    const elements = document.querySelectorAll(".search-item");
    const input = document.querySelector(".search-input");
    if (input) {
      for (const element of elements) {
        const matches = element.innerHTML.match(
          new RegExp(" " + input.value, "ig")
        );
        if (matches) {
          for (const match of matches) {
            element.innerHTML = element.innerHTML.replaceAll(
              match,
              `<span class="search-item-highlight">${match}</span>`
            );
          }
        }
      }
    }
  }, [items]);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-50 overflow-y-scroll duration-200 ease-out"
      style={{
        background: "rgba(0,0,0,0.9)",
        transform: `scale(${open ? "1" : "0"})`,
      }}
    >
      <div className="w-auto h-full pt-24 px-20">
        <div>
          <input
            autoFocus={open}
            onInput={(e) => {
              onInput(e);
            }}
            placeholder="Search..."
            type="text"
            className="text-white outline-none block border-b-4 border-solid search-input w-full bg-transparent"
            style={{ fontSize: "5vw" }}
          />
          <button
            onClick={() => {
              const element = document.querySelector(".search-input");
              if (element) {
                element.value = "";
              }
              onClose();
            }}
            className="float-right mt-3 text-white bg-red-600 inline-flex items-center justify-center font-bold rounded-md align-text-bottom ease-in-out duration-300 hover:-translate-y-1 py-2 px-4 text-sm mr-3"
          >
            CLOSE
          </button>
        </div>

        {items.map((item) => (
          <Link key={item._id} href={item.href}>
            <a
              onClick={() => {
                const element = document.querySelector(".search-input");
                if (element) {
                  element.value = "";
                }
                onClose();
              }}
              className="block mt-1 bluish-color shadow-lg p-3 duration-300 ease-in-out search-item"
            >
              <h1 className="text-xl m-1">
                {item.title}{" "}
                <span className="text-lg text-gray-300">in {item.from}</span>
              </h1>
              <p className="text-gray-300 text-lg m-1 mt-2">
                {item.description}
              </p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
