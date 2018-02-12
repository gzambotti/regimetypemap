/* code by Giovanni Zambotti - g.zambotti@gmail.com */
$(document).ready(function($) {        
  'use strict';
  $('body').on('click', function(event) {
    var target = $(event.target);
    if (target.parents('.bootstrap-select').length) {
      event.stopPropagation();
      //$('.bootstrap-select.open').removeClass('open');
    }
  });
  
  var clusterNumber = ["Clusters",2,3,4,5,6,7];        
  $.each(clusterNumber, function(val, text) {
    $('#dropDownClusterNumber').append( $('<option></option>').val(text).html(text));
  });

  var clusterField = [['alldimensions','All Dimensions'],['excludefactors','Exclude Demand Factors'],['demscore','Democracy Score'], ['family','Family Admission'], ['gdppc','GDP per capita'], 
  ['gravity','Source Proximity'], ['hhi','Source Concentration'], ['human','Refugee Admission'], 
  ['migrantstock','Total Migrant Stock'], ['natrate','Naturalization Rate'], ['other','Free Movement'], 
  ['polscore','Political Stability'], ['tempperm','Temporary Admission'], 
  ['top10','Top Ten Sources'], ['ur','Unemployment Rate'], ['work','Labor Admissions'], ['workaccomp','Accompanying Family']];
  
  $.each(clusterField, function(val, text) {
    $('#dropDownClusterVar').append( $('<option></option>').val(text[0]).html(text[1]));
    if(text[0] == 'excludefactors'){$('#dropDownClusterVar').append( $('<option data-divider="true"></option>'));}
  });

  /*var clusterField = ["demscore", "family", "gdppc", "gravity", "hhi", "human", "migrantstock", "natrate", "other", "polscore", "tempperm", "top10", "ur", "work", "workaccomp"]
        
  $.each(clusterField, function(val, text) {
    $('#dropDownClusterVar').append( $('<option></option>').val(text).html(text) )
  });      
  */
  $('.selectpicker').selectpicker();
  $('.dropdown-toggle').dropdown();

  $('#dropDownClusterNumber').change(function() {
    if($('#dropDownClusterNumber').val() != 'Clusters'){
      $('#dropDownClusterNumber option[value="Clusters"]').prop('disabled', true);
      $('#dropDownClusterVar').prop('disabled', false);
      $('.selectpicker').selectpicker('refresh');   
    }
  });
  // enable Cluster Dimensions pull down
  $('#dropDownClusterVar').change(function() {
    var clusterVar = $(this).val();
    if($('#dropDownClusterVar').val() != null){
      $('#dropDownCountry').prop('disabled', false);
      $('.selectpicker').selectpicker('refresh');  
      if (clusterVar == 'alldimensions'){
        clusterVar = ['demscore', 'family', 'gdppc', 'gravity', 'hhi', 'human', 'migrantstock', 'natrate', 'other', 'polscore', 'tempperm', 'top10', 'ur', 'work', 'workaccomp']; 
        $( '#dropDownClusterVar').selectpicker('val',clusterVar);
        $('#dropDownClusterVar option[value="excludefactors"]').prop('disabled', true);
        $('#dropDownClusterVar option[value="alldimensions"]').prop('disabled', true);              
        $('.selectpicker').selectpicker('refresh'); 
      }
      if (clusterVar == 'excludefactors'){
        clusterVar = ['family', 'gravity', 'hhi', 'human', 'migrantstock', 'natrate', 'other', 'polscore', 'tempperm', 'top10', 'work', 'workaccomp']; 
        $( '#dropDownClusterVar').selectpicker('val',clusterVar);
        $('#dropDownClusterVar option[value="excludefactors"]').prop('disabled', true);
        $('#dropDownClusterVar option[value="alldimensions"]').prop('disabled', true);              
        $('.selectpicker').selectpicker('refresh'); 
      }
      if (clusterVar != 'excludefactors' || clusterVar != 'alldimensions'){
        $('#dropDownClusterVar option[value="excludefactors"]').prop('disabled', true);
        $('#dropDownClusterVar option[value="alldimensions"]').prop('disabled', true);              
        $('.selectpicker').selectpicker('refresh');
      }
    }
    else{
      $('#dropDownClusterVar option[value="excludefactors"]').prop('disabled', false);
      $('#dropDownClusterVar option[value="alldimensions"]').prop('disabled', false);
      $('#dropDownCountry').prop('disabled', true);              
      $('.selectpicker').selectpicker('refresh');
    }
  });              

  $('#dropDownCountry').change(function() {
    if($('#dropDownCountry').val() != null){$('#btnGeoCluster').prop('disabled', false);}
    var countryRegime = $(this).val();
    $(this).find('option:selected').each(function(){
      var newcontinent = $(this).val();            
      switch(newcontinent) {
        case 'Asia':                  
            var i = countryRegime.indexOf('Asia');
            countryRegime.splice(i,1,'Bahrain','China','Japan','Jordan','Kuwait','Oman','Pakistan','Qatar','Russian Federation','Saudi Arabia','Singapore','South Korea','United Arab Emirates');
            $('#dropDownCountry').selectpicker('val',countryRegime);              
            $('.selectpicker').selectpicker('refresh');                  
            break;
        case 'Europe':                  
            i = countryRegime.indexOf('Europe');
            countryRegime.splice(i,1,'Austria','Belgium','Denmark','Finland','France','Germany','Ireland','Italy','Netherlands','Norway','Poland','Portugal',
'Spain','Sweden','Switzerland','United Kingdom');
            $('#dropDownCountry').selectpicker('val',countryRegime);            
            $('.selectpicker').selectpicker('refresh');                  
            break;
        case 'North America':                  
            i = countryRegime.indexOf('North America');
            countryRegime.splice(i,1,'Canada','Mexico','United States of America');
            $('#dropDownCountry').selectpicker('val',countryRegime);
            $('.selectpicker').selectpicker('refresh');                  
            break;
        case 'Oceania':                  
            i = countryRegime.indexOf('Oceania');
            countryRegime.splice(i,1,'Australia','New Zealand');
            $('#dropDownCountry').selectpicker('val',countryRegime);
            $('.selectpicker').selectpicker('refresh');                  
            break;
        case 'South America':                  
            i = countryRegime.indexOf('South America');
            countryRegime.splice(i,1,'Brazil','Chile','Peru');
            $('#dropDownCountry').selectpicker('val',countryRegime);
            $('.selectpicker').selectpicker('refresh');                  
            break;              
        } 
    });
  });

  $('.ex-disable').click(function() {
    $('#dropDownCountry').selectpicker('deselectAll');
    $('#btnGeoCluster').prop('disabled', true);           
  });        

  $('#geoclusterNav').click(function(){
    $('#clusterModal').modal('show'); 
    $('body').css('margin-right','0px');
    $('.navbar').css('margin-right','0px');                
  });        

  $('#about').click(function(){
    $('#aboutModal').modal('show'); 
    $('body').css('margin-right','0px');
    $('.navbar').css('margin-right','0px');          
  });       

});

