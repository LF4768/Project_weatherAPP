import "./styles.css";

const table = document.querySelector(".data");

// fetch(
//     "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/los%20angeles?unitGroup=us&key=UCQ9GSXYAVBEVXS7NQQ6VXZQ8&contentType=json",
//     { mode: "cors" }
// )
//     .then((value) => {
//         return value.json();
//     })
//     .then((value) => {
//         console.log(value.currentConditions);
//     });

async function weatherInfo(value = "london") {
    let reqValue = value.replaceAll(" ", "%20");
    const obj = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${reqValue}?unitGroup=us&key=UCQ9GSXYAVBEVXS7NQQ6VXZQ8&contentType=json`,
        { mode: "cors" }
    );
    const jsonValue = await obj.json();
    console.log(jsonValue);
    const future = await jsonValue.days;
    let tableRow = document.createElement("tr");
    for (let i = 0; i < 10; i++) {
        let tableHeader = document.createElement("th");
        tableHeader.textContent = Object.keys(future[0])[i];
        tableRow.appendChild(tableHeader);
    }
    table.appendChild(tableRow);

    future.forEach((value) => {
        let tableDataRow = document.createElement("tr");
        for (let i = 0; i < 10; i++) {
            let tableData = document.createElement("td");
            tableData.textContent = Object.values(value)[i];
            tableDataRow.appendChild(tableData);
        }
        table.appendChild(tableDataRow);
    });
}

weatherInfo();
