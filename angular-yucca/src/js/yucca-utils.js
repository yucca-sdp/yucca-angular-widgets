/**
 * SPDX-License-Identifier: EUPL-1.2
 * (C) Copyright 2019 Regione Piemonte
 */

var yuccaUtilsModule = angular.module('yucca.utils', []);

yuccaUtilsModule.factory('$yuccaHelpers', [function () {
	var self = {
		"stream":{
			wsOutputUrl : function(tenant_code, stream_code, smartobject_code) {
				var smartobject_stream = "";

				if (stream_code && stream_code!=null && smartobject_code && smartobject_code!=null)
					smartobject_stream = smartobject_code + "_" + stream_code;
				else if (smartobject_code && smartobject_code!=null)
					smartobject_stream = smartobject_code;
				else 
					smartobject_stream += stream.stream_code;

				var result = "/topic/output." + tenant_code + "." + smartobject_stream;
				return result;
			},
		},
		"attrs":{
			num : function(value, min, max, defaultValue){
				console.log("num", value, min, max, defaultValue);
				var result = value;
//				if(isNaN(value) || value == null || value == "" ||
//						(typeof min != 'undefined' && min !=null && value<min) || 
//						(typeof max != 'undefined' && max !=null && value>max))
//						result = defaultValue;
				if(isNaN(value) || value == null || value == "" )
						result = defaultValue;
				if(typeof min != 'undefined' && min !=null && result<min)
					result = min;
				if(typeof max != 'undefined' && max !=null && result>max)
					result = max;
				
				console.log("result", result);
				return result;
			},
			safe: function(value, defaultValue){
				var result = value;
				if(typeof value == 'undefined' || value == null || value == '')
					result = defaultValue;
				else if(value === 'false')
					result = false;
				return result;
			}
		},
		"utils":{
			mongoDate2millis : function(dateIn) {
				var time = null;
				if(dateIn){
					//var offset = new Date().getTimezoneOffset();
					var parts = /\/Date\((-?\d+)([+-]\d{4})?.*/.exec(dateIn);

					if (parts[2] == undefined)
					    parts[2] = 0;
		            var p  = parseInt(parts[2]);
					time = new Date(parts[1] - (p * 60000));
				}
				return time;
			},
			mongoDate2string : function(dateIn) {
				return this.formatDateFromMillis(this.mongoDate2millis(dateIn).getTime());
			},
			isEmpty: function(input){
				return (typeof input == 'undefined' || input==null );
			},
			startsWith: function(str, word) {
			    return str.lastIndexOf(word, 0) === 0;
			},
			rgb2Hex: function(rgb){
				if(rgb.indexOf("(")>=0)
					rgb = rgb.match(/\(([^)]+)\)/)[1];
				var component = rgb.split(",");
				return "#" + ((1 << 24) + (parseInt(component[0]) << 16) + (parseInt(component[1]) << 8) + parseInt(component[2])).toString(16).slice(1);
			},
			hex2Rgb: function(hex){
				if(hex.charAt(0)=="#") 
					hex = hex.substring(1,7);
				var r = parseInt((hex).substring(0,2),16);
				var g = parseInt((hex).substring(2,4),16);
				var b = parseInt((hex).substring(4,6),16);
				return r+","+g +","+b;
			},
			hex2Color: function(hex){
				if(hex.charAt(0)=="#") 
					hex = hex.substring(1,7);
				var r = parseInt((hex).substring(0,2),16);
				var g = parseInt((hex).substring(2,4),16);
				var b = parseInt((hex).substring(4,6),16);
				return {r:r, g:g, b:b, opacity: 16};
			},
			formatDateFromMillis: function(millis){
				var formattedDate = "";
				if(millis){
					var date   = new Date(millis);
					var d = date.getDate();
				    var m = date.getMonth() + 1;
				    var y = date.getFullYear();
				    var hh = date.getHours();
				    var mm = date.getMinutes();
					formattedDate = '' + (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/' + y + ' ' + (hh <= 9 ? '0' +hh : hh) + ":" +  (mm <= 9 ? '0' + mm : mm);
				}
				return formattedDate;
			},
			lZero: function(value){
				var result = "00";
				if(!isNaN(value)){
					result= (value <= 9 ? '0' + value : value);
				}
				return result;
				
			},
			formatDate: function(millis, options,lang){
				var result = millis;
				if(millis){
					if(!lang)
						lang = "it-IT";
					else if(lang=='en')
						lang= "en-EN";
					
					//var options = {};
//					if(weekday) options.weekday=weekday;
//					if(year) options.year=year;
//					if(month) options.month=month;
//					if(day) options.day=day;
//					if(hour) options.hour=hour;
//					if(minute) options.minute=minute;
//					if(second) options.second=second;
					
					result = new Date(millis).toLocaleDateString(lang, options);
					
				}
				return result;
				
			},
		    formatStreamDate: function(millis, includeTime){
				var formattedDate = "";
				if(millis){
					var date   = new Date(millis);
					var d = date.getDate();
				    var m = date.getMonth() + 1;
				    var y = date.getFullYear();
				    var hh = date.getHours();
				    var mm = date.getMinutes();
				    var ss = date.getSeconds();
				    
					formattedDate = '' + y + '/' + (m<=9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d);
					if(includeTime)
						formattedDate += ' ' + (hh <= 9 ? '0' +hh : hh) + ":" +  (mm <= 9 ? '0' + mm : mm) + ":" + (ss <= 9 ? '0' + ss : ss);
				}

				return formattedDate;		    			
			},
			isTouchDevice : function () {
				return ("ontouchstart" in document.documentElement);
			}

		},
		"odata": {
			decodeDateFilter: function(attr){
				console.log("attr", attr);
				var minDateFormatted = null;
				var maxDateFormatted = null;
				var minDateMillis = null;
				var maxDateMillis = null;
				if(attr.timeRange!=null && attr.timeRange!=''){
					var minDate =  new Date();
					var maxDate =  new Date();
					
					switch (attr.timeRange) {
						case "today":
							minDate.setHours(0,0,0,0);
							maxDate.setHours(23,59,59,999);						
							break;
						case "yesterday":
							minDate.setDate(minDate.getDate()-1);
							minDate.setHours(0,0,0,0);
							maxDate.setDate(maxDate.getDate()-1);
							maxDate.setHours(23,59,59,999);						
							break;
						case "this_month":
							minDate =  new Date(minDate.getFullYear(), minDate.getMonth(), 1);
							maxDate =  new Date(minDate.getFullYear(), minDate.getMonth()+1, 0);
							maxDate.setHours(23,59,59,999);						
							break;
						case "last_month":
							minDate =  new Date(minDate.getFullYear(), minDate.getMonth()-1, 1);
							maxDate =  new Date(minDate.getFullYear(), maxDate.getMonth(), 0);
							maxDate.setHours(23,59,59,999);						
							break;
						case "this_year":
							minDate =  new Date(minDate.getFullYear(), 0, 1);
							maxDate =  new Date(minDate.getFullYear()+1, 0, 0);
							maxDate.setHours(23,59,59,999);						
							break;
						case "last_year":
							minDate =  new Date(minDate.getFullYear()-1, 0, 1);
							maxDate =  new Date(maxDate.getFullYear(), 0, 0);
							maxDate.setHours(23,59,59,999);						
							break;
						default: // today
							minDate.setHours(0,0,0,0);
							maxDate.setHours(23,59,59,999);						
						break;
					}
					minDateFormatted = this.formatData(minDate.getTime() - (minDate.getTimezoneOffset() * 60000));
					maxDateFormatted = this.formatData(maxDate.getTime() - (maxDate.getTimezoneOffset() * 60000));
					minDateMillis = minDate.getTime() - (minDate.getTimezoneOffset() * 60000);
					maxDateMillis = maxDate.getTime() - (maxDate.getTimezoneOffset() * 60000);
					
				}
				else if(attr.timeMaxDate!=null && attr.timeMaxDate!='' && attr.timeMinDate!=null && attr.timeMinDate!=''){
					minDateMillis = new Date(attr.timeMinDate).getTime();
					maxDateMillis = new Date(attr.timeMaxDate).getTime();
					minDateFormatted = this.formatData(minDateMillis - (new Date().getTimezoneOffset() * 60000));
					maxDateFormatted = this.formatData(maxDateMillis - (new Date().getTimezoneOffset() * 60000));
				}
				else{
					var minDate =  new Date();
					var maxDate =  new Date();
					minDate.setHours(0,0,0,0);
					maxDate.setHours(23,59,59,999);		
					minDateFormatted = this.formatData(minDate.getTime() - (minDate.getTimezoneOffset() * 60000));
					maxDateFormatted = this.formatData(maxDate.getTime() - (maxDate.getTimezoneOffset() * 60000));
					minDateMillis = minDate.getTime() - (minDate.getTimezoneOffset() * 60000);
					maxDateMillis = maxDate.getTime() - (maxDate.getTimezoneOffset() * 60000);
				}

				return {
						"timeFilter": 'time%20ge%20datetimeoffset%27'+minDateFormatted+'%27%20and%20time%20lt%20datetimeoffset%27'+maxDateFormatted+'%27',
						"minDateMillis": minDateMillis,
						"maxDateMillis": maxDateMillis
					};
			},
		    formatData: function(millis){
				var formattedDate = "";
				if(millis){
					var date   = new Date(millis);
					var d = date.getDate();
				    var m = date.getMonth() + 1;
				    var y = date.getFullYear();
				    var hh = date.getHours();
				    var mm = date.getMinutes();
				    var ss = date.getSeconds();
				    
				    var timezone = "02:00";
					formattedDate = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + 'T' + (hh <= 9 ? '0' +hh : hh) + ":" +  (mm <= 9 ? '0' + mm : mm) + ":" + (ss <= 9 ? '0' + ss : ss);
					formattedDate += '+' + timezone;
				}

				return formattedDate;		    			
			},
			extractTimeGroupFilter : function(minDateMillis, maxDateMillis){
				var timeGroupFilter = 'year';
				if(minDateMillis>0 && maxDateMillis> minDateMillis){
					var delta = maxDateMillis-minDateMillis;
					if(delta < Constants.Time.ONE_DAY)
						timeGroupFilter = 'hour_dayofmonth_month_year';
					else if(delta < Constants.Time.ONE_MONTH)
						timeGroupFilter = 'dayofmonth_month_year';
					else if(delta < Constants.Time.ONE_YEAR)
						timeGroupFilter = 'month_year';
				}
				return timeGroupFilter;
			},
			timeGroup2resultKey: function(timeGroupBy){
				var result  =  'year';
				if(timeGroupBy == 'hour_dayofmonth_month_year')
					result = 'hour';
				else if(timeGroupBy == 'dayofmonth_month_year')
					result = 'dayofmonth';
				else if(timeGroupBy == 'month_year')
					result = 'month';
				return result;
			},
			timeGroupLabel: function(timeGroupBy){
				var result  =  'Year';
				if(timeGroupBy == 'hour_dayofmonth_month_year')
					result = 'Hour of the day';
				else if(timeGroupBy == 'dayofmonth_month_year')
					result = 'Day of the month';
				else if(timeGroupBy == 'month_year')
					result = 'Month of the year';
				return result;
			}
			
		}, 
		"csv": {
			downloadCSV : function(csv, filename) {
			    var csvFile = new Blob([csv], {type: "text/csv"});
			    var downloadLink = document.createElement("a");
			    // File name
			    downloadLink.download = filename;
			    // Create a link to the file
			    downloadLink.href = window.URL.createObjectURL(csvFile);
			    // Hide download link
			    downloadLink.style.display = "none";
			    // Add the link to DOM
			    document.body.appendChild(downloadLink);
			    // Click download link
			    downloadLink.click();
				document.body.removeChild(downloadLink);
			},
			prepareKeyValue: function(column, label, data){
				return this.prepareSeriesKeyValue(column, [{label: label, values:data}]);
			},
			prepareSeriesKeyValue: function(column, data){
				console.log(data);
				var csv = column;
				if(data){
					for (var j = 0; j < data.length; j++)
						csv  += ";" + data[j].label;
					csv  += "\r\n";
					for (var i = 0; i < data[0].values.length; i++) {
						csv += data[0].values[i].label;
						for (var j = 0; j < data.length; j++){
							csv += ";" + data[j].values[i].value;
						}
						csv  += "\r\n";
					}
				}
				return csv;
//				var csv = column + ";";
//				if(data && data[0].values){
//					csv  += data[0].label + "\r\n";
//					for (var i = 0; i < data[0].values.length; i++) {
//						csv += data[0].values[i].label +";" + data[0].values[i].value + "\r\n"; 
//					}
//				}
//				return csv;
			},
			prepareSeriesXY: function(column, data){
				var csv = column;
				if(data){
					for (var j = 0; j < data.length; j++)
						csv  += ";" + data[j].label;
					csv  += "\r\n";
					for (var j = 0; j < data.length; j++){
						csv += data[j].values[0].x;
						for (var i = 0; i < data[j].values.length; i++) {
							csv += ";" + data[j].values[i].y;
						}
						csv  += "\r\n";
					}
				}
				return csv;
			},

		},
		"statistic": {
			timeAggregation : function(data){
				result = [];
				var labelFormat = "%H:%M";
				var dataValues = [];
				
				if(data!=null && data.length>1){
					var maxTime = data[0][0].getTime();
					var minTime = data[data.length-1][0].getTime();
					var elapsed = maxTime-minTime;
					var segment  = Constants.Time.ONE_YEAR;
					if(elapsed<Constants.Time.ONE_MINUTE){
						segment = Constants.Time.ONE_MINUTE/6;
						labelFormat = "%s s";
					}
					else if(elapsed<Constants.Time.ONE_HOUR){
						segment = Constants.Time.ONE_HOUR/6;
						labelFormat = "%m min";
					}
					else if(elapsed<Constants.Time.ONE_DAY){
						segment = Constants.Time.ONE_HOUR/12;
						labelFormat = "%H:%M";
					}
					else if(elapsed<Constants.Time.ONE_MONTH){
						segment = Constants.Time.ONE_MONTH/15;
						labelFormat = "%d/%M";
					}
					else if(elapsed<Constants.Time.ONE_YEAR){
						segment = Constants.Time.ONE_YEAR/12;
						labelFormat = "%b/%y";
					}
					segment = elapsed/10;
					var time = minTime;
					var dataCounter = 0;
				
					var dataList = [];
					for(var i=data.length-1;i>=0; i--){
						
						if(data[i][0].getTime()<time+segment){
							dataList.push(data[i][1]);
							dataCounter++;
						}
						else{
							result.push({"label":time,"value":dataCounter});
							time += segment;//data[i][0].getTime();
							 dataValues.push(dataList);
							dataCounter = 0;
							dataList = [];
						}
					}

				}
				
				console.debug("in", data);
				console.debug("out", result);
				console.debug("dataValues", dataValues);
				return {"data":result, "labelFormat": labelFormat, "dataValues": dataValues};
			}
		},
		"d3color":{
			
			getRange:function(mainChartColor){
				var mainRangeColor = d3.scale.linear().domain([1,10]).range(["white", mainChartColor,"black"]);
				return [mainRangeColor(3),mainRangeColor(7)];
			},
		  	brighter: function(colorHex, k) {
		  		var brighter = 1 / 0.7;
		  		var  color = self.utils.hex2Color(colorHex);
			    k = k == null ? brighter : Math.pow(brighter, k);
			    return self.utils.rgb2Hex("(" + color.r * k + "," + color.g * k + "," + color.b * k + ")");
			},
			darker: function(colorHex, k) {
				var darker = 0.7;
		  		var  color = self.utils.hex2Color(colorHex);
			    k = k == null ? darker : Math.pow(darker, k);
			    return self.utils.rgb2Hex("(" + color.r * k + "," + color.g * k + "," + color.b * k + ")");
			},
		},
		"render": {
//			noExponent: function(input){
//				 var data= String(input).split(/[eE]/);
//			    if(data.length== 1) return data[0]; 
//
//			    var  z= '', sign= this<0? '-':'',
//			    str= data[0].replace('.', ''),
//			    mag= Number(data[1])+ 1;
//
//			    if(mag<0){
//			        z= sign + '0.';
//			        while(mag++) z += '0';
//			        return z + str.replace(/^\-/,'');
//			    }
//			    mag -= str.length;  
//			    while(mag--) z += '0';
//			    return str + z;
//			},
			safeDate: function(input,options){
				var result = input;
				if(input && self.utils.startsWith(input,"/Date(") ){
					var millis = self.utils.mongoDate2millis(input);
					result = self.utils.formatDate(millis, options);
				}
				return result;
			},
			safeNumber : function(input, decimal, isEuro,formatBigNumber) {
				var result = input;
				if(!isNaN(input) ){
					if(input)
						input = parseFloat(input);
					if(isEuro){
						result = this.formatEuro(input, decimal,formatBigNumber);
					}
					else{
						if(isNaN(decimal)){
							if(Math.abs(input)>100)
								decimal=0;
							else if(Math.abs(input)<1){
								decimal= -1*Math.log10(input) +1;
								if(decimal < 0)
									decimal = 0;
								else if(decimal>20)
									decimal =20;
							}
							else
								decimal = 2;
						}
						result = parseFloat(input).toFixed(decimal);
						if(formatBigNumber){
							result = this.format_big_number(result, decimal);
						}
					}
				}
				return result;
			},
			format_big_number:function(input, decimal, lang) {
				var output = "";
				if(!decimal)
					decimal = 2;
				if (input) {
					output = this.formatBigNumberValue(input, decimal);
			    }
				return (""+output).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
			}, 
			formatBigNumberValue: function(input,decimal, lang){
				if(!lang)
					lang = "it";
				//input=Math.trunc(input);
				//console.log("input",input);
				if(input<1000)
					output=parseFloat(input).toFixed(decimal);
				else if(input<1000000)
					output=(input/1000).toFixed(decimal)+(lang=='it'?" mila":" k");
				else if(input<1000000000)
					output=(input/1000000).toFixed(decimal)+(lang=='it'?" mln":" M");
				else 
					output=(input/1000000000).toFixed(decimal).toLocaleString()+(lang=='it'?" mld":" B");
				return output;
			},
            isFloat : function(n){
                return Number(n) === n && n % 1 !== 0;
            },
			completeTweet : function(originalTweet, createdAtFormatted){
				var completeTweet = originalTweet;
				completeTweet.getTextPretty = this.prettifyTwitterMessage(originalTweet.getText);
				completeTweet.createdAtFormatted =  createdAtFormatted;
				completeTweet.twitterLink = 'https://twitter.com/' + originalTweet.userScreenName + '/status/' + originalTweet.tweetid;
				completeTweet.twitterUserLink = 'https://twitter.com/' + originalTweet.userScreenName;
				return completeTweet;
			},
			safeTags : function (stringIn) {
				var outString = "";
				if((typeof stringIn != "undefined") && stringIn!=null){
					var typeStringIN = typeof stringIn;
					if (typeStringIN == "string")
						outString = stringIn.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
					else 
						outString = stringIn;
				}
			    return outString;   

			},
				
			prettifyTwitterUser : function(stringIn){
				var outString = "";
				if((typeof stringIn != "undefined") && stringIn!=null){
					var typeStringIN = typeof stringIn;
					if (typeStringIN == "string")
						outString = stringIn.replace(/(^|\W)(@[a-z\d][\w-]*)/ig, '$1<span class="tweet-user">$2</span>');
					else 
						outString = stringIn;
				}
				return outString;
			},
			prettifyTwitterHashtag : function(stringIn){
				var outString = "";
				if((typeof stringIn != "undefined") && stringIn!=null){
					var typeStringIN = typeof stringIn;
					if (typeStringIN == "string")
						outString = stringIn.replace(/(^|\W)(#[a-z\d][\w-]*)/ig, '$1<span class="tweet-hashtag">$2</span>');
					else 
						outString = stringIn;
				}
				return outString;
			},
			linkify: function(stringIn) {
				var outString = "";
				if((typeof stringIn != "undefined") && stringIn!=null){
					var typeStringIN = typeof stringIn;
					if (typeStringIN == "string"){
					    var  replacePattern1, replacePattern2, replacePattern3;
				
					    //URLs starting with http://, https://, or ftp://
					    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
					    outString = stringIn.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
				
					    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
					    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
					    outString = outString.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
				
					    //Change email addresses to mailto:: links.
					    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
					    outString = outString.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
					} else 
						outString = stringIn;
				}

				return outString;
			},
			prettifyTwitterMessage: function(stringIn){
				var pretty  = this.safeTags(stringIn);
				pretty = this.linkify(pretty);
				pretty = this.prettifyTwitterHashtag(pretty);
				pretty = this.prettifyTwitterUser(pretty);
				return pretty;
			},
			safeColors : function(numOfColors, inputColors, mainColor,kLuminance){
				var colors = new Array();

    			if(inputColors && inputColors!=null && inputColors.length>0){
    				  var sIndex = 0;
    				  for(var k=0; k<numOfColors; k++){
    					  colors.push(inputColors[sIndex]);
    					  sIndex++;
    					  if(sIndex==inputColors.length)
    						  sIndex=0;
    				  }
    			}
    			else if(mainColor){
    				//var startColor = self.d3color.darker(mainColor);
    				//var endColor = self.d3color.brighter(mainColor);
    				var startColor = this.colorLuminance(mainColor, -0.6);
    				var endColor = this.colorLuminance(mainColor, 0.6);
    				var scale = d3.scale.linear().range([startColor, endColor]).domain([0, numOfColors]);//.interpolate(d3.interpolateRgb.gamma(1.9));
    				colors = d3.range(numOfColors).map(function(d) {return scale(d)});
    				
    				//colors.push({max: numOfColors+1, color: d3.scale.linear().domain([1,numOfColors+1]).clamp(true).range(self.d3color.getRange(numOfColors))});
//    				console.log("cccd3", colors)
//    				var colors2 = new Array();
//					  if(!kLuminance)
//					  	kLuminance = .9
//    				  var delta = 2/numOfColors;
//    				  for(var k=0; k<numOfColors; k++){
//    					  colors2.push(this.colorLuminance(mainColor, -kLuminance+k*delta));
//    				  }
//    				  console.log("ccccy", colors2);
    			  }
    			return colors;
			},
			hex2RgbaColor: function(hex,opacity){
			    hex = hex.replace('#','');
			    r = parseInt(hex.substring(0,2), 16);
			    g = parseInt(hex.substring(2,4), 16);
			    b = parseInt(hex.substring(4,6), 16);

			    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
			    return result;
			},
			colorLuminance: function(hex, lum) {
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
			},
			formatEuro : function(input, decimal, bigNumber) {
				var result = input;
				if(typeof decimal == 'undefined' || isNaN(decimal))
					decimal = 2;
				var suffix = " \u20AC";

				if(!isNaN(input) ){
					if(bigNumber)
						result = this.formatBigNumberValue(input, decimal);
					else
						result = parseFloat(input).toFixed(decimal).toString();
				}
				return result.toString().replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") +suffix;

			},
			widgetSize : function(el, $timeout){
	            var parentStyle = window.getComputedStyle(el.parentElement);
	            var paddingLeft= parseInt(parentStyle["paddingLeft"].replace("px",""));
	            var paddingRight= parseInt(parentStyle["paddingRight"].replace("px",""));
	            var paddingTop= parseInt(parentStyle["paddingTop"].replace("px",""));
	            var paddingBottom= parseInt(parentStyle["paddingBottom"].replace("px",""));
	            
	            var paddingWidth = 24 + paddingLeft + paddingRight;
	            var paddingheight = 24 + paddingTop + paddingBottom;
	            return {w:el.parentElement.clientWidth - paddingWidth, h:el.parentElement.clientHeight }

			}
		},
		"data":{ 
			aggregationSeriesKeyValue: function(rows, valueColumns, groupByColumn, chartColors,mainChartColor,seriesDescriptionColumn){
				console.log("aggregationSeriesKeyValue", valueColumns, groupByColumn);
//			[{
//			  "key": "Arrivi totali",
//			  "values": [
//			   {
//			    "key": "BI",
//			    "label": "BI",
//			    "value": 962010,
//			    "color": "#0b001a"
//			   },
//			   {
//			    "key": "NO",
//			    "label": "NO",
//			    "value": 5233298,
//			    "color": "#250059"
//			   },
//             ...
				
				
				
				var dataMap = {};
				var descriptionsMap = {};
				var sliceCount = 0;
				
				if(!valueColumns || valueColumns==null || valueColumns.lenght==0)
					valueColumns = ['empty'];

				var max = {};
				var min = {};
				

				for(var j=0; j<rows.length; j++){
					if(!dataMap[rows[j][groupByColumn]] ){
						dataMap[rows[j][groupByColumn]]  = Array(valueColumns.length).fill(0);
						if(seriesDescriptionColumn)
							descriptionsMap[rows[j][groupByColumn]] = rows[j][seriesDescriptionColumn.key];
						sliceCount++;
					}
					for (var i = 0; i < valueColumns.length; i++) {
						if(valueColumns[i].countingMode=='sum')
							dataMap[rows[j][groupByColumn]][i] += parseFloat(rows[j][valueColumns[i].key]);
						else if(valueColumns[i].countingMode=='max'){
							if(!max[valueColumns[i].key])
								max[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
							else if(max[valueColumns[i].key]>parseFloat(rows[j][valueColumns[i].key]))
								max[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
							dataMap[rows[j][groupByColumn]][i] = parseFloat(rows[j][valueColumns[i].key]);
						}
						else if(valueColumns[i].countingMode=='min'){
							if(!min[valueColumns[i].key])
								min[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
							else if(min[valueColumns[i].key]>parseFloat(rows[j][valueColumns[i].key]))
								min[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
							dataMap[rows[j][groupByColumn]][i] = parseFloat(rows[j][valueColumns[i].key]);
						}
						else
							dataMap[rows[j][groupByColumn]][i]++;
					}
				}

    			console.log("dentro", dataMap);
    			var colors = self.render.safeColors(sliceCount, chartColors,mainChartColor);
    			console.log("colors", colors);
    			var chartData  = new Array();
				for (var i = 0; i < valueColumns.length; i++) {
					var serie = angular.copy(valueColumns[i]);
					serie.realKey = serie.key;
					serie.key = serie.label;
					serie.values = new Array();
					chartData.push(serie);
					//chartData.push({"key":valueColumns[i].label, "values":new Array()});
	    	        var sIndex = 0;
	    	        for (var key in dataMap) {
		        	    if (dataMap.hasOwnProperty(key)) {
		        	    	var d = {"key": key,"label": key, "value": dataMap[key][i]};
		        	    	if(colors  && colors.length>0 && typeof serie.color == 'undefined'){
		        	    		d.color=colors[sIndex];
							}	
							if(seriesDescriptionColumn){
								d.description = descriptionsMap[key];
							}
	        	    	
//		        	    	if(colors.length>0)
//		        	    		d.color=colors[sIndex];
		        	    	chartData[i].values.push(d);
		        	    	sIndex++;
		        	    }
		        	} 
				}
    	        return chartData;
			},
			aggregationSeriesValueKey: function(rows, valueColumns, groupByColumn, chartColors,mainChartColor){
				console.log("aggregationSeriesValueKey", valueColumns, groupByColumn);
				var dataMap = {};
				var sliceCount = 0;

				for(var j=0; j<rows.length; j++){
					if(!dataMap[rows[j][groupByColumn]] ){
						dataMap[rows[j][groupByColumn]]  = {values: {}};
						sliceCount++;
					}
					for (var i = 0; i < valueColumns.length; i++) {
						if(!dataMap[rows[j][groupByColumn]].values[valueColumns[i].key])
							dataMap[rows[j][groupByColumn]].values[valueColumns[i].key] = {key: valueColumns[i].key, label: valueColumns[i].label, value:0}
						
						var value = rows[j][valueColumns[i].key];
						if(valueColumns[i].scale)
							value = value*valueColumns[i].scale;

						if(valueColumns[i].countingMode=='sum')
							dataMap[rows[j][groupByColumn]].values[valueColumns[i].key].value += parseFloat(value);
						else
							dataMap[rows[j][groupByColumn]].values[valueColumns[i].key].value++;
					}
				}


				console.log("dentro", dataMap);
    			var colors = self.render.safeColors(sliceCount, chartColors,mainChartColor);
    			console.log("colors", colors);
				var chartData  = new Array();
				var colorIndex = 0;
				for (var key in dataMap) {
					if (dataMap.hasOwnProperty(key)) {
						var s = {"key": key, label: key, values: new Array()};
						if(colors[colorIndex])
							s.color= colors[colorIndex];
						colorIndex++;
						for (var vKey in dataMap[key].values) {
							if (dataMap[key].values.hasOwnProperty(vKey)) {
								s.values.push(dataMap[key].values[vKey]);
							}
						}
						chartData.push(s);


					}
				}
				console.log("chartData",chartData);

    	        return chartData;
			},
			aggregationValuesValueKey: function(rows, valueColumns,valueColumn, groupByColumn, chartColors,mainChartColor){
				console.log("aggregationValuesValueKey", valueColumns, valueColumn, groupByColumn);
				var dataMap = {};
				
				// prepare values column map for fast access
				var valueColumnsMap = {};
				if(valueColumns){
					for(var i=0;i<valueColumns.length;i++)
						valueColumnsMap[valueColumns[i].value] = valueColumns[i];
				}
				else{
					var side = "L";
					for(var j=0; j<rows.length; j++){
						var v = rows[j][valueColumn.key];
						if(!valueColumnsMap[v]){
							valueColumnsMap[v] = {value:v,label:v,side:side};
							side = side=='L'?'R':'L';
						}
					}					
				}
				
				var sliceCount = 0;

				for(var j=0; j<rows.length; j++){
					var v = rows[j][valueColumn.key];
					var g = rows[j][groupByColumn.key];
					if(valueColumnsMap[v]){						
						if(!dataMap[v]){
							dataMap[v] = valueColumnsMap[v];
							dataMap[v].values = {};
						}
						if(!dataMap[v].values[g]){
							dataMap[v].values[g] = {label:g, value:0};
							sliceCount++;
						}
						dataMap[v].values[g].value++;
					}
				}


				console.log("dentro aggregationValuesValueKey", dataMap);
    			var colors = self.render.safeColors(sliceCount, chartColors,mainChartColor);
    			console.log("colors", colors);
				var chartData  = new Array();
				var colorIndex = 0;
				for (var key in dataMap) {
					if (dataMap.hasOwnProperty(key)) {
						var s = {"key": dataMap[key].label, label: dataMap[key].label,side: dataMap[key].side, values: new Array()};
						if(dataMap[key].color)
							s.color = dataMap[key].color;
						else if(colors[colorIndex])
							s.color = colors[colorIndex];
						colorIndex++;
						for (var vKey in dataMap[key].values) {
							if (dataMap[key].values.hasOwnProperty(vKey)) {
								s.values.push(dataMap[key].values[vKey]);
							}
						}
						chartData.push(s);


					}
				}
				console.log("chartData aggregationValuesValueKey",chartData);

    	        return chartData;
				
			}, 
			aggregationSeriesXY: function(rows, xColumn, serieColumns, chartColors){
				var chartData  = new Array();
				for (var s = 0; s < serieColumns.length; s++) {
        			var dataMap = {};

    				var serie = angular.copy(serieColumns[s])//{key:serieColumns[s].key, values: new Array()};
    				serie.values = new Array();
    				
	        		if(chartColors && chartColors.length>0 && typeof serie.color == 'undefined'){
	        			serie.color = chartColors[s];
	        		}
	    			
					for(var i=0; i<rows.length; i++){
						if(!dataMap[rows[i][xColumn.key]] ){
							dataMap[rows[i][xColumn.key]]  = 0;
						}
						if(serieColumns[s].countingMode=='sum')
							dataMap[rows[i][xColumn.key]] += parseFloat(rows[i][serieColumns[s].key]);
						else
							dataMap[rows[i][xColumn.key]]++;
						
					}
	    	        var sIndex = 0;
	    	        console.log("linechart dataMap",xColumn);

			        for (var key in dataMap) {
			        	if (dataMap.hasOwnProperty(key)) {
			        		var d = {"x": parseInt(key), "y": dataMap[key]};
			        			
			        	    if(serie.shape)
			        	    	d.shape=serie.shape;
			        	    serie.values.push(d);
			        	    sIndex++;
			        	}
			        } 
			        
			        console.log("linechart serie",serie);
	    			serie.key = serie.label;
	    			chartData.push(serie);
    			}
				return chartData;
			},
			aggregationKeyValue: function(rows, valueColumn, groupByColumn, countingMode, chartColors, mainChartColor){
				var seriesData = this.aggregationSeriesKeyValue(rows, [valueColumn], groupByColumn, countingMode, chartColors, mainChartColor);
		        return seriesData[0].values;
			},
			aggregationTree: function(rootLabel, rows, columns, valueColumn, valueColumn2, valueFormat, valueFormat2){
				console.log("aggregationTree",columns);
				var tree = {"name": rootLabel, column:"", absolutedepth: 0, children: new Array(), valueLabel:valueColumn.label};
				if(!valueColumn.countingMode) 
					valueColumn.countingMode = 'count';
				if(valueColumn2){
					tree.valueLabel2 = valueColumn2.label;
					if(!valueColumn2.countingMode) 
						valueColumn2.countingMode = 'count'
						
					
				}
				for (var r = 0; r < rows.length; r++) {
					var keys =  new Array();
					var column = null;
					for (var c = 0; c < columns.length; c++) {
						keys.push({k:rows[r][columns[c].key], c: columns[c], d:c});
					}
					var value = 1;
					if(valueColumn.countingMode== 'sum')
						value = rows[r][valueColumn.key];
					
					if(valueColumn2){
						var value2 = 1;
						if(valueColumn2.countingMode== 'sum')
							value2 = rows[r][valueColumn2.key];
					}				
					tree = this.initTreeNode(tree, keys, value,value2, valueFormat, valueFormat2);
				}
				return tree;
			},
			initTreeNode: function(tree, keys, value, value2, valueFormat, valueFormat2) {
				var cur = tree;
				for (var k = 0; k < keys.length; k++) {
					var key = keys[k].k;
					var col = keys[k].c.key;
					var label = keys[k].c.label;
					var direction = keys[k].c.direction?keys[k].c.direction:"none";

					var childIndex = this.hasNameInArray(cur.children,key);
					if(childIndex==-1){
						if(k==keys.length-1){
							if(value2)
								childIndex = cur.children.push({"name": ""+key, "column":col, "label":label, "direction":direction, "absolutedepth": k+1, "value":0, "value2":0}) -1;
							else
								childIndex = cur.children.push({"name": ""+key, "column":col, "label":label, "direction":direction, "absolutedepth": k+1, "value":0}) -1;
						}
						else
							childIndex = cur.children.push({"name": ""+key, "column":col, "label":label, "direction":direction, "absolutedepth": k+1, children: new Array()}) -1;
					}
				    cur = cur.children[childIndex];
				};

				cur.value += parseFloat(value);
				if(typeof valueFormat != 'undefined' && valueFormat)
					cur.formattedValue = self.render.safeNumber(cur.value, valueFormat.decimalValue, valueFormat.isEuro,valueFormat.formatBigNumber);
				else
					cur.formattedValue = cur.value;
				if(value2){
					cur.value2 += parseFloat(value2);
					if(typeof valueFormat2 != 'undefined' && valueFormat2)
						cur.formattedValue2 = self.render.safeNumber(cur.value2, valueFormat2.decimalValue, valueFormat2.isEuro,valueFormat2.formatBigNumber);
					else
						cur.formattedValue2 = cur.value2;
					
				}

				return tree;
			},
			hasNameInArray: function(arr, name){
				var result = -1;
				for (var i = 0; i < arr.length; i++) {
					if(arr[i].name == name){
						result=i;
						break;
					}		
				}
				return result;
			},
			aggregationTreeDrill: function(rootLabel, rows, columns, columnValues){
				var tree = {"name": rootLabel, column:"", absolutedepth: 0, children: new Array()};
				/*if(!countingMode) 
					countingMode = 'count'*/
				for (var r = 0; r < rows.length; r++) {
					var keys =  new Array();
					var values =  new Array();
					var column = null;
					for (var c = 0; c < columns.length; c++) {
						keys.push({k:rows[r][columns[c]], c: columns[c], d:c});
					}
					for (var p = 0; p < columnValues.length; p++) {
						values.push({k:rows[r][columnValues[p].key], c: columnValues[p].key})   
					}
					tree = this.initTreeNodeDrill(tree, keys, values);
				}
				return tree;
			},
			initTreeNodeDrill: function(tree, keys, values) {
				var cur = tree;
				for (var k = 0; k < keys.length; k++) {
					var key = keys[k].k;
					var col = keys[k].c;

					var childIndex = this.hasNameInArray(cur.children,key);
					if(childIndex==-1){
						if(k==keys.length-1) {
							childIndex = cur.children.push({"name": ""+key, "column":col, "absolutedepth": k+1}) -1;
						}else
							childIndex = cur.children.push({"name": ""+key, "column":col, "absolutedepth": k+1, children: new Array()}) -1;
					}
				    cur = cur.children[childIndex];
				};
				for(var m = 0;m <keys.length;m++) {
					var field = keys[m].c;
					if(!cur[field]) 
						cur[field] = "";
					cur[field] += keys[m].k;
				} 
				for(var i = 0;i < values.length;i++) {
					var field = values[i].c;
					if(!cur[field])
						cur[field] =0;
					cur[field] += values[i].k;
				}
				return tree;
			},
			/*aggregationTreeValues: function(tree,keyColumns,columnValues,maxDeep) {
				var treeWithValue = tree;
				this.recursiveTree(tree,keyColumns,columnValues,maxDeep);
				return treeWithValue;
			},*/
			recursiveTree: function(tree,keyColumns,columnValues,maxDeep){
				var newTree = tree;
				var level = tree.absolutedepth;
				var nChildren = newTree.children.length;
				for( var i = 0;i<nChildren;i++) {
					if(level< maxDeep-2) {
						newTree.children[i] = this.recursiveTree(newTree.children[i],keyColumns,columnValues,maxDeep);
					}
					var vectorKey = this.sumKeys(newTree.children[i],keyColumns);
					for(j = 0; j<keyColumns.length;j++) {
						newTree.children[i][keyColumns[j]] = vectorKey[keyColumns[j]];
					}
					
					var vector = this.sumValues(newTree.children[i],columnValues);
					for(j = 0; j<columnValues.length;j++) {
						newTree.children[i][columnValues[j].key] = vector[columnValues[j].key];
					}
				}
				return newTree;
			},
			sumKeys: function(parent, keyColumns) {
				var added =  new Array();
				for(j = 0; j<keyColumns.length;j++) {
					added[keyColumns[j]] = new Array();
				}
				for(k = 0; k<parent.children.length;k++) {
					var child = parent.children[k]
					for(j = 0; j<keyColumns.length;j++) {
						added[keyColumns[j]][k] = child[keyColumns[j]];
					}
				}
				for(var j = 0; j<keyColumns.length; j++) {
					added[keyColumns[j]] = Array.from(new Set(added[keyColumns[j]].sort())).join(", ");
					added[keyColumns[j]] = Array.from(new Set(added[keyColumns[j]].split(", "))).sort().join(", ");
				}
				
				return added;
			},
			sumValues: function(parent, columnValues) {
				var added =  new Array();
				for(j = 0; j<columnValues.length;j++) {
					added[columnValues[j].key] = 0;
				} 
				for(k = 0; k<parent.children.length;k++) {
					var child = parent.children[k]
					for(j = 0; j<columnValues.length;j++) {
						if(columnValues[j].counting_mode=='sum') {
							added[columnValues[j].key] += child[columnValues[j].key];
						} else if(columnValues[j].counting_mode=='count') {
							added[values[j].key] += 1;
						}
					}
				}
				return added;
			},
			
			aggregationNodesLinks: function(rows, columns, columnValue, countingMode, render, mainColor){

            	console.info("aggregationNodesLinks");
            	var uniqueNode = {};
            	var nodes = [];
            	var matrix = [];
            	var links = [];
            	var linksDictionary = [];
            	var nodeIndex = 0;
            	for(var i=0; i<rows.length; i++){
            		for(var j=0; j<columns.length; j++){
            			if(typeof(matrix[columns[j].key]) == "undefined")
            				matrix[columns[j].key] = [];
	            		if( typeof(uniqueNode[columns[j].key +"_"+rows[i][columns[j].key]]) == "undefined"){
	            			var c = mainColor;
//	            			if(colors && colors[j])
//	            				c = colors[j];
	            			var node = {"name": ""+rows[i][columns[j].key], "index": nodeIndex, "label": ""+rows[i][columns[j].key], "color": c,"fades":true};
	            			console.debug("render",columns[j]+"_"+node.name);
	            			if(typeof render!= 'undefined' && typeof render[columns[j].key+"_"+node.name] != 'undefined'){
	            				var r = render[columns[j].key+"_"+node.name];
	            				if(typeof r.label!=undefined)
	            					node.label = r.label;
	            				if(typeof r.color!=undefined)
	            					node.color = r.color;
	            				if(r.fades=="true")
	            					node.fades = true;
	            				else
	            					node.fades = false;
	            			}
	            			nodes.push(node);
	            			matrix[columns[j].key].push({"node":rows[i][columns[j].key],"index": nodeIndex});
	            			nodeIndex++;
	            		}
	            		uniqueNode[columns[j].key +"_"+rows[i][columns[j].key]] = 0;
            		}
            	}
            	console.debug("nodes", nodes);
            	console.debug("matrix", matrix);
            	
              	for(var i=0; i<rows.length; i++){
            		for(var j=0; j<columns.length; j++){
            			if(j<columns.length-1){
            				var key= columns[j].key;
	            			for(var k=0; k<matrix[key].length; k++){
	            				var source = matrix[key][k];
	    						for(var m=0; m<matrix[columns[j+1].key].length; m++){
	    							var target = matrix[columns[j+1].key][m];
	    							if(typeof(linksDictionary[key+"|"+source.node+"|"+target.node]) == "undefined")
	    	            				linksDictionary[key+"|"+source.node+"|"+target.node] = {"source": source.index, "target":target.index, "value": 0};
	    							if(rows[i][columns[j].key] == source.node && rows[i][columns[j+1].key]  == target.node){
	    								var add = countingMode=='sum'?parseFloat(rows[i][columnValue]):1;
	    								linksDictionary[key+"|"+source.node+"|"+target.node].value += add;
	    							}
	    						}
	            			}
            						
            			}
            					
            		}
            				
            	}
              	
              	

       		
            	
            	console.debug("linksDictionary", linksDictionary);
                for(var key in linksDictionary){
                	if(linksDictionary[key].value!=0)
                		links.push(linksDictionary[key]);
                }
                
            	return {"nodes":nodes, "links": links};
			},
			aggregationForcedirected: function(rows, relations, colors){
				var links = new Array();
				if(relations){
					var relationsMap = {};
					for (var r = 0; r < relations.length; r++) {
						var sourceColumn = relations[r].source;
						var sourceType = relations[r].sourceType;
						var targetColumn = relations[r].target;
						var targetType = relations[r].targetType;
						var relationType = relations[r].relationType;
						var color = relations[r].color?relations[r].color:colors[r];
						var linkLine = relations[r].linkLine?relations[r].linkLine:null;
		              	for(var i=0; i<rows.length; i++){
		              		var source = rows[i][sourceColumn];
		              		var target = rows[i][targetColumn];
		              		if(!relationsMap[source + "_" + target])
		              			relationsMap[source + "_" + target] = {};
		              		relationsMap[source + "_" + target] = {"source":source, "sourceType": sourceType,"target":target, "targetType": targetType,type:relationType, "color": color, "linkLine": linkLine};
		              	}
					}
					
					for (var relationKey in relationsMap) {
					    if (relationsMap.hasOwnProperty(relationKey)) {
					    	links.push(relationsMap[relationKey]);
					    }
					}

				}
				console.log("links", links);
				return links;
			}
			
		},
		"geo": {
			fitGeojson : function(geojson,width,height, geoprojection){
				var c = d3.geo.centroid(geojson);
				// Create a unit projection.
				var projection = self.geo.getProjection(1,c ,[0,0], geoprojection);
				// Create a path generator.
				var path = d3.geo.path().projection(projection);
				// Compute the bounds of a feature of interest, then derive scale & translate.
				var b = path.bounds(geojson),
				    s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
				    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

				// Update the projection to use computed scale & translate.
				console.log("offset s c t ",s,c,t);
				return d3.geo.path().projection(self.geo.getProjection(s,c,t, geoprojection));

			},
			getProjection: function(scale, center, offset,geoprojection){
				if(!geoprojection)
					return d3.geo.mercator().scale(scale).center(center).translate(offset);
				else if(geoprojection == 'azimuthalEqualArea')
					return d3.geo.azimuthalEqualArea().scale(scale).center(center).translate(offset);
				else if(geoprojection == 'azimuthalEquidistant')
					return d3.geo.azimuthalEquidistant().scale(scale).center(center).translate(offset);
				else if(geoprojection == 'conicConformal')
					return d3.geo.conicConformal().scale(scale).center(center).translate(offset);
				else if(geoprojection == 'conicEqualArea')
					return d3.geo.conicEqualArea().scale(scale).center(center).translate(offset);
				else if(geoprojection == 'conicEquidistant')
					return d3.geo.conicEquidistant().scale(scale).center(center).translate(offset);
				else if(geoprojection == 'equirectangular')
					return d3.geo.equirectangular().scale(scale).center(center).translate(offset);
				else if(geoprojection == 'gnomonic')
					return d3.geo.gnomonic().scale(scale).center(center).translate(offset);
				else if(geoprojection == 'orthographic')
					return d3.geo.orthographic().scale(scale).center(center).translate(offset);
				else if(geoprojection == 'stereographic')
					return d3.geo.stereographic().scale(scale).center(center).translate(offset);
				else
					return d3.geo.mercator().scale(scale).center(center).translate(offset);
				
			}
			
		},
		"svg":{
			createSvg: function(svgAttrs, tag, tagAttrs,  defs, text, textAttrs){
	            console.log("svgAttrs", svgAttrs);
				var svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
	            for (var k in svgAttrs)
	                svg.setAttribute(k, svgAttrs[k]);

	            var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
	            for (var k in tagAttrs)
	                el.setAttribute(k, tagAttrs[k]);
	            
	            if(defs)
	            	svg.appendChild(defs);
	            svg.appendChild(el);
	            if(text){
	            	var t = document.createElementNS('http://www.w3.org/2000/svg', "text");
	            	for (var k in textAttrs)
						t.setAttribute(k, textAttrs[k]);				
					t.textContent = text;
					svg.appendChild(t);
	            }

	            
	            return svg;
	        },
	        updateSvg: function(svgString, svgAttrs, tagAttrs, defs, text, textAttrs){
	        	var svg = new DOMParser().parseFromString(svgString, "text/xml").children[0];
	        	for (var k in svgAttrs)
	        		svg.setAttribute(k, svgAttrs[k]);
	        	
	        	if(defs)
	        		svg.appendChild(defs);

	        	for (var i = 0; i <= svg.childNodes.length; i++) {
	        		if(svg.childNodes[i].nodeName =='g' || svg.childNodes[i].nodeName =='path'){
	        			el = svg.childNodes[i];
	        			break;
	        		}
				}
	
	
				for (var k in tagAttrs)
					el.setAttribute(k, tagAttrs[k]);				
	            svg.appendChild(el);
	            
	            if(text){
	            	var t = document.createElementNS('http://www.w3.org/2000/svg', "text");
	            	for (var k in textAttrs)
						t.setAttribute(k, textAttrs[k]);				
					t.textContent = text;
					svg.appendChild(t);
	            }
	            
	            return svg;
				
	        }, 
	        createPercentage: function(svgId, percentage, fullColor, emptyColor, strokeColor, orientation, isPath){
	        	var defs= document.createElementNS('http://www.w3.org/2000/svg', 'defs');

	        	var background= document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
	        	background.setAttribute('id', svgId + 'bg');
	        	
	        	background.setAttribute('x1', '0%');
	        	background.setAttribute('y2', '0%');
	        	background.setAttribute('gradientUnits','userSpaceOnUse');
	        	if(orientation=='horizontal'){
	        		background.setAttribute('y1', '0%');
	        		background.setAttribute('x2', '100%');
	        	}
	        	else{
	        		background.setAttribute('y1', '100%');
	        		background.setAttribute('x2', '0%');
	        	}
	        	
	        	var backgroundStopFill= document.createElementNS('http://www.w3.org/2000/svg', 'stop');
	        	backgroundStopFill.setAttribute('offset', percentage);
	        	backgroundStopFill.setAttribute('stop-color', fullColor);

	        	var backgroundStopEmpty= document.createElementNS('http://www.w3.org/2000/svg', 'stop');
	        	backgroundStopEmpty.setAttribute('offset', percentage);
	        	backgroundStopEmpty.setAttribute('stop-color', emptyColor);

	        	
	        	var backgroundAnimation= document.createElementNS('http://www.w3.org/2000/svg', 'animate');
	        	backgroundAnimation.setAttribute('dur', '0.5s');
	        	backgroundAnimation.setAttribute('attributeName', 'offset');
	        	backgroundAnimation.setAttribute('fill', 'freeze');
	        	backgroundAnimation.setAttribute('from', '0');
	        	backgroundAnimation.setAttribute('to', percentage);
	        	
	        	backgroundStopFill.appendChild(backgroundAnimation);
	        	background.appendChild(backgroundStopFill);

	        	backgroundStopEmpty.appendChild(angular.copy(backgroundAnimation));
	        	background.appendChild(backgroundStopEmpty);

	        	defs.appendChild(background);
	        	
	        	var stroke= document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
	        	stroke.setAttribute('id', svgId + 'stroke');

	        	var strokeStop= document.createElementNS('http://www.w3.org/2000/svg', 'stop');
	        	strokeStop.setAttribute('offset', '0');
	        	strokeStop.setAttribute('stop-color', strokeColor);
	        	
	        	stroke.appendChild(strokeStop);
	        	defs.appendChild(stroke);

	        	return defs;
	        },
	        createText: function(text, fill, stroke){
	        	
	        },
	        sizeAttrs : function(tag, w, h){
	        	var attrs = {};
	        	switch (tag) {
				case 'ellipse':
					attrs["cx"] =  w/4+1;
					attrs["cy"] =  h/4;
					attrs["rx"] =  w/4;
					attrs["ry"] =  h/4;
					break;
				case 'circle':
					attrs["cx"] =  (w>h?h:w)/4+1;
					attrs["cy"] =  (w>h?h:w)/4;
					attrs["r"] =  (w>h?h:w)/4;
					break;
				default:
					attrs["width"] =  w;
					attrs["height"] =  h;
					break;
				}
	        	
	        	return attrs;
	        },
	        baseSize: function(points){
	        	var width = 0;
	        	var height = 0;
	        	if(points){
	        		var allPoints = points.split(" ");
	        		for (var i = 0; i < allPoints.length; i++) {
						var w=parseFloat(allPoints[i].split(",")[0]);
						var h=parseFloat(allPoints[i].split(",")[1]);
						width = w>width?w:width;
						height = h>height?h:height;
					}
	        	}
	        	return [width, height];
	        }
		},
		"event": {
			createEvent:  function(sourceId, widget,  eventtype, data, eventControlId){
				return {"sourceId":sourceId,"widget": widget, "eventtype":eventtype,"data":data, "eventControlId":eventControlId};
			},
			clearArrayTextFilter: function(filterMap, key){
				if(filterMap){
					for (var filterKey in filterMap) {
					    if (filterKey.startsWith(key)) {
							delete filterMap[filterKey];
					   
					    }
					}
				}
				return filterMap;
			},
			updateTextFilter : function(originalFilter, newFilterMap, columnDataTypeMap){
				//filter='a' eq provincia and idDataset gt 1&$top=15&$orderby=internalId%20desc
				//originalFilter = (!originalFilter?"":" and ";
				var result = "";
				if(originalFilter)
					result = originalFilter;
				for (var newFilterKey in newFilterMap) {
				    if (newFilterMap.hasOwnProperty(newFilterKey)) {
				    	var newFilter = newFilterMap[newFilterKey];
	
				    	if(newFilter.value && newFilter.value !=null && newFilter.value != ""){
				        	if(result != "")
				        		result += ' and ';
				        	var quote = columnDataTypeMap[newFilter.column] == 'number'?"":"\'";
				        	if(columnDataTypeMap[newFilter.column] == 'number'){
				        		if(newFilter.advanced)
				        			result += newFilter.column + " " + newFilter.advanced + " " +newFilter.value;
				        		else
				        			result += newFilter.value + " eq " +newFilter.column;
				        	}
				        	else{
				        		if(newFilter.advanced){
				        			if(newFilter.advanced == 'startWith'){
				        				result += 'startswith(' + newFilter.column + ',\''+ newFilter.value + '\')';
				        			}
					        		else if(newFilter.advanced == 'endWith'){
				        				result += 'endswith(' + newFilter.column + ',\''+ newFilter.value + '\')';
					        		}	
					        		else{
						        		result += '\'' + newFilter.value + "\' eq " +newFilter.column;
					        		}
				        		}
				        		else{
				        			result += '(substringof(\''+ newFilter.value + '\','+newFilter.column +') eq true)';
				        		}
				        	}
				        	
				    	}
				    }
				}
				console.log("filter", result);
				return result;
				
			},
			readWidgetEventAttr: function(attr){
				var evtConfig = {};
				angular.forEach(attr, function (eventAttrvalue, eventAttrkey) { 
					if(eventAttrkey.startsWith('evt')){
						evtConfig[eventAttrkey] = eventAttrvalue;
					}
	            });
				return evtConfig;
			},
			ignoreEvent: function(event, eventconfig){
				console.debug("ignoreEvent: event", event);
				console.debug("ignoreEvent: eventconfig",eventconfig);
				var result = false;
				// mapping event type with directive config
				var eventDirectiveConfigMap = {	"dataset.change.group_by_column":"evtChangeGroupbycolumn",
												"dataset.change.value_column":"evtChangeValuecolumn",
												"dataset.filter.text":"evtFiltertext",
												"dataset.filter.odata":"evtFilterodata",
												"dataset.de_highlight.group_by_column":"evtHighlightGroupbycolumn",
												"dataset.highlight.group_by_column": "evtDehighlightGroupbycolumn"};
				
				var configKey =  eventDirectiveConfigMap[event.eventtype];


				var config = {enabled:true, onlySameDataset: false};
				if(eventconfig[configKey])
					config = JSON.parse(eventconfig[configKey]);
				
				
				if(configKey){
					//console.log("eeeee config ", config );
					
					if(config["enabled"] !== true)
						result = true;
					else if(event.eventControlId && eventconfig.evtAcceptedControlIds && eventconfig.evtAcceptedControlIds.length>2){
						result = true;
						var evtAcceptedControlIds = JSON.parse(eventconfig.evtAcceptedControlIds);
						for (var i = 0; i < evtAcceptedControlIds.length; i++) {
							if(event.eventControlId == evtAcceptedControlIds[i]){
								result = false;
								break;
							}
						}
					}
					
					if(!result && config.onlySameDataset){
						result = !event.data.datasetcode || event.data.datasetcode != datasetcode;
					}
				}
				return result;
			}
		}

	};
	return self;



}]);

