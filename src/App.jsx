import { useState, useEffect, useCallback } from "react";

function App() {
  const fruits = ["apple", "banana", "cherry", "date", "elderberry"];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debounceFilter = useCallback(
    (word) => {
      const result = fruits.filter((fruit) =>
        fruit.toLowerCase().includes(word.toLowerCase()),
      );

      setSearchResults(result);
    },
    [fruits],
  );

  useEffect(() => {
    let timer = setTimeout(() => {
      debounceFilter(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceFilter]);

  console.log("searchTerm", searchTerm);
  console.log("searchResults", searchResults);
  return (
    <>
      <input
        type="text"
        placeholder="Search fruits..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      {searchResults.map((fruit) => {
        return <>{fruit}</>;
      })}
    </>
  );
}

export default App;
