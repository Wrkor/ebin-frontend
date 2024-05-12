import { useSelector } from "react-redux"

export const useApps = () => {
    const apps = useSelector(state => state.app.apps)

    return apps;
}