import { useState } from "react";

export default function useLocalStorage(key: string) {
    const [value, setValue] = useState(localStorage.getItem(key));

    function saveValue(val: string) {
        localStorage.setItem(key, val);
        setValue(val);
    }

    return { value, saveValue };
}
