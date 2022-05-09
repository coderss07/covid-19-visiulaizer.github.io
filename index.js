function updateMap() {
    Promise.all([
        fetch("https://api.rootnet.in/covid19-in/stats/latest").then((res1) => res1.json()),
        fetch("data.json").then((res2) => res2.json())
    ])
    .then(([resp1, resp2]) => {
        // console.log(resp1.data.regional)
        // console.log(resp2.data)

        const obj1 = resp1.data.regional;
        const obj2 = resp2.data;

        for(let i = 0; i < 36; i++) {
            latitude = obj2[i].latitude;
            longitude = obj2[i].longitude;

            var ele = `<div class="location">
                    <h2>${obj1[i].loc}</h2>
                    <hr class="underline">
                    <div class="content"><h4>Confirmed Cases:</h4> <div>${obj1[i].totalConfirmed}</div> </div>
                    <div class="content"><h4>Active Cases:</h4> <div>${obj1[i].totalConfirmed - obj1[i].discharged}</div> </div>
                    <div class="content"><h4>Deaths:</h4> <div>${obj1[i].deaths}</div> </div>
                    <div class="content"><h4>Total Recovered:</h4> <div>${obj1[i].discharged}</div> </div>
                </div>`

            const el = document.createElement('div');
            el.id = 'marker';

            new mapboxgl.Marker(el)
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup({offset:[28, 0]}).setHTML(ele))
            .addTo(map);
        }
        var obj = resp1.data.summary;
        var ele = `<i class="fa-solid fa-circle-info btn"></i>
            <div class="sub-info" id="total-cases">
                <h2>Total Cases in India</h2>
                <div class="total-con"><h4>Confirmed Cases: </h4> <div>${obj.confirmedCasesIndian}</div> </div>
                <div class="total-con"><h4>Active Cases: </h4> <div>${obj.confirmedCasesIndian - obj.discharged}</div> </div>
                <div class="total-con"><h4>Deaths: </h4> <div>${obj.deaths}</div> </div>
                <div class="total-con"><h4>Total Recovered: </h4> <div>${obj.discharged}</div> </div>
            </div>`
 
        document.querySelector('#india-total').innerHTML = ele;

        obj = resp1.data;
        ele = `<i class="fa-solid fa-square-info btn"></i>
            <div class="sub-info" id="about">
                <h2>About Project</h2>
                <div class="total-con"><h4>Api Source: </h4> <div> <a href="https://www.covid19india.org/" target="_blank">covid19india.org</a></div> </div>
                <div class="total-con"><h4>Last refreshed: </h4> <div>${resp1.lastRefreshed.substring(0, 10)}</div> </div>
                <div class="total-con"><h4>Map source: </h4> <div> MapBox</div> </div>
                <div class="total-con"><h4>Developed By: </h4> <div> Sarthak Sharma</div> </div>
            </div>`

        document.querySelector('#info').innerHTML = ele;

    })
} 

updateMap()