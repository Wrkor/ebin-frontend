import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { rootActions } from '../store/root.slice'

export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => 
        bindActionCreators(rootActions, dispatch), 
    [dispatch])
}

export default useActions;