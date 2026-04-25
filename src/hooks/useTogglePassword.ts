"use client"
import { useState } from "react";

export function useTogglePassword() {
  const [show, setShow] = useState(false);

  const toggle = () => setShow((prev) => !prev);

  return {
    show,
    toggle,
    inputType: show ? "text" : "password",
  };
}
