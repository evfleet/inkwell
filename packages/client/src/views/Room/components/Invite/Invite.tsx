import { useState } from "react";

import styles from "./Invite.module.css";

type InviteProps = {
  code: string;
};

export function Invite({ code }: InviteProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopyClick() {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch (err) {
      console.log("err copying", err);
    }
  }

  function handleMouseLeave() {
    if (isCopied) {
      setIsCopied(false);
    }
  }

  return (
    <div className={styles.container} onMouseLeave={handleMouseLeave}>
      <div className={styles.invite}>
        <div className={styles.cover}>Hover to see code</div>
        <p className={styles.code}>{code}</p>
      </div>

      <button onClick={handleCopyClick}>{isCopied ? "Copied" : "Copy"}</button>
    </div>
  );
}
