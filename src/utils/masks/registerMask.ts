export function registerMask(value: string){
    return value
        .replace(/[^a-zA-Z]/g, (match, offset) => offset < 6 ? '' : match)
        .replace(/[^0-9]/g, (match, offset) => offset < 6 ? match : '')
        .slice(0, 8);
}