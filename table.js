const outputSection = document.querySelector(".output-section");
const submitButton = document.getElementById("submit-input");
const formInputs = document.querySelectorAll(".form-input");

let table;

formInputs.forEach(input => {
    input.addEventListener("blur", () => {
        input.value = input.value.replace(/^0+(?=\d)/, "");
    })
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let rows = document.getElementById("row-number").value;
    let columns = document.getElementById("column-number").value;
    if (rows > 20 || columns > 20) { return alert("Maximum # of rows/columns can't exceed 20!"); }
    let result = rows * columns;
    if (!outputSection.contains(table)) {
        createTable(rows, columns);
    } else {
        outputSection.removeChild(table);
        createTable(rows, columns);
    }
    if (rows >= 11 || columns >= 11) {
        let div = parseInt(rows) > parseInt(columns) ? rows : columns;
        let diff = div - 10;
        let size = diff % 2 == 0 ? (55 - ((div / 2) * 2.5)) : (55 - (parseInt((div / 2) + 1) * 2.5));
        let tableDataElements = document.getElementsByTagName("td");
        for (i = 0; i < tableDataElements.length; i++) {
            tableDataElements[i].style.cssText = "height: " + size + "px; width: " + size + "px;";
        }
    }
    fillTable(result);
})

function createTable(rows, columns) {
    table = document.createElement("table");
    for (i = 0; i < rows; i++) {
        let tableRow = document.createElement("tr");
        for (j = 0; j < columns; j++) {
            let tableData = document.createElement("td");
            tableRow.append(tableData);
        }
        table.append(tableRow);
    }
    outputSection.append(table);
}

function fillTable(res) {
    const tableRows = document.querySelectorAll("tr");
    let invertAdd = 0;
    let rowsOrCols = 0;

    let lowerRowsFilled = 0;
    let upperRowsFilled = 0;

    let leftColumnsFilled = 0;
    let rightColumnsFilled = 0;

    let num = 1;

    while (num <= res) {
        if (invertAdd == 0) {
            if (rowsOrCols == 0 && num <= res) {
                let i = (tableRows.length - 1) - lowerRowsFilled;
                for (j = (tableRows[i].children.length - 1) - rightColumnsFilled; j >= leftColumnsFilled; j--) {
                    tableRows[i].children[j].innerHTML = num;
                    num++;
                }
                rowsOrCols = 1;
                lowerRowsFilled++;
            }
            if (rowsOrCols == 1 && num <= res) {
                for (i = (tableRows.length - 1) - lowerRowsFilled; i >= upperRowsFilled; i--) {
                    tableRows[i].children[leftColumnsFilled].innerHTML = num;
                    num++;
                }
                invertAdd = 1;
                rowsOrCols = 0;
                leftColumnsFilled++;
            }
        }

        if (invertAdd == 1) {
            if (rowsOrCols == 0 && num <= res) {
                let i = upperRowsFilled;
                for (j = leftColumnsFilled; j <= (tableRows[i].children.length - 1) - rightColumnsFilled; j++) {
                    tableRows[i].children[j].innerHTML = num;
                    num++;
                }
                rowsOrCols = 1;
                upperRowsFilled++;
            }
            if (rowsOrCols == 1 && num <= res) {
                for (i = upperRowsFilled; i <= (tableRows.length - 1) - lowerRowsFilled; i++) {
                    tableRows[i].children[(tableRows[i].children.length - 1) - rightColumnsFilled].innerHTML = num;
                    num++;
                }
                invertAdd = 0;
                rowsOrCols = 0;
                rightColumnsFilled++;
            }
        }
    }
}
