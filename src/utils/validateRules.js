export default {
    isRequired: (data) => Boolean(data.trim()),
    isEmail: (data) => /^\S+@\S+\.\S+$/g.test(data),
    isCapitalSymbol: (data) => /[A-Z]+/g.test(data),
    isContainDigit: (data) => /\d+/g.test(data),
    min: (data, config) => data.length < config.length
};
