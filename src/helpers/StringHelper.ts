const replaceString = (
    match: string,
    valueReplace: string,
    string: string
): string | undefined => {
    if (string.length) return string.replace(match, valueReplace)
    return undefined
}

const replaceLastChar = (str:string, char: string, match?: string):string => {
    if(str[str.length - 1] === (match ? match : char)) return str;
    return `${str}${char}`;
}
 
const replaceBars = (str: string): string => {
    return str.replace('/', `//\\`);
}

export { replaceString, replaceLastChar, replaceBars };


