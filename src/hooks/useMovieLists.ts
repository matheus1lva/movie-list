import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

export type List = {
    id: string;
    name: string;
    tags: string;
};

export function useMovieLists() {
    let { value: listsString, saveValue } = useLocalStorage("myLists");

    let myLists: List[] = [];
    if (listsString) {
        myLists = JSON.parse(listsString);
    }

    function addList(initialData: Partial<List> = {}) {
        const newList: List = {
            id: uuidv4(),
            name: "New List",
            tags: "",
            ...initialData,
        };
        const updatedLists = [...myLists, newList];
        saveValue(JSON.stringify(updatedLists));
        return newList.id;
    }

    function removeList(id: string) {
        updateLists(myLists.filter((list) => list.id !== id));
    }

    function updateLists(lists: List[]) {
        saveValue(JSON.stringify(lists));
    }

    return { lists: myLists, addList, updateLists, removeList };
}
