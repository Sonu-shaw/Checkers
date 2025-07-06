import { use } from "react";
import CellContext from "../CellContext";

export const useCellContext = () => {
    return use(CellContext);
};