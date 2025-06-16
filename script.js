// const api = "http://api.weatherapi.com/v1/";
const api = "https://api.weatherapi.com/v1/"; // https for live

let sendData = {
    key: "c2959057eb4240fc8cb41210251506",
    q: "152.56.153.129"
    // q: "Paris"
};

async function currentWeather() {
    try {
        const query = new URLSearchParams(sendData);
        const response = await fetch(`${api}current.json?${query}`);
        
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log('json > ', json);
        showLocation(json.location);
        showInformation(json.location);
        return json;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}    

const result = currentWeather();
console.log('result > ', result);

function showLocation(obj) {
    const location = document.getElementById("weather-location");
    let html = `${obj.name} Weather Forecast <span class="text-secondary">${obj.region}, ${obj.country}</span>`;
    location.innerHTML = html;
}

function showInformation(obj) {
    const information = {
        "Country": obj.country,
        "Region": obj.region,
        "Lat/Lon": `${obj.lat}, ${obj.lon}`,
        "Current time": obj.localtime,
        "Time Zone ID": obj.tz_id,
        "Time Zone": obj.country,
        "Sunrise": obj.country,
        "Sunset": obj.country,
    }

    let html = "";
    for(const k in information) {
        html += `<tr>
                    <td>${k}:</td>
                    <td><span>${((information[k] != null && information[k] != "") ? information[k] : "-------")}</span></td>
                </tr>`
    }

    const infoTemplate = document.getElementById('information-details');
    infoTemplate.innerHTML = html;

}
