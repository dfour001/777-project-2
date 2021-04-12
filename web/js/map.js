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
        "esri/widgets/Search",
        "esri/widgets/Editor",
        "esri/widgets/Track"
    ], function (esriConfig,Map, MapView, FeatureLayer, UniqueValueRenderer, Home, LayerList, Expand, Search, Editor, Track) {
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
                break;
              
              case "GEOG 777 Project2 WFL1 - Waterfalls":
                item.title = "Waterfalls";
                item.visible = false;
                break;

              case "GEOG 777 Project2 WFL1 - Campsites":
                item.title = "Campsites";
                item.visible = false;
                break;

              case "FourquetGEOG777Comment - Point":
                item.title = "Comments";
                item.visible = false;
            }
          }
        });

        const layerListExpand = new Expand({
          expandIconClass: "esri-icon-layer-list",
          view: view,
          content: widgetLayerList
        });

        const widgetEditor = new Editor({
          view: view,
          allowedWorkflows: ['create'],
          label: "Comment Label"
        });

        const widgetTrack = new Track({
          view:view
        });

        view.ui.add(widgetHome, 'top-right');
        view.ui.add(widgetTrack, 'top-right');
        view.ui.add(layerListExpand, 'top-right');
        view.ui.add('trailsWidget', 'bottom-right');       


        /////////////////////
        // Popup Templates /
        ///////////////////

        const popupTrails = {
            "title": "<b>Trail Name:</b> {Name}",
            "content": "<b>Blaze Color:</b> {Blaze}<br><b>Mileage:</b> {Mileage}<br><b>Difficulty:</b> {Difficulty}"
        };
        
        const popupCabin = {
          "title": "Cabin {CABIN_NO}",
          "content": "<b>Bedrooms:</b> {BR}<br><b>Max Capacity:</b> {MaxCapacity}<br><br><img src='https://danielfourquet.com/images/DouthatCabin.jpg'><br><hr><a class='pure-button' href='https://www.reserveamerica.com/explore/douthat-state-park/VA/140188/overview' target='_blank' style='color: black'>Check Availability</a>"
        };

        const popupCampsites = {
          "title": "{Name}",
          "content": "<b>Number of sites:</b> {Sites}<br><hr><a class='pure-button' href='#' style='color: black'>Check Availability</a>"
        };

        const popupWaterfall = {
          "title": "{Name}",
          "content": "<b>Height</b>: {Height}"
        };

        const popupComments = {
          "title": "<b>Name:</b> {Name}",
          "content": "<b>Comment:</b> {Comment}"
        };


        ///////////////
        // Renderers /
        /////////////

        const trailsDifficulty = {
            type: "unique-value",  // autocasts as new UniqueValueRenderer()
            field: "Difficulty",
            defaultSymbol: { 
                type: "simple-line",
                width: 2 },
            uniqueValueInfos: [{
              value: "Easy",
              symbol: {
                type: "simple-line",
                width: 2,
                color: "green"
              }
            }, {
              value: "Moderate",
              symbol: {
                type: "simple-line",
                width: 2,
                color: "yellow"
              }
            }, {
              value: "Difficult",
              symbol: {
                type: "simple-line",
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
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/4",
            outFields: ["Name","Blaze","Mileage","Usage","Difficulty"],
            popupTemplate: popupTrails,
            renderer: trailsBlaze
        });

        const cabins = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/3",
            outFields: ["Cabin_No", "BR", "MaxCapacity", "Img"],
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

        const campsites = new FeatureLayer({
          url:"https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/0",
          outFields: ["Name","Sites"],
          popupTemplate: popupCampsites
        });

        const waterfalls = new FeatureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/1",
          outFields: ["Name", "Height"],
          popupTemplate: popupWaterfall
        });

        const parking = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/2",
            outFields: ['Spaces', 'SurfaceMaterial'],
            popupTemplate: null
        });

        const highlight = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/GEOG_777_Project2_WFL1/FeatureServer/5"
        });

        const comments = new FeatureLayer({
          url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/FourquetGEOG777Comment/FeatureServer/0",
          outFields: ['Name', 'Comment'],
          popupTemplate: popupComments
        })
        // Add Layers
        map.addMany([trails, cabins, parking, highlight, campsites, waterfalls, comments]);
        

        /////////////////////////////
        // Add map event listeners /
        ///////////////////////////
        function removeActive() {
          $('.pure-menu-link').removeClass('btnActive');
          trails.visible = false;
          cabins.visible = false;
          parking.visible = false;
          campsites.visible = false;
          waterfalls.visible = false;
        }

        $('#btnTrails').on('click', function() {
          removeActive(); // Remove active button highlight
          hideWidgets()
          trails.visible = true;
          parking.visible = true;
          // view.ui.add('trailsWidget', 'bottom-right');
          $('#trailsWidget').removeClass('trails-widget-disabled');
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
        });

        $('#btnCabins').on('click', function() {
          removeActive();
          hideWidgets()
          cabins.visible = true;
          view.ui.add(widgetCabinSearch, 'bottom-right');
          $(this).addClass('btnActive');
        });

        $('#btnCampsites').on('click', function() {
          removeActive();
          hideWidgets()
          campsites.visible = true;
          $(this).addClass('btnActive');
        });

        $('#btnWaterfalls').on('click', function() {
          removeActive();
          hideWidgets();
          waterfalls.visible = true;
          $(this).addClass('btnActive');
        });

        $('#btnParking').on('click', function() {
          removeActive();
          hideWidgets()
          parking.visible = true;
          $(this).addClass('btnActive');
          
        });

        $('#btnComment').on('click', function() {
          removeActive();
          hideWidgets();
          comments.visible = true;
          view.ui.add(widgetEditor, 'bottom-right');
          setTimeout(function() {
            $('.esri-editor__title').html('Add Map Comment');
            $('.esri-editor__feature-list-name').html('Add map comment point')
          }, 50);
          
          $(this).addClass('btnActive');
        });

        function toggleMenuActive() {
          $('#menu').toggleClass('active');
          $('#menuLink').toggleClass('active');
        }

        function hideWidgets() {
          // Hides any unneeded widgets when a different layer is selected
          // from the menu
          view.ui.remove([widgetCabinSearch, widgetEditor]);
          $('#trailsWidget').addClass('trails-widget-disabled');
        }
    
        $('#menuLink').on('click', function() {
            toggleMenuActive();
        });
    
        $('.pure-menu-item').on('click', function() {
            toggleMenuActive();
        });

        // Check for opened popups in mobile and make sure they're expanded
        view.when(function() {
          view.popup.watch("collapsed", function(value){
            if(value && view.popup.currentDockPosition === 'bottom-center'){
              popup.collapsed = false;
            }
          });

          // Editor.viewModel.watch('state', function(state) {
          //   if (state === 'ready') {
              
          //   }
          // })
        });

        


      });
}


