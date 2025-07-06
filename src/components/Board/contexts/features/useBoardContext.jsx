import { use } from "react";
import BoardContext from "../BoardContext";



export const useBoardContext = () => {
    return use(BoardContext);
};