require(['esri/map',
  'esri/request',
  'esri/graphic',
  'esri/layers/FeatureLayer',
  'esri/tasks/Geoprocessor',          
  'esri/InfoTemplate',        
  'esri/layers/GraphicsLayer',
  'esri/graphicsUtils',     
  'esri/layers/ArcGISTiledMapServiceLayer',
  'esri/renderers/SimpleRenderer','esri/symbols/SimpleLineSymbol', 'esri/symbols/SimpleFillSymbol','esri/Color',
  'dojo/dom', 
  'dojo/on',
  'esri/domUtils', 
  'js/bootstrapmap.js',
  'dojo/domReady!'], 
  function(Map, esriRequest, Graphic, FeatureLayer, Geoprocessor, InfoTemplate, GraphicsLayer, graphicsUtils, ArcGISTiledMapServiceLayer, SimpleRenderer, SimpleLineSymbol, SimpleFillSymbol, Color, dom, on, domUtils, BootstrapMap) {
    'use strict';
    
    var gpServiceUrl = 'https://hfgis.fas.harvard.edu/arcgis/rest/services/test/cmodel/GPServer/cluster';
    var mapserviceurljob = 'https://hfgis.fas.harvard.edu/arcgis/rest/services/test/cmodel/GPServer/cluster/jobs';

    var infoTemplate = new InfoTemplate();        
    
    var map = BootstrapMap.create('mapDiv',{center: [1, 30],zoom: 3});
    
    var basemap = new ArcGISTiledMapServiceLayer('http://ags.cga.harvard.edu/arcgis/rest/services/crossroadofmigration/basemapocean/MapServer');
    map.addLayer(basemap);

    on(dom.byId('btnGeoCluster'),'click', geoCluster);
        
    function geoCluster() {                          
      var gp = new Geoprocessor(gpServiceUrl);
      gp.setOutputSpatialReference({wkid:102100});                
      var params = {
        'Number_of_Groups': $('#dropDownClusterNumber').val(),
        'Expression': countryQuery(),
        'Analysis_Fields': fieldQuery()
      };
      gp.submitJob(params, gpJobComplete, gpJobStatus, gpJobFailed);
    }

    function gpJobComplete(jobInfo) {
      if(jobInfo.jobStatus !== 'esriJobFailed'){
        //console.log(jobInfo.jobId)            
        var mapurlCountry = mapserviceurljob + '/' + jobInfo.jobId + '/results/output_final';                
        var requestHandleCountry = esriRequest({
          'url': mapurlCountry,
          'content': {
            'f': 'pjson'
          },
          'callbackParamName': 'callback'
        });       

        requestHandleCountry.then(requestSucceededCountry);
      }
      
    }
    
    function requestSucceededCountry(response) {          
      
      var graphicId = map.graphicsLayerIds;

      if(graphicId.length === 0){console.log(graphicId);}
      else{graphicId = document.getElementById(map.graphicsLayerIds[0] + '_layer'); graphicId.remove();map.graphicsLayerIds = [];}
      
      var countiesGraphicsLayer = new GraphicsLayer();
      
      var features = response.value.features;

      var infoGroups = [];
      
      for (var f=0, fl=features.length; f<fl; f++) {
        var feature = features[f];
        //console.log(feature)
        // create an object to store the group info result
        var myGroup = {gID:'',gCountry:''};
        var ss_array = [];
        
        if(feature.attributes.SS_GROUP == 1){ss_array = [228,26,28,255]; myGroup.gID = 1; myGroup.gCountry = feature.attributes.COUNTRY; infoGroups.push(myGroup); }
        else if(feature.attributes.SS_GROUP == 2){ss_array = [55,126,184,255]; myGroup.gID = 2; myGroup.gCountry = feature.attributes.COUNTRY; infoGroups.push(myGroup);} 
        else if(feature.attributes.SS_GROUP == 3){ss_array = [77,175,74,255]; myGroup.gID = 3; myGroup.gCountry = feature.attributes.COUNTRY; infoGroups.push(myGroup);}
        else if(feature.attributes.SS_GROUP == 4){ss_array = [152,78,163,255]; myGroup.gID = 4; myGroup.gCountry = feature.attributes.COUNTRY; infoGroups.push(myGroup); }
        else if(feature.attributes.SS_GROUP == 5){ss_array = [255,127,0,255]; myGroup.gID = 5; myGroup.gCountry = feature.attributes.COUNTRY; infoGroups.push(myGroup);} 
        else if(feature.attributes.SS_GROUP == 6){ss_array = [255,255,51,255]; myGroup.gID = 6; myGroup.gCountry = feature.attributes.COUNTRY; infoGroups.push(myGroup);}
        else{ss_array = [166,86,40,255]; myGroup.gID = 7; myGroup.gCountry = feature.attributes.COUNTRY; infoGroups.push(myGroup); }                          

      
        var myPolygon = {'geometry':{'rings': feature.geometry.rings,'spatialReference':{'wkid':102100}},'symbol':{'color':ss_array,'outline':{'color':[255,255,255,255],'width':1,'type':'esriSLS','style':'esriSLSSolid'},
        'type':'esriSFS','style':'esriSFSSolid'}};
        var gra = new Graphic(myPolygon);

        gra.setAttributes( {'COUNTRY':feature.attributes.COUNTRY,'GROUP':feature.attributes.SS_GROUP});
        
        infoTemplate.setContent('${COUNTRY} = Group ${GROUP}');

        gra.setInfoTemplate(infoTemplate);             
        countiesGraphicsLayer.add(gra);
      }
      //console.log(countiesGraphicsLayer)
     
      var m1,m2,m3,m4,m5,m6,m7 = '';
      //console.log(JSON.stringify(infoGroups))
      var infoGroupsID = [];  
      infoGroups.filter(function(obj) {     
        var newGroup = obj.gID;            
        switch(newGroup) {
          case 1: m1 +=  obj.gCountry + ', '; infoGroupsID.push(obj.gID); break;
          case 2: m2 +=  obj.gCountry + ', '; infoGroupsID.push(obj.gID); break;
          case 3: m3 +=  obj.gCountry + ', '; infoGroupsID.push(obj.gID); break;
          case 4: m4 +=  obj.gCountry + ', '; infoGroupsID.push(obj.gID); break;
          case 5: m5 +=  obj.gCountry + ', '; infoGroupsID.push(obj.gID); break;
          case 6: m6 +=  obj.gCountry + ', '; infoGroupsID.push(obj.gID); break;
          case 7: m7 +=  obj.gCountry + ', '; infoGroupsID.push(obj.gID); break;              
        }  
      });
       
      infoGroupsID = infoGroupsID.filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) == index;
      });
      //console.log(m1,m2,m3,m4,m5,m6,m7)
      $('#cntryGrp').html('');

      for (var i in infoGroupsID.sort()) {
        //console.log(infoGroupsID[i]);
        var newGroupID = infoGroupsID[i];
        switch(newGroupID) {
          case 1: m1 = m1.replace(/,\s*$/, '').replace('undefined',''); $('#cntryGrp').append('<li class="divider"></li><li id="m1">' + '<b>Group 1 :</b> '  + m1 + '</li>');  break;
          case 2: m2 = m2.replace(/,\s*$/, '').replace('undefined',''); $('#cntryGrp').append('<li class="divider"></li><li id="m2">' + '<b>Group 2 :</b> '  + m2 + '</li>');  break;
          case 3: m3 = m3.replace(/,\s*$/, '').replace('undefined',''); $('#cntryGrp').append('<li class="divider"></li><li id="m3">' + '<b>Group 3 :</b> '  + m3 + '</li>');  break;
          case 4: m4 = m4.replace(/,\s*$/, '').replace('undefined',''); $('#cntryGrp').append('<li class="divider"></li><li id="m4">' + '<b>Group 4 :</b> '  + m4 + '</li>');  break;
          case 5: m5 = m5.replace(/,\s*$/, '').replace('undefined',''); $('#cntryGrp').append('<li class="divider"></li><li id="m5">' + '<b>Group 5 :</b> '  + m5 + '</li>');  break;
          case 6: m6 = m6.replace(/,\s*$/, '').replace('undefined',''); $('#cntryGrp').append('<li class="divider"></li><li id="m6">' + '<b>Group 6 :</b> '  + m6 + '</li>');  break;
          case 7: m7 = m7.replace(/,\s*$/, '').replace('undefined',''); $('#cntryGrp').append('<li class="divider></li><li id="m7">' + '<b>Group 7 :</b> '  + m7 + '</li>');  break;              
        }
      }              

      map.addLayer(countiesGraphicsLayer);
      //console.log(countiesGraphicsLayer)
      map.graphics.enableMouseEvents();
      //map.setExtent(graphicsUtils.graphicsExtent(countiesGraphicsLayer.graphics), true);

      countiesGraphicsLayer.on('mouse-over',function (event) {
            map.graphics.clear();  //use the maps graphics layer as the highlight layer
            var graphic = event.graphic;               
            map.infoWindow.setContent(graphic.getContent());               
            map.infoWindow.show(event.screenPoint,map.getInfoWindowAnchor(event.screenPoint));
          });
    
    countiesGraphicsLayer.on('mouse-out',function (event) {
        map.infoWindow.hide();
    });       
       
  }

    function gpJobStatus(jobinfo){
      var bootstrap_alert = function() {};
      bootstrap_alert.warning = function(message) {
        $('#alert_placeholder').html('<div class="alert alert-danger alert-dismissable"><span>'+message+'</span></div>');
      };
      bootstrap_alert.success = function(message) {
        $('#alert_placeholder').html('<div class="alert alert-success alert-dismissable"><span>'+message+'</span></div>');
      };          
      
      var jobstatus = '';
      switch (jobinfo.jobStatus) {
        case 'esriJobSubmitted': bootstrap_alert.success('Submitted Clustering Analysis ...'); break;
        case 'esriJobExecuting': bootstrap_alert.success('Executing Clustering Analysis...'); break;            
        case 'esriJobSucceeded': bootstrap_alert.success('Clustering Analysis Complete.'); window.setTimeout( function(){$('.alert').slideUp();}, 5000); break;
        case 'esriJobFailed': bootstrap_alert.warning('Clustering Analysis Failed.'); window.setTimeout( function(){$('.alert').slideUp();}, 5000); break;
      }     
      
    }

    function gpJobFailed(error){
      console.log("error")
      //dom.byId('status').innerHTML = error;
      //domUtils.hide(dom.byId('status'));
      
    }        

    function countryQuery(){
      var def = [];
      $('#dropDownCountry option:selected').each(function() {                    
        def.push($(this).text());
      });          
      
      var defQuery = '';            
      $.each( def, function( i, l ){
        var n = l.indexOf("'");            
        if(n > -1){
            l = l.splice(n, 0, "'" );
            if(i <= def.length -2){
              defQuery += "\"COUNTRY\" = '" + l + "' OR ";                     
            }
            else{
              defQuery += "\"COUNTRY\" = '" + l + "'";                      
            }    
        }
        else{
            if(i <= def.length -2){
                defQuery += "\"COUNTRY\" = '" + l + "' OR ";
            } else{
                defQuery += "\"COUNTRY\" = '" + l + "'";                 
            }
        }
      });
      return defQuery;
    }

    function fieldQuery(){
       var clusterNumberArray = [];
        $('#dropDownClusterVar option:selected').each(function() {                    
          clusterNumberArray.push($(this).val());
        });
        return clusterNumberArray;
    }  
  
});