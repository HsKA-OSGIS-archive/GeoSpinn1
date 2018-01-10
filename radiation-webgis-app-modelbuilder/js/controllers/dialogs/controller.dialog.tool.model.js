define(["jqueryui", "turf_model", "openlayers", "spectrum"], function(jqueryui, turf_model, ol, spectrum){
    
    //console.log("require.js: controller.dialog.tool.buffer.js loaded");
	
	
	//console.log(model);
	
	
	
    return function($rootScope, $element){
	
	$(document).ready(function(){

	    var dw = $rootScope.dialogWrapper;
	    var ow = $rootScope.openLayersWrapper;
	    var sw = $rootScope.switcherWrapper;
		

			


		//console.log(ow.FormatGeoJson.writeFeaturesObject((layers[0].self).getSource().getFeatures(), ow.defaultFeatureReadOptions));
		selected_features = ow.getSelectedFeaturesCollection();
		
		var select_model = document.getElementById("models");
		var read_button = document.getElementById("read_button");
		var input_para = document.getElementById("input_parameters");
		var select_lyr1 = [];
		var select_lyr2 = [];
		var current,current2;
		//console.log(select_model);
		var mydata;
		var in_layers = {};
		var in_layers2 = {};
		function change(){
		$.getJSON('models/test_model1.json', function(data) {
			//console.log(data);
			mydata = data; 
			//console.log(mydata.all_models[0].model_name);
			
			for(var i=0 ; i<mydata.all_models.length ; i++){
				
				//console.log(mydata[i]);
				var option = document.createElement("option");
				option.text = mydata.all_models[i].model_name;
				select_model.add(option);
			}
			
			select_model.onchange = function() {
				select_model.value;
				readModel();
				
			}
			function readModel(){
				$("#input_parameters").empty();
				in_layers = {};
				in_layers2 = {};
				layers = ow.getLayersFromDataStructure(ow.rootLayerCollection, [], 0);
				while (input_para.firstChild) {
					input_para.removeChild(input_para.firstChild);
				}
				//alert(select_model.value);
				for (var v in mydata.all_models){
					if (select_model.value == mydata.all_models[v].model_name){
						//console.log(mydata.all_models[v]);
						current = mydata.all_models[v]
						for (var op in current.operations){
							//console.log(current.operations[op].parameters.l1);
							
							
							if (isNaN(current.operations[op].parameters.l1)){
								select_lyr1[op] = document.createElement("select"); 
								select_lyr1[op].id = current.operations[op].parameters.l1;
								console.log(current);
								var elem2 = document.createElement('label');
								elem2.innerHTML = current.operations[op].parameters.l1;    
								input_para.appendChild(elem2);
								
								for (var l in layers){
								
									var option = document.createElement("option");
									option.text = layers[l].title;
									select_lyr1[op].add(option);
									
								}
								var ht = select_lyr1[op];
									/*select_lyr1[op].onchange = function() {
											alert(ht);
											ht.value;
											alert("changed  " +ht.id);
											
											activate2(ht.id,ht.value);
											//readModel();
									}*/
								$(ht).change(function () { 
									alert(this.id);
									activate2(this.id , this.value);
								});
									
								input_para.appendChild(select_lyr1[op]);
								//alert(current.operations[op].parameters.l1);
								in_layers[current.operations[op].parameters.l1] = select_lyr1[op].value;
								
								
							}
							console.log(current.operations[0].parameters.l1);
							if (current.operations[op].parameters.l2){
								if (isNaN(current.operations[op].parameters.l2)){
									
									select_lyr2[op] = document.createElement("select"); 
									
									select_lyr2[op].id = current.operations[op].parameters.l2;
									var elem2 = document.createElement('label');
									elem2.innerHTML = current.operations[op].parameters.l2;    
									input_para.appendChild(elem2);
									var th = select_lyr2[op];
									$(th).change(function () { 
										alert(this.id);
										activate2(this.id , this.value);
									});
									
									
									for (var l in layers){
										var option = document.createElement("option");
										option.text = layers[l].title;
										select_lyr2[op].add(option);
										
										
									}
									input_para.appendChild(select_lyr2[op]);
									//alert(current.operations[op].parameters.l1);
									in_layers[current.operations[op].parameters.l2] = select_lyr2[op].value;
									console.log(current.operations[0].parameters.l2);

									
								}
							}
							activate();
						}
					}
				}
			}
			
			read_button.onclick = function(){
				readModel();
			}
			
			function activate(){
				console.log(in_layers);
				in_layers2 = in_layers;

				var searchEles = input_para.children;
				for(var i = 0; i < searchEles.length; i++) {
					console.log(searchEles[i]);
					//console.log(searchEles[i].options[searchEles[i].selectedIndex].value);
				}
				
			}
			function activate2(id,value){
				//console.log(in_layers);
				in_layers2[id] = value;
				var searchEles = input_para.children;
				for(var i = 0; i < searchEles.length; i++) {
					//console.log(searchEles[i]);
					//console.log(searchEles[i].options[searchEles[i].selectedIndex].value);
				}

			}
			
			dw.initModel("model", $element, function(){
				console.log(in_layers2);
				console.log(current.operations);
				current2 = current.operations;
				layers = ow.getLayersFromDataStructure(ow.rootLayerCollection, [], 0);
				layer_surveyed = {};
				
				layers.forEach(function(layer, index, array) {
					layer_surveyed = layer.self; 
					console.log(layer.self);
					console.log(layer_surveyed.getSource().getFeatures());
					
				});
				for (var i in in_layers2){
					for (var l in layers){
						//console.log(in_layers2[i]);
						//console.log(layers[l].title);
						if (in_layers2[i] == layers[l].title){
							console.log(ow.FormatGeoJson.writeFeaturesObject(layers[l].self.getSource().getFeatures(), ow.defaultFeatureReadOptions));
							in_layers2[i] = ow.FormatGeoJson.writeFeaturesObject(layers[l].self.getSource().getFeatures(), ow.defaultFeatureReadOptions);
						}
						
					}
				}
				
				//console.log(ow.FormatGeoJson.writeFeaturesObject(layer_surveyed.getSource().getFeatures(), ow.defaultFeatureReadOptions));
				var model_style = new ol.style.Style({
					stroke: new ol.style.Stroke({
					color: 'cyan',
					width: 1
					}),
					fill: new ol.style.Fill({
					 color: "blue"
					})
				})

				var model_layer = new ol.layer.Vector({
					name: ow.generateLayerName(),
					title: "test_model",
					source: new ol.source.Vector({
					
					}),
					style: model_style
				});
				
				
				var model = turf_model.model(current2, in_layers2);
				
				ow.addGeoJsonToSource(model , model_layer);

				ow.rootGroup.getLayers().push(model_layer);
				sw.init($("#layer_tree"), ow);
				
				
					$("#input_parameters").empty();
				

			}, ow,{
			accept_only: ["Polygon"],
			min: 2
		}); // document.ready()   dw.initModel end
			
			
		}); // end of $getJSON (model.json) 
		}
		
		change();
		

    })
	
    }; // return function

}); 
    