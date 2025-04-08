
document.getElementById("searchButton").addEventListener("click", async function() {
    const countryName = document.getElementById("countryInput").value.trim();
    
    const countryInfoSection = document.getElementById("country-info");
    
    
    const borderingCountriesSection = document.getElementById("bordering-countries");

    if (!countryName) {
        countryInfoSection.innerHTML = "<p>Please enter a country name.</p>";
        return;
    }try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) throw new Error("Country not found");
         const data = await response.json();
        const country = data[0];  
        countryInfoSection.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
        `;

        
        if (country.borders) {
            const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`);
            
            const borderData = await borderResponse.json();

            borderingCountriesSection.innerHTML = "<h3>Bordering Countries:</h3>";
            borderData.forEach(borderCountry => {
                borderingCountriesSection.innerHTML += `
                    <p>${borderCountry.name.common}</p>
                    <img src="${borderCountry.flags.svg}" alt="Flag of ${borderCountry.name.common}">
                `;
            });
        } else {
            borderingCountriesSection.innerHTML = "<p>No bordering countries.</p>";
        }
    } catch (error) {
        countryInfoSection.innerHTML = `<p>Error: ${error.message}</p>`;
        borderingCountriesSection.innerHTML = "";
    }
});
