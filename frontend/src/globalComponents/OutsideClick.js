import React, { useRef, useEffect } from "react";

function useOutsideClicker(ref, handleClose) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, handleClose]);
}

export default function OutsideClick({ children, handleClose }) {
    const wrapperRef = useRef(null);
    useOutsideClicker(wrapperRef, handleClose);

    return <div ref={wrapperRef}>{children}</div>;
}
