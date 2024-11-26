import { ChangeEvent, Key, ReactNode, useRef, useState } from "react";

interface SearchableListProps<T> {
  items: T[];
  children: (item: T) => ReactNode;
  itemKeyFn: (item: T) => Key;
}

const SearchableList = <T,>({ items, itemKeyFn, children }: SearchableListProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const lastChange = useRef<number | null>(null);

  const searchResult = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(e.target.value);
    }, 500);
  };

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResult.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchableList;
