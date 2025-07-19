import "./styles.css";

const table = document.querySelector(".data");
const loader = document.getElementById("loader");

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
    table.textContent = " ";
    loader.style.display = "block";
    let reqValue = value.replaceAll(" ", "%20");
    try {
        const obj = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${reqValue}?unitGroup=us&key=UCQ9GSXYAVBEVXS7NQQ6VXZQ8&contentType=json`,
            { mode: "cors" }
        );

        const jsonValue = await obj.json();
        const future = await jsonValue.days;
        let tableRow = document.createElement("tr");
        let header = document.createElement("thead");
        for (let i = 0; i < 10; i++) {
            let tableHeader = document.createElement("th");
            tableHeader.textContent = Object.keys(future[0])[i];
            tableRow.className = "header";
            tableRow.appendChild(tableHeader);
        }

        header.appendChild(tableRow);
        table.appendChild(header);

        future.forEach((value) => {
            let tableDataRow = document.createElement("tr");
            for (let i = 0; i < 10; i++) {
                let tableData = document.createElement("td");
                tableData.textContent = Object.values(value)[i];
                tableDataRow.appendChild(tableData);
            }
            table.appendChild(tableDataRow);
        });
    } catch {
        table.textContent =
            "We couldn't process your request. Please check that the name of the city is correct and try again";
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
