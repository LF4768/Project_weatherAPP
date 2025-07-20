import "./styles.css";

const table = document.querySelector(".data");
const loader = document.getElementById("loader");

// // fetch(
// //     "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/los%20angeles?unitGroup=us&key=UCQ9GSXYAVBEVXS7NQQ6VXZQ8&contentType=json",
// //     { mode: "cors" }
// // )
// //     .then((value) => {
// //         return value.json();
// //     })
// //     .then((value) => {
// //         console.log(value.currentConditions);
// //     });

async function weatherInfo(value = "london") {
    table.textContent = " ";
    if (table.classList.contains("error")) {
        table.className = "data";
    }
    loader.style.display = "block";
    let reqValue = value.replaceAll(" ", "%20");
    try {
        const obj = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${reqValue}?unitGroup=us&elements=datetime%2CdatetimeEpoch%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Cdew%2Cconditions%2Cicon&key=UCQ9GSXYAVBEVXS7NQQ6VXZQ8&contentType=json`,
            { mode: "cors" }
        );

        const jsonValue = await obj.json();
        console.log(jsonValue);
        const future = await jsonValue.days;
        let tableRow = document.createElement("tr");
        let header = document.createElement("thead");
        for (let i = 0; i < 9; i++) {
            let tableHeader = document.createElement("th");
            tableHeader.textContent = Object.keys(future[0])[i];
            tableRow.className = "header";
            tableRow.appendChild(tableHeader);
        }

        header.appendChild(tableRow);
        table.appendChild(header);

        future.forEach((value) => {
            let tableDataRow = document.createElement("tr");
            for (let i = 0; i < 8; i++) {
                let tableData = document.createElement("td");
                tableData.textContent = Object.values(value)[i];
                tableDataRow.appendChild(tableData);
            }
            let icon = document.createElement("img");
            import(
                `./../images/1st Set - Color/${Object.values(value)[8]}.png`
            ).then((result) => {
                icon.src = result.default;
            });
            tableDataRow.appendChild(icon);
            table.appendChild(tableDataRow);
        });
    } catch {
        table.textContent =
            "We couldn't process your request. Please check that the name of the city is correct and try again";
        table.classList.add("error");
    } finally {
        loader.style.display = "none";
    }
}

weatherInfo();

const btn = document.querySelector(".location-btn");
const dialog = document.querySelector("dialog");
btn.addEventListener("click", () => dialog.showModal());

const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", (e) => {
    const value = document.getElementById("location").value;
    e.preventDefault();
    weatherInfo(value);
    dialog.close();
});

import("./../images/1st Set - Color/clear-day.png").then((result) => {
    console.log(result);
});
