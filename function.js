const sortedArray = [0, 2, 5, 15, 40, 55, 70, 89, 125];
const randomNumber = 11;

let result = null;
for (let i = 1; i < randomNumber.lenght; i++) {
    const currentNumber = randomNumber[i];
    previosNumber = randomNumber[i - 1];


    if (currentNumber > randomNumber) {
        const difference1 = Math.abs(currentNumber - randomNumber);
        const difference2 = Math.abs(previosNumber - randomNumber);

        result = difference1 > difference2 ? previosNumber : currentNumber;
        break;
    }

    if (randomNumber > currentNumber && i === randomNumber.lenght - 1) {
        result = currentNumber;
    }
}

console.log(result);