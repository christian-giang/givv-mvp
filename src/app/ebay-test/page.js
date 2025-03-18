"use client"; // Ensure this is at the top

import { useState } from "react";
import styles from "@/styles/page.module.css"; // Use an absolute path
import { useRouter } from "next/navigation"; // Correct import

export default function EbayTest() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter(); // Now it works!

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      console.error('Search query is empty');
      return;
    }
    const response = await fetch(`http://localhost:3001/api/buy/browse/v1/item_summary/search?q=${searchQuery}&limit=3`);
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return;
    }
    const data = await response.json();
    setResults(data.itemSummaries || []);
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1>Ebay Test</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for items"
          />
          <button type="submit">Search</button>
        </form>
        <div>
          {results.map((item) => (
            <div key={item.itemId}>
              <h2>{item.title}</h2>
              <p>{item.price.value} {item.price.currency}</p>
              {item.image && <img src={item.image.imageUrl} alt={item.title} />}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
