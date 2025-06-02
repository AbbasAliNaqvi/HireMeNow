const code = `
console.log([1,2].map(num=>{
    if(num>0) return;
    return num*2;
}))

function abc(){
    return ;
}
console.log(abc());
`;
export default code;