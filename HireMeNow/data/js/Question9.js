const code = `
console.log([0, 1, 2].filter(num => {
    if (num) return;
}));

function test() {
    return 
    {
        message: "hello"
    };
}
console.log(test());
`;
export default code;
