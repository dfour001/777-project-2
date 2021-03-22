function start_map(apiKey) {
    require([
        "esri/config",
        "esri/Map", 
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/renderers/UniqueValueRenderer",
        "esri/widgets/Home",
        "esri/widgets/LayerList",
        "esri/widgets/Expand"
    ], function (esriConfig,Map, MapView, FeatureLayer, UniqueValueRenderer, Home, LayerList, Expand) {
        esriConfig.apiKey = apiKey;

        const map = new Map({
            basemap: "arcgis-topographic"
        });

        const view = new MapView({
            map: map,
            center: [-79.8077,37.8989],
            zoom: 12,
            container: 'map'
        });

        view.ui.move('zoom','top-right');

        const widgetHome = new Home({
            view: view
        });

        const widgetLayerList = new LayerList({
          view: view
        });

        const layerListExpand = new Expand({
          expandIconClass: "esri-icon-layer-list",
          view: view,
          content: widgetLayerList
        });

        view.ui.add(widgetHome, 'top-right');
        view.ui.add(layerListExpand, 'top-right');

        /////////////////////
        // Popup Templates /
        ///////////////////
        const popupTrailheads = {
            "title": "Trailhead",
            "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
        }

        ///////////////
        // Renderers /
        /////////////

        const trailsDifficulty = {
            type: "unique-value",  // autocasts as new UniqueValueRenderer()
            field: "Difficulty",
            defaultSymbol: { 
                type: "simple-line",
                style: "short-dash-dot",
                width: 2 },
            uniqueValueInfos: [{
              value: "Easy",
              symbol: {
                type: "simple-line",
                style: "short-dash-dot",
                width: 2,
                color: "green"
              }
            }, {
              value: "Moderate",
              symbol: {
                type: "simple-line",
                style: "short-dash-dot",
                width: 2,
                color: "yellow"
              }
            }, {
              value: "Difficult",
              symbol: {
                type: "simple-line",
                style: "short-dash-dot",
                width: 2,
                color: "red"
              }
            }]
          };

          const trailsBlaze = {
            type: "unique-value",  // autocasts as new UniqueValueRenderer()
            field: "Blaze",
            defaultSymbol: { 
                type: "simple-line",
                width: 2
            },  // autocasts as new SimpleLineSymbol()
            uniqueValueInfos: [{
              value: "Blue",
              symbol: {
                type: "simple-line",
                width: 2,
                color: "blue"
              }
            }, {
              value: "Orange",
              symbol: {
                type: "simple-line",
                width: 2,
                color: "orange"
              }
            }, {
              value: "Red",
              symbol: {
                type: "simple-line",
                width: 2,
                color: "red"
              }
            },
            {
                value: "White",
                symbol: {
                  type: "simple-line",
                  width: 2,
                  color: "white"
                }
              }, {
                value: "Yellow",
                symbol: {
                  type: "simple-line",
                  width: 2,
                  color: "yellow"
                }
              }, {
                value: "Gold",
                symbol: {
                  type: "simple-line",
                  width: 2,
                  color: "gold"
                }
              }]
          };
        ////////////////////
        // Feature Layers /
        //////////////////

        const trails = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/2",
            outFields: ["Name","Blaze","Mileage","Usage","Difficulty"],
            popupTemplate: popupTrailheads,
            renderer: trailsBlaze
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
        console.log(map);
        console.log(view);
    });
}


