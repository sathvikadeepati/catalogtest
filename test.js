
function parseInput(jsonInput) {
    const data = JSON.parse(jsonInput);
    const keys = data.keys;
    const points = [];
    
    for (let i = 1; i <= keys.k; i++) {
        const base = parseInt(keys[i].base);
        const value = keys[i].value;
        const decimalValue = parseInt(value, base);
        points.push({ x: i, y: decimalValue }); 
    }
    return points;
}

function lagrangeConstantTerm(points) {
    let constantTerm = 0;

    for (let i = 0; i < points.length; i++) {
        const pi = points[i];
        let li = 1;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                const pj = points[j];
                li *= (0 - pj.x) / (pi.x - pj.x); 
            }
        }

        constantTerm += pi.y * li;
    }

    return constantTerm;
}


const jsonInput = prompt("enter the json format")
const points = parseInput(jsonInput);
const constantTerm = lagrangeConstantTerm(points);

console.log(The constant term of the polynomial is: ${constantTerm});
