import { useMemo, useState } from "react";

interface Named {
  name: string;
}

export function useSearch<T extends Named>(items: T[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!items || !searchQuery.trim()) return items;

    const normalizedQuery = searchQuery.trim().toLowerCase();
    return items.filter((item) =>
      item.name.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [items, searchQuery]);

  return { onSearch: setSearchQuery, filteredItems };
}
