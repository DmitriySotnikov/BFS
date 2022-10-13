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

        let delItem

        let stackA = []; // Два стека для обработки и поиска связанных узлов в двумерном массиве
        let stackB = [];

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

        function resultCalculation(arrX, arrY) {
            const valueX = arrX.sort((a,b)=>a-b);
            const valueY = arrY.sort((a,b)=>a-b);
            const goodLand = arrX.length;

            // Общее количество узлов
            const square = ((valueX[valueX.length-1] - valueX[0])+1) * ((valueY[valueY.length-1] - valueY[0])+1);
            console.log(`square`,square)

            // Коофициент
            const ratio = goodLand / square;
            return {ratio, square, goodLand}
        }

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (!arr[row][col] || arr[row][col] === ":)") continue;
                if (arr[row][col] === "1") {
                    console.log(`первый эл`, row, col)
                    stackB.push([row, col]);
                    while (stackB.length){
                        stackB.forEach( (v, i, a) => {
                            tempX.push(v[0]);
                            tempY.push(v[1]);

                            left = v[1] > 0 && arr[v[0]][v[1] - 1] === "1";
                            right = v[1] < cols-1 && arr[v[0]][v[1] + 1] === "1";

                            bottom = v[0] < rows-1  && arr[v[0] + 1][v[1]] === "1";
                            up = v[0] > 0 && arr[v[0] - 1][v[1]] === "1";

                            upLeft = v[0] > 0 && v[1] > 0 && arr[v[0] - 1][v[1] - 1] === "1";
                            upRight = v[0] > 0 && v[1] < cols-1 && arr[v[0] - 1][v[1] + 1] === "1";

                            bottomLeft = v[0] < rows-1 && v[1] > 0 && arr[v[0] + 1][v[1] - 1] === "1";
                            bottomRight = v[0] < rows-1 && v[1] < cols-1 && arr[v[0] + 1][v[1] + 1] === "1";

                            console.log(`v`, v)
                            //if (v === ":)") return;

                            // узел прервался - выходим
                            if (!left && !right && !up && !bottom && !upLeft && !upRight && !bottomLeft && !bottomRight){
                                arr[v[0]][v[1]] = ":)";
                                delItem = a.splice(i, 1);
                                console.log(`delItem`,delItem)
                                console.log(`stackB`,stackB)
                                return;
                            }
                            // поиск дочерних узлов
                            if (left){
                                //arr[v[0]][v[1] - 1] = ":)";
                                if (!a.includes([v[0], v[1] - 1])){
                                    stackB.push([v[0], v[1] - 1]);
                                    console.log("лево")
                                } else console.log("уже содержит лево")
                            }
                            if (right){
                                //arr[v[0]][v[1] + 1] = ":)";
                                if (!a.includes([v[0], v[1] + 1])){
                                    stackB.push([v[0], v[1] + 1]);
                                    console.log("право")
                                } else console.log("уже содержит право")
                            }

                            if (up){
                                //arr[v[0] - 1][v[1]] = ":)";
                                stackB.push([v[0] - 1, v[1]]);
                                console.log("верх")
                            }
                            if (bottom){
                                //arr[v[0] + 1][v[1]] = ":)";
                                if (!a.includes([v[0] + 1, v[1]])){
                                    stackB.push([v[0] + 1, v[1]]);
                                    console.log("низ")
                                } else console.log("уже содержит низ")
                            }

                            if (upLeft){
                                //arr[v[0] - 1][v[1] - 1] = ":)";
                                stackB.push([v[0] - 1, v[1] - 1]);
                                console.log("диаг. верх-лево")
                            }
                            if (upRight){
                                //arr[v[0] - 1][v[1] + 1] = ":)";
                                stackB.push([v[0] - 1, v[1] + 1]);
                                console.log("диаг. верх-право")
                            }

                            if (bottomLeft){
                                //arr[v[0] + 1][v[1] - 1] = ":)";
                                if (!a.includes([v[0] + 1, v[1] - 1])){
                                    stackB.push([v[0] + 1, v[1] - 1]);
                                    console.log("диаг. низ-лево")
                                } else console.log("уже содержит диаг. низ-лево")
                            }
                            if (bottomRight){
                                //arr[v[0] + 1][v[1] + 1] = ":)";
                                if (!a.includes([v[0] + 1, v[1] + 1])){
                                    stackB.push([v[0] + 1, v[1] + 1]);
                                    console.log("диаг. низ-право")
                                } else console.log("уже содержит диаг. низ-право")
                            }
                            // помечаем как проверенный
                            arr[v[0]][v[1]] = ":)";
                            // удаляем уже пройденный узел
                            a.splice(i, 1);
                        });
                        console.log(`stackB`, stackB)
                        //stackA = [];
                        //stackA.push(...stackB);
                        //stackB = [];
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