const input = [
    10,
    { a: 20, b: 30, nestedObj: { x: 5, y: 6 } },
    [1, [2, 3], { z: 4 }],
    "string",
    { name: "John", age: 25 }
];



function  deepFlattenAndExtract(input){
    output=[]
    input.forEach((e=>{
    if(typeof e === 'number'){
        output.push(e)
    }
   else if(Array.isArray(e)){
    output = output.concat(deepFlattenAndExtract(e));
   }
   else if(typeof e==='object'){
    output = output.concat(deepFlattenAndExtract(e));

   }

 }));
 console.log(output)
}





deepFlattenAndExtract(input)
