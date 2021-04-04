function start_map(apiKey) {
    require([
        "esri/config",
        "esri/Map", 
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/renderers/UniqueValueRenderer",
        "esri/widgets/Home",
        "esri/widgets/LayerList",
        "esri/widgets/Expand",
        "esri/widgets/Search"
    ], function (esriConfig,Map, MapView, FeatureLayer, UniqueValueRenderer, Home, LayerList, Expand, Search) {
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

        /////////////
        // Widgets /
        ///////////
        const widgetHome = new Home({
            view: view
        });

        const widgetLayerList = new LayerList({
          view: view,
          listItemCreatedFunction: function(e) {
            let item = e.item;
            item.title = item.title.split('GEOG 777 Project2 WFL1 - ')[1]
            switch(item.title) {
              case "GEOG 777 Project2 WFL1 - HighlightPark":
                item.title = "Highlight Park";
                break;
              
              case "GEOG 777 Project2 WFL1 - Trails":
                item.title = "Trails";
                item.visible = false;
                break;

              case "GEOG 777 Project2 WFL1 - Parking":
                item.title = "Parking";
                item.visible = false;
                break;

              case "GEOG 777 Project2 WFL1 - Cabins":
                item.title = "Cabins";
                item.visible = false;
            }
          }
        });

        const layerListExpand = new Expand({
          expandIconClass: "esri-icon-layer-list",
          view: view,
          content: widgetLayerList
        });

        // Search bar for cabins data source source
        // const searchSource = [{
        //   layer: new FeatureLayer({
        //     url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/1",
        //     outFields: ["Cabin_No"]
        //   }),
        //   searchFields: ["Cabin_No"],
        //   displayField: "Cabin_No",
        //   placeholder: "egh eh",
        //   name: "Cabins",
        //   exactMatch: false,
        //   maxResults: 3,
        //   maxSuggestions: 3,
        //   suggestionsEneabled: true,
        //   minSuggestCharacters: 1
        // }];

        // const widgetSearch = new Search ({
        //   view: view,
        //   includeDefaultSources: false,
        //   label: 'HA HA HA!'
        // });

        view.ui.add(widgetHome, 'top-right');
        view.ui.add(layerListExpand, 'top-right');
        // view.ui.add(widgetSearch, {position: 'top-right'});

        /////////////////////
        // Popup Templates /
        ///////////////////
        const popupTrailheads = {
            "title": "Trailhead",
            "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
        }
        const popupCabin = {
          "title": "Cabin {CABIN_NO}",
          "content": "<b>Cabin Number:</b> {CABIN_NO}<br>"
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
            popupTemplate: popupCabin
        });

        // Search widget for cabins
        const widgetCabinSearch = new Search({
          view: view,
          sources: [{
            layer: cabins,
            searchFields: ['Cabin_No'],
            suggestionTemplate: "Cabin {Cabin_No}",
            exactMatch: false,
            outfields: ['Cabin_No'],
            placeholder: 'Search by Cabin Number...'
          }],
          includeDefaultSources: false
        });

        const parking = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/0",
            popupTemplate: popupTrailheads
        });

        const highlight = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/3"
        });

        map.add(trails);
        map.add(cabins);
        map.add(parking);
        map.add(highlight);
        console.log(widgetLayerList);
        /////////////////////////////
        // Add map event listeners /
        ///////////////////////////
        function removeActive() {
          $('.pure-menu-link').removeClass('btnActive');
          trails.visible = false;
          cabins.visible = false;
          parking.visible = false;
        }

        $('#btnTrails').on('click', function() {
          removeActive(); // Remove active button highlight
          hideWidgets()
          trails.visible = true;
          parking.visible = true;
          view.ui.add('trailsWidget', 'bottom-right');
          $(this).addClass('btnActive');
        });

        // Trails change symbols buttons
        $('#trailsBlazes').on('click', function() {
          trails.renderer = trailsBlaze;
          $('.trails-widget').toggleClass('trails-widget-active');
        });

        $('#trailsDifficulty').on('click', function() {
          trails.renderer = trailsDifficulty;
          $('.trails-widget').toggleClass('trails-widget-active');
        })

        $('#btnCabins').on('click', function() {
          removeActive();
          hideWidgets()
          cabins.visible = true;
          view.ui.add(widgetCabinSearch, 'bottom-right');
          $(this).addClass('btnActive');
        })

        $('#btnCampsites').on('click', function() {
          removeActive();
          hideWidgets()
          // campsites.visible = true;
          $(this).addClass('btnActive');
        })

        $('#btnActivities').on('click', function() {
          removeActive();
          hideWidgets()
          // activities.visible = true;
          $(this).addClass('btnActive');
        })

        $('#btnParking').on('click', function() {
          removeActive();
          hideWidgets()
          parking.visible = true;
          $(this).addClass('btnActive');
        })

        function toggleMenuActive() {
          $('#menu').toggleClass('active');
          $('#menuLink').toggleClass('active');
        }

        function hideWidgets() {
          // Hides any unneeded widgets when a different layer is selected
          // from the menu
          view.ui.remove([widgetCabinSearch, 'trailsWidget']);
        }
    
        $('#menuLink').on('click', function() {
            toggleMenuActive();
        });
    
        $('.pure-menu-item').on('click', function() {
            toggleMenuActive();
        });

        


      });
}


