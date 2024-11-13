export function removeSelectegGirl(array, girl) {
    if (array.contains(girl)) {
        const index = array.indexOf(girl);
        array.splice((index, 1));
    }
    return array;
}