import { useContext, useState } from "react";
import { appContext } from "../contexts/AppProvider";
import rest from "../utils/rest";
import NavBar from "./NavBar";
import Search from "./Search";

export default function Layout({ children }) {
  const [state, dispatch] = useContext(appContext);
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    if (e.target.value) {
      const [res, err] = await rest.get("/query", {
        search: e.target.value,
      });
      if (!err) {
        setResults(res.data.data);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <Search
        open={state.search_modal}
        onClose={() => {
          setResults([]);
          dispatch({ type: "SET_STATE", payload: { search_modal: false } });
        }}
        onInput={handleSearch}
        items={results}
      />
      {children}
    </div>
  );
}
