/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('funnelChart', function($timeout,$rootScope) {
	return {
		restrict : 'E',
		scope:{data :'=', showLegend:"@",  widgetid: "@", colors:"=", mouth: "="},
		template: '<div id="funnelPanel{{panelIndex}}" class="funnel-container"><div id="fake-{{panelIndex}}"></div></div>',
		link : function(scope, elem, attr) {
			console.info("Funnel - attr", attr);
			console.debug("Funnel - elem", elem);
			console.debug("Funnel - scope", scope);
			var showLegend = true;
			if(scope.showLegend == "false")
				showLegend = false;

			scope.panelIndex  = Math.floor((Math.random() * 10000) + 1); 
			var margin = {top : 0, right : 0, bottom : 0, left : 0};

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
					$rootScope.$broadcast('yucca-treemap-event', event);
	            	 console.log("yucca-treemap-event", event);
            	 }
            };
			
			scope.$on('yucca-widget-event-'+scope.widgetid, function(e, event) {  
				console.log("yucca-widget-event-"+scope.widgetid,e, event);
			});

			var findMaxLabel = function(){
				var maxLabel = "";
				for(var i=0; i<scope.data.length; i++){
					if(scope.data[i].label.length>maxLabel.length)
						maxLabel = scope.data[i].label;
				}
				return maxLabel;
			}

			scope.$watch('data', function() {
				console.log("data change", scope.data);
				
				var width = (typeof attr.width == 'undefined' || attr.width == null) ? 500: parseInt(attr.width);
				var height = (typeof attr.height == 'undefined' || attr.height == null) ? 500: parseInt(attr.height);

				height = height - margin.top - margin.bottom;
				var sectionHeight = parseInt(height/scope.data.length);

				var radius = Math.min(width, height) / 2;
				//var color = d3.scale.ordinal().range(["#255aee","#3a6fff","#4f84ff","rgb(101,154,302)","rgb(122,175,323)", "rgb(144,197,345)", "rgb(165,218,366)"]);
				var color = d3.scale.ordinal().range(scope.colors);
				console.log("colors",color);
				console.log("colors",scope.colors);
				scope.legendColors = [];
				if(scope.data !=null){
					var maxLabel = findMaxLabel();
					var fakeText = d3.select("#fake-"+ scope.panelIndex ).insert("svg").append("text").text(maxLabel);
					var horizontalOffset =  fakeText.node().getComputedTextLength()+6;
					d3.select("#fake-"+ scope.panelIndex).remove();

					d3.select("#funnelPanel"+scope.panelIndex+" svg").remove();
					var svg = d3.select("#funnelPanel"+scope.panelIndex).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.bottom + margin.top)
							.style("margin-left", -margin.left + "px").style("margin.right", -margin.right + "px").append("g");
	
					var funnel = d3.funnel().size([width,height]).showMouth(scope.mouth).horizontalOffset(horizontalOffset).value(function(d) { return d.value; });
					   
					var line = d3.svg.line().interpolate('line-closed').x(function(d,i) { return d.x; }).y(function(d,i) { return d.y; });
						
					var g = svg.selectAll(".funnel-group").data(funnel(scope.data)).enter().append("g").attr("class", "funnel-group");

				
					g.append("path").attr("d", function (d){ return line(d.coordinates); }).style("fill", function(d) { return color(d.label); });
				
					g.append("line").attr("x1",0)
						.attr("x2",function(d){return d.coordinates[2].x})
						.attr("y1",function(d){return d.coordinates[0].y+sectionHeight})
						.attr("y2",function(d){return d.coordinates[0].y+sectionHeight})
						.attr("class",function(d){return "funnel-chart-label-line " + d.key;});
//						.style("stroke", function(d) { return color(d.label); })
//						.style("stroke-width", 0.4 )
//						;
					g.append("text").attr({
						"y": function (d,i) {
							
							return parseInt(d.coordinates[0].y+sectionHeight-4);
							//if(d.coordinates.length === 4) {
							//	return (((d.coordinates[0].y-d.coordinates[1].y)/2)+d.coordinates[1].y) + 5;
							//} else {
							//	return (d.coordinates[0].y + d.coordinates[1].y)/2 + 10;
							//}
						},
						"x": function (d,i) { return 0;}
					})
					.style("text-anchor", "right")
					.text(function(d) { return d.label; });





					
					
					
					
					
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

					

				}
			});

	
			d3.funnel = function() {
				var size = [1,1],
					mouth = [1,1],
					horizontalOffset,
					showMouth,
					sort_data,
					value = function(d) { return d.value},
					coordinates;
				var percentageValues = function (data) {
				  var values = data.map(value);
				  var percentValues = data.map(function (d,i){
					d.value = +values[i];
					var weight_max = d3.max(data, function (d,i) {
					  return d.value;
					})
					return d.value/weight_max*100;
				  });
				  percentValues.sort(function(a,b){
					return b-a;
				  });
				  return percentValues;
				}

				var coordinatesCalculation = function(data){
					console.log("funnel data", data, size[1]);
					var w = size[0]-horizontalOffset,
						h = size[1],
						coordinates = [];
						var allPercentValues = percentageValues(data);
						var sectionHeight = parseInt(h/data.length);

						for (var i=0; i<data.length; i++){
							var selectedPercentValues = allPercentValues[i];
							var hTop = i*  sectionHeight;
							var hBottom = (i+1)*  sectionHeight;
							var wLeftTop = horizontalOffset + parseInt((w - w*allPercentValues[i]/100)/2);
							var wRightTop =  horizontalOffset + parseInt((w - w*allPercentValues[i]/100)/2 + w*allPercentValues[i]/100);
							var wLeftBottom;
							var wRightBottom;
							if(i==data.length-1){
								if(!showMouth){
									wLeftBottom =  horizontalOffset + parseInt(w/2);
									wRightBottom = horizontalOffset + parseInt(w/2);
								}
								else{
									wLeftBottom =  horizontalOffset + parseInt((w - w*allPercentValues[i]/100)/2);
									wRightBottom =  horizontalOffset + parseInt((w - w*allPercentValues[i]/100)/2 + w*allPercentValues[i]/100);
									}
							}
							else{
								wLeftBottom =  horizontalOffset + parseInt((w - w*allPercentValues[i+1]/100)/2);
								wRightBottom =  horizontalOffset + parseInt((w - w*allPercentValues[i+1]/100)/2 + w*allPercentValues[i+1]/100);

							}

							coordinates[i] = {"values":[
								{"x":wLeftTop,"y":hTop},
								{"x":wRightTop,"y":hTop},
								{"x":wRightBottom,"y":hBottom},
								{"x":wLeftBottom,"y":hBottom}
							]};
							  
						}
						return coordinates;
				  }

				var coordinatesCalculationPercentage = function(data){
					console.log("funnel data", data, size[1]);
				  var w = size[0],
					  h = size[1],
					  rw = mouth[0], //rect width
					  rh = mouth[1], //rect height
					  tw = (w - rw)/2, //triangle width
					  th = h - rh, //triangle height
					  height1=0,
					  height2=0,
					  height3=0,
					  merge = 0,
					  coordinates = [],
					  ratio = tw/th,
					  area_of_trapezium = (w + rw) / 2 * th,
					  area_of_rectangle = rw * rh,
					  total_area = area_of_trapezium + area_of_rectangle,
					  percent_of_rectangle = area_of_rectangle / total_area * 100;
					  console.log("percent_of_rectangle",percent_of_rectangle);
					  var allPercentValues = percentageValues(data);
					  var heightEqual = parseInt(h/data.length);
				  for (var i=data.length-1; i>=0; i--){
					var selectedPercentValues = allPercentValues[i];
					console.log("funnel selectedPercentValues",data[i], selectedPercentValues)
					if (percent_of_rectangle>=selectedPercentValues){
					  height3 = selectedPercentValues / percent_of_rectangle * rh;
					  height1 = h - height3;
					  if (i===data.length-1){
						coordinates[i] = {"values":[{"x":(w-rw)/2,"y":height1},{"x":(w-rw)/2,"y":h},{"x":((w-rw)/2)+rw,"y":h},{"x":((w-rw)/2)+rw,"y":height1}]};
					  }else{
						coordinates[i] = {"values":[{"x":(w-rw)/2,"y":height1+coordinates[i+1].values[3].y},coordinates[i+1].values[0],coordinates[i+1].values[3],{"x":((w-rw)/2)+rw,"y":height1 + coordinates[i+1].values[3].y}]};
					  }
					  console.log("primo if ",coordinates[i],height1, height3, rh)
					}else{
					  var area_of_element = ((selectedPercentValues)/100 * total_area) - area_of_rectangle,
						  a = 2 * ratio,
						  b = 2 * rw,
						  c = 2 * area_of_element;
					  height2 = (-b + Math.sqrt(Math.pow(b,2) - (4 * a * -c))) / (2 * a);
					  height1 = h - height2 - rh;
					  var base = 2*(ratio * height2)+rw,
					  xwidth = (w-base)/2;
					  
					  if(merge===0){
						if (i===data.length-1){
						  coordinates[i] = {"values":[{"x":xwidth,"y":height1},
							  {"x":(w-rw)/2,"y":th},
							  {"x":(w-rw)/2,"y":h},
							  {"x":((w-rw)/2)+rw,"y":h},
							  {"x":((w-rw)/2)+rw,"y":th},
							  {"x":base+xwidth,"y":height1}]};
						}else{
						  coordinates[i] = {"values":[{"x":xwidth,"y":height1},
						  {"x":(w-rw)/2,"y":th},
						  coordinates[i+1].values[0],coordinates[i+1].values[3],
						  {"x":((w-rw)/2)+rw,"y":th},
						  {"x":base+xwidth,"y":height1}]};
						}
					  }
					  else{
						var coindex;
						if(coordinates[i+1].values.length===6){
						  coindex = 5;
						}else{
						  coindex = 3;
						}
						conidex = i+1;
						coordinates[i] = {"values":[{"x":xwidth,"y":height1},
											coordinates[i+1].values[0],
											coordinates[i+1].values[coindex],
											{"x":base+xwidth,"y":height1}]};
					  }
					  merge = 1;
					  console.log("primo else ",coordinates[i].values[1].y,height1, height3, rh, th)

					}
				  }
				  return coordinates;
				}
				function funnel(data) {
				  var i = 0,
					  coordinates = coordinatesCalculation(data);
				  data.sort(function(a,b) {
					return b.value - a.value;
				  })
				  data.forEach(function(){
					data[i].coordinates = coordinates[i].values;
					i++;
				  })
				  return data;
				}
				funnel.size = function(s){
				  if (s.length!==2){
				  } else {
					size = s;
				  }
				  return funnel;
				}
				funnel.mouth = function(m){
				  if (m.length!==2){
				  } else {
					mouth = m;
				  }
				  return funnel;
				}
				funnel.showMouth = function(show){
					showMouth = show;
					return funnel;
				}
				funnel.horizontalOffset = function(o){
					if (o){
						horizontalOffset = o;
					} else {
					  horizontalOffset = 0;
					}
					return funnel;
				  }
				funnel.value = function(v) {
				  if (!arguments.length) return value;
				  value = v;
				  return funnel;
				};
				return funnel;
			  }
			  /*
			  var  roundPathCorners = function(pathString, radius, useFractionalRadius) {
				function moveTowardsLength(movingPoint, targetPoint, amount) {
				  var width = (targetPoint.x - movingPoint.x);
				  var height = (targetPoint.y - movingPoint.y);
				  
				  var distance = Math.sqrt(width*width + height*height);
				  
				  return moveTowardsFractional(movingPoint, targetPoint, Math.min(1, amount / distance));
				}
				function moveTowardsFractional(movingPoint, targetPoint, fraction) {
				  return {
					x: movingPoint.x + (targetPoint.x - movingPoint.x)*fraction,
					y: movingPoint.y + (targetPoint.y - movingPoint.y)*fraction
				  };
				}
				
				// Adjusts the ending position of a command
				function adjustCommand(cmd, newPoint) {
				  if (cmd.length > 2) {
					cmd[cmd.length - 2] = newPoint.x;
					cmd[cmd.length - 1] = newPoint.y;
				  }
				}
				
				// Gives an {x, y} object for a command's ending position
				function pointForCommand(cmd) {
				  return {
					x: parseFloat(cmd[cmd.length - 2]),
					y: parseFloat(cmd[cmd.length - 1]),
				  };
				}
				
				// Split apart the path, handing concatonated letters and numbers
				var pathParts = pathString
				  .split(/[,\s]/)
				  .reduce(function(parts, part){
					var match = part.match("([a-zA-Z])(.+)");
					if (match) {
					  parts.push(match[1]);
					  parts.push(match[2]);
					} else {
					  parts.push(part);
					}
					
					return parts;
				  }, []);
				
				// Group the commands with their arguments for easier handling
				var commands = pathParts.reduce(function(commands, part) {
				  if (parseFloat(part) == part && commands.length) {
					commands[commands.length - 1].push(part);
				  } else {
					commands.push([part]);
				  }
				  
				  return commands;
				}, []);
				
				// The resulting commands, also grouped
				var resultCommands = [];
				
				if (commands.length > 1) {
				  var startPoint = pointForCommand(commands[0]);
				  
				  // Handle the close path case with a "virtual" closing line
				  var virtualCloseLine = null;
				  if (commands[commands.length - 1][0] == "Z" && commands[0].length > 2) {
					virtualCloseLine = ["L", startPoint.x, startPoint.y];
					commands[commands.length - 1] = virtualCloseLine;
				  }
				  
				  // We always use the first command (but it may be mutated)
				  resultCommands.push(commands[0]);
				  
				  for (var cmdIndex=1; cmdIndex < commands.length; cmdIndex++) {
					var prevCmd = resultCommands[resultCommands.length - 1];
					
					var curCmd = commands[cmdIndex];
					
					// Handle closing case
					var nextCmd = (curCmd == virtualCloseLine)
					  ? commands[1]
					  : commands[cmdIndex + 1];
					
					// Nasty logic to decide if this path is a candidite.
					if (nextCmd && prevCmd && (prevCmd.length > 2) && curCmd[0] == "L" && nextCmd.length > 2 && nextCmd[0] == "L") {
					  // Calc the points we're dealing with
					  var prevPoint = pointForCommand(prevCmd);
					  var curPoint = pointForCommand(curCmd);
					  var nextPoint = pointForCommand(nextCmd);
					  
					  // The start and end of the cuve are just our point moved towards the previous and next points, respectivly
					  var curveStart, curveEnd;
					  
					  if (useFractionalRadius) {
						curveStart = moveTowardsFractional(curPoint, prevCmd.origPoint || prevPoint, radius);
						curveEnd = moveTowardsFractional(curPoint, nextCmd.origPoint || nextPoint, radius);
					  } else {
						curveStart = moveTowardsLength(curPoint, prevPoint, radius);
						curveEnd = moveTowardsLength(curPoint, nextPoint, radius);
					  }
					  
					  // Adjust the current command and add it
					  adjustCommand(curCmd, curveStart);
					  curCmd.origPoint = curPoint;
					  resultCommands.push(curCmd);
					  
					  // The curve control points are halfway between the start/end of the curve and
					  // the original point
					  var startControl = moveTowardsFractional(curveStart, curPoint, .5);
					  var endControl = moveTowardsFractional(curPoint, curveEnd, .5);
				
					  // Create the curve 
					  var curveCmd = ["C", startControl.x, startControl.y, endControl.x, endControl.y, curveEnd.x, curveEnd.y];
					  // Save the original point for fractional calculations
					  curveCmd.origPoint = curPoint;
					  resultCommands.push(curveCmd);
					} else {
					  // Pass through commands that don't qualify
					  resultCommands.push(curCmd);
					}
				  }
				  
				  // Fix up the starting point and restore the close path if the path was orignally closed
				  if (virtualCloseLine) {
					var newStartPoint = pointForCommand(resultCommands[resultCommands.length-1]);
					resultCommands.push(["Z"]);
					adjustCommand(resultCommands[0], newStartPoint);
				  }
				} else {
				  resultCommands = commands;
				}
				
				return resultCommands.reduce(function(str, c){ return str + c.join(" ") + " "; }, "");
			  };*/
			  

		}
	};
});