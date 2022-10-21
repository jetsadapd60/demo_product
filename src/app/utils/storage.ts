export function setStoreage(name: string,value: any) {
    localStorage.setItem(name, value.toString());
}

export function getStoreage(name: string) {
    return localStorage.getItem(name);
}

export function clearStorage() {
    localStorage.clear();
}

