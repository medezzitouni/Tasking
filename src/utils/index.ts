export const toCapital = (str: string = "") => str.charAt(0).toUpperCase() + str.slice(1);
export const truncut = (str: string = "") => str.slice(1, 20) + (str.length > 20 ? '...' : '');