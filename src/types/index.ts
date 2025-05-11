declare global {
    interface Window {
        getScreenDetails: () => Promise;
    }
}
