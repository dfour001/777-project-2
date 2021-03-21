$(document).ready(function(){
    // Load esri js api key and launch map
    $.ajax({
        url: 'js/apiKey.json',
        success: function(r) {
            let key = r.key;
            start_map(key);
        },
      });
});