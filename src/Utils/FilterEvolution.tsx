import {IevolutionTypes} from '../Types/EvolutionTypes';
import {Ihaystack} from '../Types/EvolutionTypes';

 const filterEvolutions = (needle:string, haystack:Ihaystack , found: IevolutionTypes[] = []) => {
    Object.keys(haystack).forEach((key:string) => {
        if (key === needle) {
        found.push(haystack[key]);
        }
        if (typeof haystack[key] === "object" && haystack[key] != null) {
            filterEvolutions(needle, haystack[key] as Ihaystack, found);
        }
    });
    return found;
};



export default filterEvolutions