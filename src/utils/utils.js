export function setReq(item, value){
    localStorage.setItem(item, JSON.stringify(value));
}

export function getReq(item){
    return JSON.parse(localStorage.getItem(item));
}