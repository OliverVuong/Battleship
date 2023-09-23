console.log('hello world')

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

console.log(capitalize('hello world'))

export { 
    capitalize
};