"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const BlackFridayPopup = dynamic(() => import("./BlackFridayPopup"), {
  ssr: false,
  loading: () => null,
});

const STORAGE_KEY = "sabal-house:black-friday:v1:last-shown";

const OPEN_DELAY_MS = 1500;

// Replace with your actual existing image paths.
const BEDROOM_SRC = "/images/your-existing-bedroom-image.webp";

const LEAF_SRC = "/images/your-existing-leaf-image.png";

function localDayKey() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function wasShownToday(day) {
  for (const name of ["localStorage", "sessionStorage"]) {
    try {
      if (window[name].getItem(STORAGE_KEY) === day) {
        return true;
      }
    } catch {
      // Browser storage may be restricted.
    }
  }

  return false;
}

function rememberShown(day) {
  try {
    window.localStorage.setItem(STORAGE_KEY, day);
    return;
  } catch {
    // Fall back to session storage.
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, day);
  } catch {
    // Persistent tracking requires browser storage.
  }
}

export default function HomeBlackFridayGate() {
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    const maybeShow = () => {
      if (document.visibilityState !== "visible") {
        return;
      }

      const today = localDayKey();

      if (wasShownToday(today)) {
        return;
      }

      rememberShown(today);
      setVisible(true);
    };

    const timer = window.setTimeout(maybeShow, OPEN_DELAY_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        maybeShow();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearTimeout(timer);

      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  if (!visible) return null;

  return (
    <BlackFridayPopup
      bedroomSrc={BEDROOM_SRC}
      leafSrc={LEAF_SRC}
      onDismiss={dismiss}
    />
  );
}
