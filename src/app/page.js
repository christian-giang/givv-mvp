// filepath: /home/chris/givv/givv-mvp/src/app/index.js
"use client"; // Ensure this is at the top

import styles from "@/styles/page.module.css"; // Use an absolute path
import { useRouter } from "next/navigation"; // Correct import

export default function Page() {
  const router = useRouter(); // Now it works!

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1>Welcome to Givv MVP</h1>
        <button onClick={() => router.push("/receiver")}>
          Receiver profile
        </button>
        <button onClick={() => router.push("/ebay-test")}>
          Ebay Test
        </button>
      </div>
    </main>
  );
}
