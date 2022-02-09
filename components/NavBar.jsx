import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { appContext } from "../contexts/AppProvider";

export default function NavBar() {
  const router = useRouter();
  const [state, dispatch] = useContext(appContext);

  const toggleLanguage = () => {
    if (state.lang == "en") {
      dispatch({ type: "SET_STATE", payload: { lang: "mm" } });
    } else {
      dispatch({ type: "SET_STATE", payload: { lang: "en" } });
    }
    console.log(state.lang);
  };

  useEffect(() => {
    let elements = document.querySelectorAll(".lesson-card h1");
    if (elements) {
      if (state.lang == "mm") {
        for (const element of elements) {
          element.style.fontSize = "1.4rem";
        }
      } else {
        for (const element of elements) {
          element.style.fontSize = "1.5rem";
        }
      }
    }
    elements = document.querySelectorAll("p");
    if (elements) {
      if (state.lang == "mm") {
        for (const element of elements) {
          element.style.fontSize = "1.1rem";
        }
      } else {
        for (const element of elements) {
          element.style.fontSize = "1.25rem";
        }
      }
    }
    elements = document.querySelectorAll(".center-title");
    if (elements) {
      if (state.lang == "mm") {
        for (const element of elements) {
          element.style.fontSize = "3rem";
        }
      } else {
        for (const element of elements) {
          element.style.fontSize = "3.75rem";
        }
      }
    }
    elements = document.querySelectorAll(".sub-title");
    if (elements) {
      if (state.lang == "mm") {
        for (const element of elements) {
          element.style.fontSize = "1.3rem";
        }
      } else {
        for (const element of elements) {
          element.style.fontSize = "1.5rem";
        }
      }
    }
  }, [state.lang, router.route]);

  return (
    <nav className="sticky top-0 z-40 w-full bluish-color">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="font-bold text-xl">
              <Link href="/techhype" passHref>
                Techhype
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-10 text-lg">
              <Link href="/techhype" passHref>
                Home
              </Link>
            </div>
            <div className="mr-10 text-lg">
              <Link href="/techhype/learn" passHref>
                Learn
              </Link>
            </div>
            <div className="text-lg">
              <Link href="/techhype/blog" passHref>
                Blog
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="svg-inline--fa fk-search fk-w-16 fk-9x w-5 mr-6 cursor-pointer"
              >
                <g className="fk-group">
                  <path
                    fill="currentColor"
                    d="M208 80a128 128 0 1 1-90.51 37.49A127.15 127.15 0 0 1 208 80m0-80C93.12 0 0 93.12 0 208s93.12 208 208 208 208-93.12 208-208S322.88 0 208 0z"
                    className="fk-secondary"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M504.9 476.7L476.6 505a23.9 23.9 0 0 1-33.9 0L343 405.3a24 24 0 0 1-7-17V372l36-36h16.3a24 24 0 0 1 17 7l99.7 99.7a24.11 24.11 0 0 1-.1 34z"
                    className="fk-primary"
                  ></path>
                </g>
              </svg>
            </div>
            <div>
              <svg
                onClick={toggleLanguage}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
              >
                <path
                  d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM16.92 6H13.97C13.657 4.76146 13.1936 3.5659 12.59 2.44C14.4141 3.068 15.9512 4.33172 16.92 6ZM10 2.04C10.83 3.24 11.48 4.57 11.91 6H8.09C8.52 4.57 9.17 3.24 10 2.04ZM2.26 12C2.1 11.36 2 10.69 2 10C2 9.31 2.1 8.64 2.26 8H5.64C5.56 8.66 5.5 9.32 5.5 10C5.5 10.68 5.56 11.34 5.64 12H2.26ZM3.08 14H6.03C6.35 15.25 6.81 16.45 7.41 17.56C5.58397 16.9354 4.04583 15.6708 3.08 14V14ZM6.03 6H3.08C4.04583 4.32918 5.58397 3.06457 7.41 2.44C6.80643 3.5659 6.34298 4.76146 6.03 6V6ZM10 17.96C9.17 16.76 8.52 15.43 8.09 14H11.91C11.48 15.43 10.83 16.76 10 17.96ZM12.34 12H7.66C7.57 11.34 7.5 10.68 7.5 10C7.5 9.32 7.57 8.65 7.66 8H12.34C12.43 8.65 12.5 9.32 12.5 10C12.5 10.68 12.43 11.34 12.34 12ZM12.59 17.56C13.19 16.45 13.65 15.25 13.97 14H16.92C15.9512 15.6683 14.4141 16.932 12.59 17.56V17.56ZM14.36 12C14.44 11.34 14.5 10.68 14.5 10C14.5 9.32 14.44 8.66 14.36 8H17.74C17.9 8.64 18 9.31 18 10C18 10.69 17.9 11.36 17.74 12H14.36Z"
                  fill={state.lang === "en" ? "#fff" : "#4DBB92"}
                  className="ease-in-out duration-300"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
