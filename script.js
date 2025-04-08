document.getElementById("btn").addEventListener("click", async function() {
    let x = document.getElementById("cInput").value.trim();

    let y = document.getElementById("cStuff");
    let z = document.getElementById("bStuff");

    if (x == "") {
        y.innerHTML = "<p>Please enter a country name.</p>";
        return;
    }

    try {
        let r = await fetch("https://restcountries.com/v3.1/name/" + x);
        if (!r.ok) throw new Error("Country not found");
        let d = await r.json();
        let c = d[0];

        y.innerHTML = `
            <h2>${c.name.common}</h2>
            <p><b>Capital:</b> ${c.capital ? c.capital[0] : "N/A"}</p>
            <p><b>Population:</b> ${c.population.toLocaleString()}</p>
            <p><b>Region:</b> ${c.region}</p>
            <img src="${c.flags.svg}" alt="Flag of ${c.name.common}">
        `;

        if (c.borders) {
            let br = await fetch("https://restcountries.com/v3.1/alpha?codes=" + c.borders.join(","));
            let bd = await br.json();

            z.innerHTML = "<h3>Bordering Countries:</h3>";
            for (let i = 0; i < bd.length; i++) {
                z.innerHTML += `
                    <p>${bd[i].name.common}</p>
                    <img src="${bd[i].flags.svg}" alt="Flag of ${bd[i].name.common}">
                `;
            }
        } else {
            z.innerHTML = "<p>No bordering countries.(</p>";
        }
    } catch (err) {
        y.innerHTML = "<p>"err.message"</p>";
        z.innerHTML = "";
    }
});

