/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('treemapChart', function($timeout,$rootScope, $sce) {
	return {
		restrict : 'E',
		scope:{data :'=', showLegend:"@",  widgetid: "@", numberFormat: '=', numberFormat2: '='},
		template: '<div id="treemapPanel{{panelIndex}}" class="treemap-container" style="width: {{width}}px"></div>'+
				'<div class="legend" ng-if="legendColors.length>0 && showLegend">'+
				'	<span class="legend-label">0</span>' +
				'	<span ng-repeat="c in legendColors track by $index" class="legend-bullet" style="background-color: {{c}}">{{cc}}</span>' +
				'	<span class="legend-label">100</span>' +
				'</div>' + 
				'<style>{{scrolltext_keyframe}}</style>' + 
				'<div class="treemap-textscroll-wrapper" style="width: {{width}}px"><div class="treemap-textscroll" ng-bind-html="textvalues" style=" animation-duration: {{scrolltext_duration}}s; "></div></div>',
		link : function(scope, elem, attr) {
			console.info("Treemap - attr", attr);
			console.debug("Treemap - elem", elem);
			console.debug("Treemap - scope", scope);
			var showLegend = true;
			if(scope.showLegend == "false")
				showLegend = false;

			scope.panelIndex  = Math.floor((Math.random() * 10000) + 1); 
			var margin = {top : 30, right : 0, bottom : 0, left : 0};
			//var width = 500;
			//var height = 500;
			//height = height - margin.top - margin.bottom;
			
			var ignoreClick = false;

			function onAreaClick(browseHistory){
            	 console.log("onAreaClick ignoreClick", browseHistory, ignoreClick);


            	 if(ignoreClick){
            		 ignoreClick = false;
            	 }
            	 else{
            		 console.log("data", scope.data);
            		 var path = [];
	 	    	     for (var key in browseHistory) {
	 	    	    	 if (browseHistory.hasOwnProperty(key)) {
							  path.push(browseHistory[key].value);
					     }
	 	    	     }
	 	    	     path.push(scope.data.name);

	 	    	     var event = {"sourceId": scope.widgetid,
	            			 	  "eventtype": "dataset.browse", 
	            			 	  "data": {"browseHistory":browseHistory, "path":path.reverse()}, 
	            			 	  "widget": "treemap"};
					$rootScope.$emit('yucca-treemap-event', event);
	            	 console.log("yucca-treemap-event", event);
            	 }
            };
			
			scope.$on('yucca-widget-event-'+scope.widgetid, function(e, event) {  
				console.log("yucca-widget-event-"+scope.widgetid,e, event);
				if(event.type == 'browse'){
					browseToPath(event.path);
				}
			});

			var browseToPath  = function(path){
				
				console.log("browseToPath",path);
				var absolutedepth = parseInt(d3.select("#absoluteparent").attr("absolutedepth"))+1;

				var pathdepth = path.length;
				if(absolutedepth>path.pathdepth){
					drillUp();
					browseToPath(path);
				}
				else{
					var parentname = d3.select("#absoluteparent").attr("parentname");
					var equivalentname = path[absolutedepth-1];
					var targetname = path[path.length-1];
					if(equivalentname != targetname){
						if(equivalentname == parentname){
							drillDown(path[absolutedepth]);
							$timeout(function() {browseToPath(path);}, 1000);
						}
						else{
							drillUp();
							$timeout(function() {browseToPath(path);}, 1000);
						}
					}
				}
			};

			var drillUp = function(){
				ignoreClick = true;
				$timeout(function() {d3.select(".grandparent").node().dispatchEvent(new Event("click"))},1);
			};

			var drillDown = function(id){
				ignoreClick = true;
				var gId = "#id_" + id.replace(/\s/g, "_")+ "_1";
				$timeout(function() {d3.select(gId).node().dispatchEvent(new Event("click"))},1);
			/*	$timeout(function() {
					if(d3.select(gId)){
						ignoreClick = true;
						$timeout(function() {
							console.log("Click on "+gId+ "_1");
							d3.select(gId).node().dispatchEvent(new Event("click"));
							return true;
						}, 1000);
					}
					else{
						return false;
					}
			});*/
			}
		
			
			var refreshTextvalues = function(d){
				console.log("refreshTextvalues", d);
				console.log("refreshTextvalues numberFormat", scope.numberFormat);
				var textvalues = "";
				var text = "";
				if(d && d._children){
					for (var i = 0; i < d._children.length; i++) {
						var c = d._children[i];
						var fColor = c.color?guessForegroundColor(c.color):"#333";
						var value = safeNumber(c.value, scope.numberFormat);
						textvalues+= "<span class='treemap-column' style='background-color: " + c.color + "; color: " + fColor + "'>"+c.name+"</span>"+
							"	<span class='treemap-first-value'>"+
							"		<span class='treemap-data-label'>"+scope.data.valueLabel+"</span> <span class='treemap-data-value'>" + value + "</span>  "+
							"   </span>";
						text += c.name + scope.data.valueLabel + c.value;
						if(c.value2){
							var value2 = safeNumber(c.value2, scope.numberFormat2);
							textvalues+= "	<span class='treemap-first-value'>"+
							"		<span class='treemap-data-label'>"+scope.data.valueLabel2+"</span> <span class='treemap-data-value'>" + value2 + "</span>  "+
							"   </span>";;
							text += scope.data.valueLabel2 + c.value2;
							
						}
					}
				}
				console.log("refreshTextvalues text",text );
				scope.scrolltext_keyframe = "@keyframes scroll{0% {left:100%;}100% {left:-" + (text.length/1.8) + "em;}}";
				scope.scrolltext_duration = text.length/5;
				scope.textvalues = $sce.trustAsHtml(textvalues);
			};
			
			scope.$watch('data', function() {
				console.log("data change");
				
				var width = (typeof attr.width == 'undefined' || attr.width == null) ? 500: parseInt(attr.width);
				var height = (typeof attr.height == 'undefined' || attr.height == null) ? 500: parseInt(attr.height);
				scope.width = width;
				height = height - margin.top - margin.bottom;
				var root=scope.data;
				scope.legendColors = [];
				if(root !=null){
					var transitioning;
	
					var x = d3.scale.linear().domain([ 0, width ]).range([ 0, width ]);
	
					var y = d3.scale.linear().domain([ 0, height ]).range([ 0, height ]);
	
					var treemap = d3.layout.treemap().children(function(d, depth) {
						return depth ? null : d._children;
					}).sort(function(a, b) {
						return a.value - b.value;
					}).ratio(height / width * 0.5 * (1 + Math.sqrt(5))).round(false);
	
					d3.select("#treemapPanel"+scope.panelIndex+" svg").remove();
					var svg = d3.select("#treemapPanel"+scope.panelIndex).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.bottom + margin.top)
							.style("margin-left", -margin.left + "px").style("margin.right", -margin.right + "px").append("g").attr("transform",
									"translate(" + margin.left + "," + margin.top + ")").style("shape-rendering", "crispEdges");
	
					var grandparent = svg.append("g").attr("class", "grandparent");
	
					grandparent.append("rect").attr("y", -margin.top).attr("width", width).attr("height", margin.top);
	
					grandparent.append("text").attr("x", 8).attr("y", 8 - margin.top).attr("dy", ".75em");
					
					
					var initialize = function(root) {
						root.x = root.y = 0;
						root.dx = width;
						root.dy = height;
						root.depth = 0;
					};
	
					var accumulate = function(d) {
						return (d._children = d.children) ? d.value = d.children.reduce(function(p, v) {
							return p + accumulate(v);
						}, 0) : d.value;
					};

					var accumulate2 = function(d) {
						return (d._children = d.children) ? d.value2 = d.children.reduce(function(p, v) {
							return p + accumulate2(v);
						}, 0) : d.value2;
					};

					var layout = function(d) {
						if (d._children) {
							treemap.nodes({
								_children : d._children
							});
							d._children.forEach(function(c) {
								c.x = d.x + c.x * d.dx;
								c.y = d.y + c.y * d.dy;
								c.dx *= d.dx;
								c.dy *= d.dy;
								c.parent = d;
								layout(c);
							});
						}
					};
					
					var gId = 0;
					var display = function(d) {
						console.log("ttt ddd ",d)
						grandparent.datum(d.parent).on("click", transition).select("text").text(name(d));
	
						var g1 = svg.insert("g", ".grandparent").datum(d).attr("class", "depth").attr("parentname",d.name).attr("id", "absoluteparent")
							.attr("absolutedepth", function(d){return d.absolutedepth;});
						var g = g1.selectAll("g").data(d._children).enter().append("g");
						
	
						g.filter(function(d) {
							return d._children;
						}).classed("children", true).on("click", transition);
	
						g.selectAll(".child").data(function(d) {
							return d._children || [ d ];
						}).enter().append("rect").attr("class", "child").attr("style",function(d){return color(d);}).call(rect);
	
						g.append("rect").attr("class", "parent").attr("style",function(d){return color(d);}).call(rect).append("title").text(function(d) {
							return tooltip(d);
						});
						
						g.append("text").attr("dy", ".75em").attr("style",function(d){return textColor(d);}).call(text);
						g.attr("id", function(d){return "id_" + d.name.replace(/\s/g, "_") + "_" + d.depth;} );
						g.attr("column",function(d){return d.column;});
						g.attr("absolutedepth",function(d){return d.absolutedepth;});
						
						refreshTextvalues(root);

						function transition(d) {
							if (transitioning || !d)
								return;
							transitioning = true;
	
							var g2 = display(d), t1 = g1.transition().duration(750), t2 = g2.transition().duration(750);
	
							// Update the domain only after entering new elements.
							x.domain([ d.x, d.x + d.dx ]);
							y.domain([ d.y, d.y + d.dy ]);
	
							// Enable anti-aliasing during the transition.
							svg.style("shape-rendering", null);
	
							// Draw child nodes on top of parent nodes.
							svg.selectAll(".depth").sort(function(a, b) {
								return a.depth - b.depth;
							});
	
							// Fade-in entering text.
							g2.selectAll("text").style("fill-opacity", 0);
	
							// Transition to the new view.
							t1.selectAll("text").call(text).style("fill-opacity", 0);
							t2.selectAll("text").call(text).style("fill-opacity", 1);
							t1.selectAll("rect").call(rect);
							t2.selectAll("rect").call(rect);
	
							// Remove the old node when the transition is finished.
							t1.remove().each("end", function() {
								svg.style("shape-rendering", "crispEdges");
								transitioning = false;
							});
							
							//if(typeof d._children != 'undefined' && typeof d._children.length != 'undefined' &&  d._children.length>0 && 
							//		typeof d._children[0] != 'undefined' && typeof d._children[0]._children == 'undefined'){
							if(typeof d.parent != 'undefined' && showLegend){
								scope.legendColors = [];
								var startColor = d.color?d.color:d.parent.color;
								for (var i = 0; i < 5; i++) {
									var lum = i*.9/2 -0.9;
									
									var color = ColorLuminance(startColor, lum);
									scope.legendColors.push(color);
								}
							}
							else
								scope.legendColors = [];
							refreshTextvalues(d);

							scope.$apply();
							onAreaClick(browseHistory(d,new Array()));
						}
	
						return g;
					};
					
					function tooltip(d){
						//var t = root.valueLabel + " " + d.name.trim() + " : " + d.value.toFixed();
						
						var value = safeNumber(d.value, scope.numberFormat);

						var t = root.valueLabel + ": " + value;
						//if(typeof d.label != 'undefined')
						//	t = d.label;
						if(d.fourthElement){
							try{
								t += " - "+ d.fourthElement.label +": "+ parseFloat(d.fourthElement.value).toFixed(1) + "%";
							}
							catch (e) {
							}
						}
						if(d.value2){
							try{
								var value2 = safeNumber(d.value2, scope.numberFormat2);
								t += " - " + root.valueLabel2 + ": "+ value2;
							}
							catch (e) {
							}
						}
						return t;
					}
					
					function color(d) {
						//var c =  d.color? d.color:(d.parent.color?d.parent.color:d.parent.parent.color);
						var c = upColor(d);

						if(d.fourthElement){
							var lum = d.fourthElement.value*0.9/50 -0.9;
							c = ColorLuminance(c,lum);
						}
						else if(d.value2){
							var value2percent = d.value2/d.parent.value2
							var lum = value2percent;
							//console.log("l", value2percent, lum);
							c = ColorLuminance(c,lum);
						}
						return "fill:" +c;
					}
					
					function textColor(d){
						//var c =  d.color? d.color:(d.parent.color?d.parent.color:d.parent.parent.color);
						var c = upColor(d);
						if(d.fourthElement){
							var lum = d.fourthElement.value*0.9/50 -0.9;
							c = ColorLuminance(c,lum);
						}
						return "fill: " +guessForegroundColor(c);
					}
					
					function upColor(d){
						return d.color? d.color:(d.parent?upColor(d.parent):"#ddd");
					}
					
					//function realDepth(d,val){
					//	if(d.parent){
					//		val = realDepth(d.parent, val+1);
					//	}
					//	return val;
					//}
					
					function browseHistory(d,bh){
						if(d.parent){
							//bh.push({column:scope.columns[realDepth(d,0)-1],value:d.name});
							bh.push({column:d.column,value:d.name});
							bh = browseHistory(d.parent, bh);
						}
							
						return bh;
					}
					
					function text(text, label) {
						text.attr("x", function(d) {
							return x(d.x) + 6;
						}).attr("y", function(d) {
							return y(d.y) + 6;
						}).text(function(d) {
							var fontWidth = 10;
							var nameLength = d.name.trim().length*fontWidth;
							var label = d.name;
							var width = x(d.x + d.dx) - x(d.x);
							if(width<nameLength){
								var numOfChar = parseInt(width/fontWidth) -1;
								if(numOfChar>3)
									label = d.name.substring(0,numOfChar)+"...";
								else
									label = "";
							}
							return  label;
						});
					}
	
					function rect(rect) {
						rect.attr("x", function(d) {
							return x(d.x);
						}).attr("y", function(d) {
							return y(d.y);
						}).attr("width", function(d) {
							return x(d.x + d.dx) - x(d.x);
						}).attr("height", function(d) {
							return y(d.y + d.dy) - y(d.y);
						});
					}
					
					function name(d) {
						return d.parent ? name(d.parent) + "  -  " + d.name : d.name;
					}
					
				

					initialize(root);
					accumulate(root);
					accumulate2(root);
					layout(root);
					display(root);
				}
			});
			
			function guessForegroundColor(color){
				var rgb = parseInt(color.replace('#', ''), 16);   // convert rrggbb to decimal
				var r = (rgb >> 16) & 0xff;  // extract red
				var g = (rgb >>  8) & 0xff;  // extract green
				var b = (rgb >>  0) & 0xff;  // extract blue

				var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
				
				var foregroundColor = "#fff";
				if (luma > 164) {
					foregroundColor = "#000";
				}
				return foregroundColor;
			}
	
			function ColorLuminance(hex, lum) {

				// validate hex string
				hex = String(hex).replace(/[^0-9a-f]/gi, '');
				if (hex.length < 6) {
					hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
				}
				lum = lum || 0;

				// convert to decimal and change luminosity
				var rgb = "#", c, i;
				for (i = 0; i < 3; i++) {
					c = parseInt(hex.substr(i*2,2), 16);
					c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
					rgb += ("00"+c).substr(c.length);
				}

				return rgb;
			}

			var safeNumber = function(input, format) {
				var result = input;
				if(!isNaN(input) ){
					if(input)
						input = parseFloat(input);
					if(format){
						if(format.euro){
							result = formatEuro(input, format.decimal,format.bigNumber);
						}
						else{
							if(isNaN(format.decimal)){
								if(Math.abs(input)>100)
									format.decimal=0;
								else if(Math.abs(input)<1){
									format.decimal= -1*Math.log10(input) +1;
									if(format.decimal < 0)
										format.decimal = 0;
									else if(format.decimal>20)
										format.decimal =20;
								}
								else
									format.decimal = 2;
							}
							result = parseFloat(input).toFixed(format.decimal);
							if(format.bigNumber){
								result = formatBigNumber(result, format.decimal, format.lang);
							}
						}
					}
				}
				return result;
			};
			
			var formatBigNumber = function(input, decimal, lang) {
				var output = "";
				if(!decimal)
					decimal = 2;
				if (input) {
					output = formatBigNumberValue(input, decimal);
			    }
				return (""+output).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
			};
			
			var formatEuro = function(input, decimal, bigNumber) {
				var result = input;
				if(typeof decimal == 'undefined' || isNaN(decimal))
					decimal = 2;
				var suffix = " \u20AC";
				if(!isNaN(input) ){
					if(bigNumber)
						result = formatBigNumberValue(input, decimal);
					else
						result = parseFloat(input).toFixed(decimal).toString();
				}
				return result.replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") +suffix;
			};
			
			var formatBigNumberValue = function(input,decimal, lang){
				if(!lang)
					lang = "it";
				//input=Math.trunc(input);

				if(input<1000)
					output=parseFloat(input).toFixed(decimal);
				else if(input<1000000)
					output=(input/1000).toFixed(decimal)+(lang=='it'?" mila":" k");
				else if(input<1000000000)
					output=(input/1000000).toFixed(decimal)+(lang=='it'?" mln":" M");
				else 
					output=(input/1000000000).toFixed(decimal).toLocaleString()+(lang=='it'?" mld":" B");
				return output;
			};



		}
	};
});