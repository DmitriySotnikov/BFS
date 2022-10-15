const readline = require('readline').createInterface(process.stdin, process.stdout);

const matrix = [];
let n = 0;
let m = 0;

readline.on('line', (line) => {

    const lineArr = line.replace(/\s/g,'').split(""); // удаление пробелов

    if (!n && !m) {
        n = Number(lineArr[0]);
        m = Number(lineArr[1]);
        return
    } else {
        matrix.push(lineArr);
    }

    console.log(matrix)

    function findLand(arr) {

        let stack = [];

        let rows = arr.length, // координата - y
            cols = arr[0].length; // координата - x

        let isBindNodes = 0; // счетчик регионов

        let left; // участок слева
        let right; // участок справа

        let bottom; // участок внизу
        let up; // участок сверху

        let upLeft; // участок по диагонали-верх-лево
        let upRight; // участок диагонали-низ-лево

        let bottomLeft; // участок по диагонали-верх-лево
        let bottomRight; // участок диагонали-низ-лево

        let tempX = []; // переменная временнего результата вычисления координат региона
        let tempY = []; // тоже самое по др. оси

        let tempSquare = 0; // временый результат площади региона
        let tempRation = 0; // временый результат коэффициента плодородной земли региона

        let value

        function resultCalculation(arrX, arrY) {
            const valueX = arrX.sort((a,b)=>a-b);
            const valueY = arrY.sort((a,b)=>a-b);
            const goodLand = arrX.length;

            // Общее количество узлов
            const square = ((valueX[valueX.length-1] - valueX[0])+1) * ((valueY[valueY.length-1] - valueY[0])+1);
            console.log(`square`,square)

            // Эффективность
            const ratio = goodLand / square;
            return {ratio, square, goodLand}
        }

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (!arr[row][col] || arr[row][col] === ":)") continue;
                if (arr[row][col] === "1") {
                    console.log(`первый эл`, row, col)
                    stack.push([row, col]);
                    while (stack.length){

                        value = stack.pop();
                        console.log(`pop=`, value)

                        tempX.push(value[0]);
                        tempY.push(value[1]);

                        right = value[1] < cols-1 && arr[value[0]][value[1] + 1] === "1";
                        bottom = value[0] < rows-1  && arr[value[0] + 1][value[1]] === "1";
                        bottomLeft = value[0] < rows-1 && value[1] > 0 && arr[value[0] + 1][value[1] - 1] === "1";
                        bottomRight = value[0] < rows-1 && value[1] < cols-1 && arr[value[0] + 1][value[1] + 1] === "1";


                        // можно не проверять
                        left = value[1] > 0 && arr[value[0]][value[1] - 1] === "1";
                        up = value[0] > 0 && arr[value[0] - 1][value[1]] === "1";
                        upLeft = value[0] > 0 && value[1] > 0 && arr[value[0] - 1][value[1] - 1] === "1";
                        upRight = value[0] > 0 && value[1] < cols-1 && arr[value[0] - 1][value[1] + 1] === "1";

                        // узел прервался - пропускаем
                        if (!left && !right && !up && !bottom && !upLeft && !upRight && !bottomLeft && !bottomRight){
                            arr[value[0]][value[1]] = ":)";
                            console.log(`stack`,stack)
                            continue;
                        }

                        // поиск дочерних узлов
                        if (left){
                            // можно убрать
                            arr[value[0]][value[1] - 1] = ":)";
                            stack.push([value[0], value[1] - 1]);
                            console.log("лево")
                        }
                        if (right){
                            arr[value[0]][value[1] + 1] = ":)";
                            stack.push([value[0], value[1] + 1]);
                            console.log("право")
                        }
                        if (up){
                            // можно убрать
                            arr[value[0] - 1][value[1]] = ":)";
                            stack.push([value[0] - 1, value[1]]);
                            console.log("верх")
                        }
                        if (bottom){
                            arr[value[0] + 1][value[1]] = ":)";
                            stack.push([value[0] + 1, value[1]]);
                            console.log("низ")
                        }
                        if (upLeft){
                            //можно убрать
                            arr[value[0] - 1][value[1] - 1] = ":)";
                            stack.push([value[0] - 1, value[1] - 1]);
                            console.log("диаг. верх-лево")
                        }
                        if (upRight){
                            //можно убрать
                            arr[value[0] - 1][value[1] + 1] = ":)";
                            stack.push([value[0] - 1, value[1] + 1]);
                            console.log("диаг. верх-право")
                        }

                        if (bottomLeft){
                            arr[value[0] + 1][value[1] - 1] = ":)";
                            stack.push([value[0] + 1, value[1] - 1]);
                            console.log("диаг. низ-лево")
                        }
                        if (bottomRight){
                            arr[value[0] + 1][value[1] + 1] = ":)";
                            stack.push([value[0] + 1, value[1] + 1]);
                            console.log("диаг. низ-право")
                        }

                        // помечаем как проверенный
                        arr[value[0]][value[1]] = ":)";
                        console.log(`stack=`, stack)
                    }

                    const val =  resultCalculation(tempX, tempY);

                    if (val.square > 1 && val.ratio === tempRation && val.square > tempSquare) {
                        tempSquare = val.square
                        tempRation = val.ratio
                    }

                    if (val.square > 1 && val.ratio > tempRation) {
                        tempSquare = val.square
                        tempRation = val.ratio
                    }

                    tempX = [];
                    tempY = [];

                    // Количество участков
                    isBindNodes++
                }
            }
        }
        return console.log(tempSquare)
    }

    if (matrix.length !== m && matrix.length[0] !== n ) return;

    findLand(matrix)

    readline.close();

}).on('close', () => {
    process.exit(0)
});