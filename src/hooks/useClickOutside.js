import { useEffect, useRef } from "react";

function useClickOutside(handler, listenCapturing) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return function () {
        document.removeEventListener("click", handleClick, listenCapturing);
      };
    },
    [handler, listenCapturing]
  );

  return ref;
}

export { useClickOutside };
