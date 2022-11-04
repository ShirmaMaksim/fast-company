export function convertObjToArr(options, ...rest) {
    const [key1, key2, key3] = rest;
    const optionsArray = !Array.isArray(options) && typeof options === "object"
        ? Object.keys(options).map(optionName => ({ [key1]: options[optionName].name, [key2]: options[optionName]._id, [key3]: options[optionName][key3] }))
        : options;
    return optionsArray;
};
