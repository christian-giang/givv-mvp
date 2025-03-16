"use client"
import styles from "@/styles/page.module.css"; // Use an absolute path
import { useState } from "react";
import PromptForm from "../../components/PromptForm";
import Image from "next/image"; // Import Image component from next/image

export default function Receiver() {
  const [choices, setChoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <Image src="/logo.png" alt="Logo" width={100} height={100} className={styles.logo} /> {/* Add a CSS class */}
        <PromptForm
          isLoading={isLoading}
          onSubmit={async (tags, negativeTags) => {
            setIsLoading(true);
            const response = await fetch("/api/chat-gpt", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                whiteListprompt: tags.join(", "), // Join tags into a single string
                blackListPrompt: negativeTags.join(", "), // Join negative tags into a single string
              }),
            });

            setIsLoading(false);
            const result = await response.json();
            setChoices(result.choices);
          }}
        />
        {choices.map((choice) => {
          console.log(choice);
          return (
            <p className={styles.response} key={choice.index}>
              {choice.message.content}
            </p>
          );
        })}
      </div>
    </main>
  );
}
