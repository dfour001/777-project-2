function start_map(apiKey) {
    require([
        "esri/config",
        "esri/Map", 
        "esri/views/MapView",
        "esri/layers/FeatureLayer"
    ], function (esriConfig,Map, MapView, FeatureLayer) {
        esriConfig.apiKey = apiKey;

        const map = new Map({
            basemap: "arcgis-topographic"
        });

        const view = new MapView({
            map: map,
            center: [-79.8077,37.8989],
            zoom: 13,
            container: 'map'
        });

        // Define a pop-up for Trailheads
        const popupTrailheads = {
            "title": "Trailhead",
            "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
        }

        const trails = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/2",
            outFields: ["Name","Blaze","Mileage","Usage","Difficulty"],
            popupTemplate: popupTrailheads
        });

        const cabins = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/1",
            outFields: ["Cabin_No"],
            popupTemplate: popupTrailheads
        });

        const parking = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/0",
            popupTemplate: popupTrailheads
        });

        const highlight = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/3",
            popupTemplate: popupTrailheads
        });

        map.add(trails);
        map.add(cabins);
        map.add(parking);
        map.add(highlight);
    });
}


