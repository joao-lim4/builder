/**
 * @name replaceString
 * @description String.replace do javascript kkkkk não lembro por qual motivo eu fiz isso
 * 
 * @param match string
 * @param valueReplace string 
 * @param string string
 * @returns string
 */
const replaceString = (
    match: string,
    valueReplace: string,
    string: string
): string | undefined => {
    if (string.length) return string.replace(match, valueReplace)
    return undefined
}

/**
 * 
 * @name replaceLastChar
 * @description troca o ultimo caractere de um string pelo caractere passado.
 * exemplo str='projects/data' char='/' macth='/' return='projects/data/';
 * 
 * @param str string
 * @param char string
 * @param match string
 * @returns string
 */
const replaceLastChar = (str:string, char: string, match?: string):string => {
    if(str[str.length - 1] === (match ? match : char)) return str;
    return `${str}${char}`;
}
 
/**
 * @name replaceBars
 * @description troca todas as / de uma string por //\\
 * 
 * @param str string
 * @returns string
 */
const replaceBars = (str: string): string => {
    return str.replace('/', `//\\`);
}

export { replaceString, replaceLastChar, replaceBars };


