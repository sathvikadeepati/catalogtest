const fs = require('fs');

function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points, k) {
    let c = 0;

    for (let i = 0; i < k; i++) {
        let x_i = points[i][0];
        let y_i = points[i][1];
        let term = y_i;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let x_j = points[j][0];
                term *= -x_j / (x_i - x_j);
            }
        }

        c += term;
    }

    return Math.round(c); 
}


function findSecretFromJson(filename) {
    // Read and parse the JSON input
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

    const n = data.keys.n; 
    const k = data.keys.k;     
    const points = Object.keys(data)
        .filter(key => key !== 'keys')
        .map(key => {
            const x = parseInt(key, 10); 
            const value = data[key].value;
            const y = decodeValue(base, value); 
            return [x, y];
        });

        points.sort((a, b) => a[0] - b[0]);

        const secret = lagrangeInterpolation(points.slice(0, k), k);

    return secret;
}

testcase1= prompt("Enter the JSON input:")
const secret1 = findSecretFromJson(testcase1);


console.log('Secret for Testcase 1:', secret1);
