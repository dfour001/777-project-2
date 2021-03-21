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
            center: [-118.80543,34.02700],
            zoom: 13,
            container: 'map'
        });

        // Define a pop-up for Trailheads
        const popupTrailheads = {
            "title": "Trailhead",
            "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
        }

        const trailheads = new FeatureLayer({
            url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
            outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
            popupTemplate: popupTrailheads
        });

        map.add(trailheads);
    });
}


