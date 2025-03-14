import { useState } from "react";
import styles from "./PromptForm.module.css";

export default function PromptForm({onSubmit, isLoading}) {

    const [prompt, setPrompt] = useState("");

    return (
        <form 
        className={styles.form} 
        onSubmit={(e) => {
            e.preventDefault();
            // Fire callback
            if(prompt==="") return;
            onSubmit(prompt);
            setPrompt("");

        }}>
            <label>
                Enter the question:
                <input className={styles.input} type="text" value={prompt} onChange={e => {
                    setPrompt(e.target.value);
                }}/>
            </label>
            <input className={styles.submitButton} type="submit" disabled={isLoading}/>
        </form>
    );
}