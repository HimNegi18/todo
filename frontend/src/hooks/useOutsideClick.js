import { useEffect } from "react";

export default function useOutsideClick(ref, handle) {
  useEffect(() => {
    function listner(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handle();
    }
    document.addEventListener("mousedown", listner);
    document.addEventListener("touchstart", listner);
    return () => {
      document.removeEventListener("mousedown", listner);
      document.removeEventListener("touchstart", listner);
    };
  }, [ref]);
}
