import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
    const data = {
        appName: 'Todo-Tracker',
    };
    return data;
};