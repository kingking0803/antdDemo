const getLocalStorageByKey = (key) => {
    return localStorage.getItem(key);
}

const getLocalStorageTableColWidthByKey = (key, colame) => {
    return JSON.parse(localStorage.getItem(key))[colame];
}

const setLocalStorageTableColWidth = (key, json) => {
    localStorage.setItem(key, JSON.stringify(json));
}

export { getLocalStorageByKey, getLocalStorageTableColWidthByKey, setLocalStorageTableColWidth };