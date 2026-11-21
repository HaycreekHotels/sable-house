"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

const BlackFridayPopup = dynamic(() => import("./BlackFridayPopup"), {
  ssr: false,
  loading: () => null,
});

const STORAGE_KEY = "sabal-house:black-friday:v1:last-shown";

const OPEN_DELAY_MS = 1500;

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

function localDayKey() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function wasShownToday() {
  const today = localDayKey();

  for (const storageName of ["localStorage", "sessionStorage"]) {
    try {
      if (window[storageName].getItem(STORAGE_KEY) === today) {
        return true;
      }
    } catch {
      // Storage might be unavailable.
    }
  }

  return false;
}

function rememberShown() {
  const today = localDayKey();

  try {
    window.localStorage.setItem(STORAGE_KEY, today);
    return;
  } catch {
    // Fall back to sessionStorage.
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, today);
  } catch {
    // Storage is unavailable.
  }
}

export default function HomeBlackFridayGate({ bedroomSrc }) {
  const [visible, setVisible] = useState(false);

  // Prevent reopening after dismissal during this page visit.
  const attemptedRef = useRef(false);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const handleShown = useCallback(() => {
    // Record only after the dialog opens successfully.
    if (!IS_DEVELOPMENT) {
      rememberShown();
    }
  }, []);

  useEffect(() => {
    const maybeShow = () => {
      if (document.visibilityState !== "visible") {
        return;
      }

      if (attemptedRef.current) {
        return;
      }

      // Enforce the daily limit in production.
      if (!IS_DEVELOPMENT && wasShownToday()) {
        return;
      }

      attemptedRef.current = true;
      setVisible(true);
    };

    const timer = window.setTimeout(maybeShow, OPEN_DELAY_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        maybeShow();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearTimeout(timer);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <BlackFridayPopup
      bedroomSrc={bedroomSrc}
      onDismiss={dismiss}
      onShown={handleShown}
    />
  );
}
