document.getElementById("btn").addEventListener("click", async function() {
    let x = document.getElementById("cInput").value.trim();

    let y = document.getElementById("cStuff");
    let z = document.getElementById("bStuff");

    if (x == "") {
        y.innerHTML = "<p>uhh... write a country maybe?</p>";
        return;
    }

    try {
        let r = await fetch("https://restcountries.com/v3.1/name/" + x);
        if (!r.ok) throw new Error("rip, not found");
        let d = await r.json();
        let c = d[0];

        y.innerHTML = `
            <h2>${c.name.common}</h2>
            <p><b>Capital:</b> ${c.capital ? c.capital[0] : "idk"}</p>
            <p><b>Population:</b> ${c.population.toLocaleString()}</p>
            <p><b>Region:</b> ${c.region}</p>
            <img src="${c.flags.svg}" alt="flag lol">
        `;

        if (c.borders) {
            let br = await fetch("https://restcountries.com/v3.1/alpha?codes=" + c.borders.join(","));
            let bd = await br.json();

            z.innerHTML = "<h3>buddies:</h3>";
            for (let i = 0; i < bd.length; i++) {
                z.innerHTML += `
                    <p>${bd[i].name.common}</p>
                    <img src="${bd[i].flags.svg}" alt="some flag">
                `;
            }
        } else {
            z.innerHTML = "<p>no friends :(</p>";
        }
    } catch (err) {
        y.innerHTML = "<p>oops: " + err.message + "</p>";
        z.innerHTML = "";
    }
});

