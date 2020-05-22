/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

yuccaWidgetsModule.directive('collapsibleTree', function($timeout,$rootScope) {
	return {
		restrict : 'E',
		scope:{data :'=', selected: "@", columns: '=', widgetId: "@", rowDepth: "@", updateCallback: '&updateCallback'},
		template : '<div id="collapsibleTree{{panelIndex}}" class="collapsible-tree-container" style="min-width:{{svgWidth}}px; border: solid 0px red; display: inline-block"></div>',
		link : function(scope, elem, attr) {
			console.log("attr", attr);
			console.log("elem", elem);
			console.log("scope", scope);
			scope.panelIndex = Math.floor((Math.random() * 10000) + 1);
			var margin = {top : 0, right : 0, bottom : 0, left : 0};

//			var margin = {
//				top : 20,
//				right : 120,
//				bottom : 20,
//				left : 120
//			};

//			if ((typeof attr.marginTop != 'undefined' && attr.marginTop != null))
//				margin.top = parseInt(attr.marginTop);
//			if ((typeof attr.marginRight != 'undefined' && attr.marginRight != null))
//				margin.right = parseInt(attr.marginRight);
//			if ((typeof attr.marginBottom != 'undefined' && attr.marginBottom != null))
//				margin.bottom = parseInt(attr.marginBottom);
//			if ((typeof attr.marginLeft != 'undefined' && attr.marginLeft != null))
//				margin.left = parseInt(attr.marginLeft);

			//console.log("margin", margin);
			var fixHeight = (typeof attr.fixHeight != 'undefined' && attr.fixHeight == 'true') ? true : false;
			var nodeIndex = 0, root;
			var rowHeight = !attr.rowHeight? 32 : attr.rowHeight;
			var rowDepth = !attr.rowDepth? 160 : parseInt(attr.rowDepth);
			var radius = !attr.radius? rowHeight / 3 : parseInt(attr.radius);
			var levelDepth = {};
			var startClosed = (typeof attr.startClosed != 'undefined' && attr.startClosed == 'true') ? true : false;
			var nodeOffsetX = !attr.nodeOffsetX? 0 : parseInt(attr.nodeOffsetX);



			scope.$watch('data', function() {
				console.log("attr.width in", attr.width);
				var width = (typeof attr.width == 'undefined' || attr.width == null) ? 800 : parseInt(attr.width);
				var height = (typeof attr.height == 'undefined' || attr.height == null) ? 50 : parseInt(attr.height);
				height = height - margin.top - margin.bottom;
				console.log("width in", width);

				console.log("ssdata", scope.data);
				var tree = d3.layout.tree().size([ height, width ]);

				var diagonal = d3.svg.diagonal().projection(function(d) {
					return [ d.y, d.x ];
				});

				var ignoreClick = false;

				function onNodeClick(browseHistory, opening){
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
						if(!opening)
							path.shift();
						var event = {"sourceId": scope.widgetid,
										"eventtype": "dataset.browse", 
										"data": {"browseHistory":browseHistory, "path":path.reverse()}, 
										"widget": "collapsibletree"};
					$rootScope.$broadcast('yucca-collapsibletree-event', event);
							console.log("yucca-collapsibletree-event", event);
						}
				};
				
				d3.select("#collapsibleTree" + scope.panelIndex + " svg").remove();
				var vis = d3.select("#collapsibleTree" + scope.panelIndex).append("svg").attr("width",width).attr("height",
						height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				root = scope.data;

				// d3.select(self.frameElement).style("height", "500px");
				root.x0 = height / 2;
				root.y0 = 0;

				function toggleAll(d) {
					if (d.children) {
						d.children.forEach(toggleAll);
						toggle(d);
					}
				}
				
				if(root.children)
					root.children.forEach(toggleAll);

				if(startClosed)
					toggle(root);
				update(root);
				var isRoot = true;
				function update(source) {
					console.info("source", source);
					var duration = d3.event && d3.event.altKey ? 5000 : 500;

					// compute the new height
					var levelWidth = new Array();
					levelWidth[0] = 1;
					var childCount = function(level, n) {

						if (n.children && n.children.length > 0) {
							if (levelWidth.length <= level + 1)
								levelWidth.push(0);

							levelWidth[level + 1] += n.children.length;
							n.children.forEach(function(d) {
								childCount(level + 1, d);
							});
						}
					};
					
					
					childCount(0, root);

					var newHeight = d3.max(levelWidth) * rowHeight;
					
					if (fixHeight)
						d3.select("#collapsibleTree" + scope.panelIndex).attr("style", "height:" + newHeight + "px");
					d3.select("#collapsibleTree" + scope.panelIndex + " svg").attr("height", newHeight);
					tree = tree.size([ newHeight, width ]);

					// Compute the new tree layout.
					var nodes = tree.nodes(root).reverse();
					console.log("nodes root", root, nodes);

					// Normalize for fixed-depth.
					nodes.forEach(function(d) {
						var invisible = vis.append("svg:text").attr("id", "invisible").attr("class", d.cssClass).attr("x", 0).attr("y", 0).attr("dy", ".35em");
						invisible.append("svg:tspan").attr("class", d.title + " title").text(d.name + " ");
						invisible.append("svg:tspan").attr("class", d.title + " subtitle").text(typeof d.subtitle!='undefined' && d.subtitle!=null ? d.subtitle: "");
						
						var currentDepth = parseInt(invisible.node().getBBox().width + (radius * 4));
						d.titleLength  = currentDepth;
						d3.select("#invisible").remove();
					
					
						if (typeof levelDepth["depth_" + d.depth] == 'undefined')
							levelDepth["depth_" + d.depth] = {"current": d.children || d._children ? currentDepth : rowDepth};
						else if (currentDepth > levelDepth["depth_" + d.depth].current && ( d.children || d._children))
							levelDepth["depth_" + d.depth] = {"current": currentDepth};
						
						var maxWidth = 0;
						
						console.log("maxWidth", maxWidth);
						//baseSvg.attr("height",maxHeight + margin.top + margin.bottom);
					
					});
					var numChildren = 0;
					nodes.forEach(function(d) {
						d.y = 0;
						for (var int = 0; int <= d.depth; int++) {
							d.y += levelDepth["depth_" + int].current + nodeOffsetX;
						}
						numChildren += (d.children && d.children!=null?d.children.length:0);
					});
					
					console.log("levelDepth",levelDepth);
					isRoot = numChildren == 0;
					
					// Update the nodes...
					var node = vis.selectAll("g.node").data(nodes, function(d) {
						return d.id || (d.id = ++nodeIndex);
					});
					
					// Enter any new nodes at the parent's previous position.
					var nodeEnter = node.enter().append("svg:g").attr("class",  function(d) { return "node node_depth_" + d.depth;}).attr("transform", function(d) {
						return "translate(" + source.y0 + "," + source.x0 + ")";
					});

					nodeEnter.append("svg:circle").attr("r", 1e-6).attr("class", function(d) {
						return "node_circle " +  (d._children ? "full" : "empty") + "circle_depth_" + d.depth;
					}).on("click", function(d) {
						toggle(d);
						update(d);
						var opening = d.children?true: false;
						onNodeClick(browseHistory(d,new Array()),opening);
					});
					function browseHistory(d,bh){
						if(d.parent){
							//bh.push({column:scope.columns[realDepth(d,0)-1],value:d.name});
							bh.push({column:d.column,value:d.name});
							bh = browseHistory(d.parent, bh);
						}
							
						return bh;
					}
					
					
					// icon
//					nodeEnter.append("svg:text").attr("id", function(d) {
//						return "icon_" + d.depth + "_" + d.id;
//					}).attr("x", function(d) {
//						return -1*d.titleLength;
//						//return -1*levelDepth["depth_" + d.depth].current;//-d.y;
//					}).attr("dy", ".35em").attr("text-anchor", function(d) {
//						return d.children || d._children ? "start" : "start";
//					}).attr("class", function(d) {
//						return d.cssIcon + " icon";
//					}).on("click", function(d) {
//						d.action(d.filter);
//						// update(d);
//					}).text(function(d) {
//						return d.icon + " ";
//					});
//					

					// title / subtitle
					var nodeText = nodeEnter.append("svg:text").attr("id", function(d) {
						return "text_" + d.depth + "_" + d.id;
					}).attr("x", function(d) {
						return d.children || d._children ? -rowHeight / 2:rowHeight / 2;
					}).attr("dy", ".35em").attr("text-anchor", function(d) {
						return d.children || d._children ? "end" : "start";
					}).attr("class", function(d) {
						return d.cssClass + " title_depth_" + d.depth;
					}).on("click", function(d) {
						d.action(d.filter);
					});
					
					
					
					nodeText.append("svg:title").attr("class", function(d) {
						return compactText(d.name) + " tooltip";
					}).text(function(d) {
						return typeof d.tooltip != 'undefined' && d.tooltip!=null ?d.tooltip:"";
					});
					
					nodeText.append("svg:tspan").attr("class", function(d) {
						console.debug("tree ",d);
						return compactText(d.name) + " title";
					}).text(function(d) {
							return d.name + " ";
					});
					
					nodeText.append("svg:tspan").attr("class", function(d) {
						return compactText(d.name) + " subtitle";
					}).text(function(d) {
						return typeof d.subtitle!='undefined' && d.subtitle!=null  ? d.subtitle: "";
					});
					


					if(!attr.hideValues || attr.hideValues!="true"){
						nodeText.append("svg:tspan").attr("class", function(d) {
							return  compactText(d.name)  + " value_separator";
						}).text(function(d) {
							return typeof d.formattedValue!='undefined' && d.formattedValue!=null  ? " - " : "";
						});
						
						var tspanValue = nodeText.append("svg:tspan").attr("class", function(d) {
							return  compactText(d.name)  + " value";
						}).text(function(d) {
							return typeof d.formattedValue!='undefined' && d.formattedValue!=null  ? d.formattedValue: "";
						});
						if(!attr.valueNotColored || attr.valueNotColored!="true")
							tspanValue.style("fill",function(d) {return d.color;})
					}
					
					// Transition nodes to their new position.
					var nodeUpdate = node.transition().duration(duration).attr("transform", function(d) {
						return "translate(" + d.y + "," + d.x + ")";
					});


					nodeUpdate.select("circle").attr("r", radius).attr("class", function(d) {
						return "node_circle " +  (d._children ? "full" : "empty") + " circle_depth_" + d.depth;
					}).style("stroke",function(d) {return d.color;});

					nodeUpdate.select("text").style("fill-opacity", 1);
					nodeUpdate.select("tspan").style("fill-opacity", 1); 
					//nodeUpdate.select("text").call(wrap, 200);

					// Transition exiting nodes to the parent's new position.
					var nodeExit = node.exit().transition().duration(duration).attr("transform", function(d) {
						return "translate(" + source.y + "," + source.x + ")";
					}).remove();

					nodeExit.select("circle").attr("r", 1e-6);

					nodeExit.select("text").style("fill-opacity", 1e-6);
					


					// Update the links...
					var link = vis.selectAll("path.link").data(tree.links(nodes), function(d) {
						return d.target.id;
					});

					// Enter any new links at the parent's previous position.
					link.enter().insert("svg:path", "g").attr("class", "link").attr("d", function(d) {
						var o = {
							x : source.x0,
							y : source.y0
						};
						return diagonal({
							source : o,
							target : o
						});
					}).transition().duration(duration).attr("d", diagonal);

					// Transition links to their new position.
					link.transition().duration(duration).attr("d", diagonal);

					// Transition exiting nodes to the parent's new position.
					link.exit().transition().duration(duration).attr("d", function(d) {
						var o = {
							x : source.x,
							y : source.y
						};
						return diagonal({
							source : o,
							target : o
						});
					}).remove();

					// Stash the old positions for transition.
					nodes.forEach(function(d) {
						d.x0 = d.x;
						d.y0 = d.y;
					});
					
					if(scope.updateCallback){
						scope.updateCallback({"isRoot": isRoot});
					}
					
//					$timeout(function() {scope.svgWidth = vis.node().getBBox().width + margin.right + margin.left + 40;
//						d3.select("#collapsibleTree" + scope.panelIndex + " svg").attr("width", scope.svgWidth)
//						console.log("svgWidth",d.x,vis.node().getBBox().width);
//					}, duration);
//					
//					
//					console.log("svgWidth",vis.node().getBBox().width);
//					console.log("svgWidth",scope.svgWidth);
					//scope.$apply();
					//d3.select("#collapsibleTree" + scope.panelIndex + " svg").attr("width", scope.svgWidth)

				}

				// Toggle children.
				function toggle(d) {
					if (d.children) {
						d._children = d.children;
						d.children = null;
					} else {
						d.children = d._children;
						d._children = null;
					}
				}

			});
			
			var compactText = function(text){
				if(text)
					return text.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
				else
					return "";
			}
			
			var stringEllipse = function(text, length, end) {
		    	
		    	if(typeof text === "undefined"  || text == null)
		    		text = "";
		    	
		        if (isNaN(length))
		            length = 10;

		        if (end === undefined)
		            end = "...";

		        if (text.length <= length || text.length - end.length <= length) {
		            return text;
		        }
		        else {
		            return String(text).substring(0, length-end.length) + end;
		        }
			};
			
			function wrap(text, width) {
			    text.each(function () {
			        var text = d3.select(this),
			            words = text.text().split(/\s+/).reverse(),
			            word,
			            line = [],
			            lineNumber = 0,
			            lineHeight = 1, // ems
			            x = text.attr("x"),
			            y = text.attr("y"),
			            dy = text.attr("dy")?parseFloat(text.attr("dy")):0, //parseFloat(text.attr("dy")),
			            tspan = text.text(null)
			                        .append("tspan")
			                        .attr("x", x)
			                        .attr("y", y)
			                        .attr("dy", dy + "em");
			        while (word = words.pop()) {
			            line.push(word);
			            tspan.text(line.join(" "));
			            if (tspan.node().getComputedTextLength() > width) {
			                line.pop();
			                tspan.text(line.join(" "));
			                line = [word];
			                tspan = text.append("tspan")
			                            .attr("x", x)
			                            .attr("y", y)
			                            .attr("dy", ++lineNumber * lineHeight*0.5 + dy + "em");
			                            //.text(word);
			            }
			        }
			    });
			}
		}
	};
});
