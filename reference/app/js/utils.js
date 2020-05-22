var Utils = Utils || {};

Utils.prettifyCss = function(cssElementRow){
	var cssPretty = "";
	if(cssElementRow){
		var singleElement = cssElementRow.split(";");
		for (var i = 0; i < singleElement.length; i++) {
			if(singleElement[i]!=null && singleElement[i].trim()!=''){
				var singleElementSplitted = singleElement[i].split(":");
				if(singleElementSplitted.length>1){
					cssPretty += "<span class='atn'>"+singleElementSplitted[0]+"</span>";
					cssPretty += ":";
					cssPretty += "<span class='atv'>"+
						singleElementSplitted[1].replace("px", "<span class='px'>px</span>")
						+"</span>";

				}
				else{
					cssPretty += singleElementSplitted[0];
				}
				cssPretty += ";";
			}
		}
	}

	return cssPretty;

};

Utils.has = function(obj, key) {
    return key.split(".").every(function(x) {
        if(typeof obj != "object" || obj === null || !(x in obj))
            return false;
        obj = obj[x];
        return true;
    });
};
//var widgetCodeRaw = $scope.getHtmlContent(c);
//var widgetCode = prettifyHtml(widgetCodeRaw);
//var widgetStyleRaw = $scope.getCssContent(c);
//var widgetStyle = prettifyCss(widgetStyleRaw);

Utils.render = {
		prettifyHtml: function(code, hellip){
			var prettycodeTokens; 
			if(code && code.includes("/>")){
				prettycodeTokens = code.replace("<","&lt;").replace("/>","").replace(/\s\s+/g, ' ').match(/(?:[^\s"']+|['"][^'"]*["'])+/g) ;
				prettycodeTokens[0] = "<span class='tag'>"+prettycodeTokens[0] +"</span><br>";
				for (var i = 1; i < prettycodeTokens.length; i++) {
					console.debug("prettycodeTokens[i]",prettycodeTokens[i]);
					if(!hellip)
						prettycodeTokens[i] = "&nbsp;&nbsp;<span class='atn'>"+prettycodeTokens[i].replace("=","</span>=<span class='pun'>") + "</span><br>";
					else{
						var singleToken = prettycodeTokens[i].split("=");
						if(singleToken[1]){
							var singleValue = singleToken[1].length<hellip?singleToken[1]:singleToken[1].substring(0, hellip-3) +"...";
							
							prettycodeTokens[i] = "&nbsp;&nbsp;<span class='atn'>"+singleToken[0] +"</span>=<span class='pun' title='"+singleToken[1].replace("'","") +"'>" + 
							singleValue+ "</span><br>";
						}
						else{
							prettycodeTokens[i] = "";
						}
						
						
					}
				}
				
				prettycodeTokens.push("<span class='tag'>/&gt;</span>");
				return prettycodeTokens.join(" ");
			}
			else{
				var test_element = document.createElement('div');
				test_element.innerHTML = code;
				var element = test_element.childNodes[0];
				console.log("ttt,", element);
				
				var tagName = element.tagName.toLowerCase();
				console.log("tagName,", tagName );
				var attributes = "";
				for (var i = 0; i < element.attributes.length; i++) {
					attributes += "<span class='atn'>" + element.attributes[i].name + "</span>=<span class='pun'>'" +  
					element.attributes[i].value + "'</span> ";
					if( element.attributes.length>1) 
						attributes += "<br>&nbsp;&nbsp;";
				}
				
				var content = element.textContent;
				var prettyHtml = "<span class='tag'>&lt;" + tagName + " "+ attributes  + "&gt;</span><br>&nbsp;&nbsp;&nbsp;&nbsp;" + 
					content + "<br><span class='tag'>&lt;/" + tagName + "&gt;</span>";
				

				return prettyHtml;
			}
		},
		prettifyCss: function(code){
			var out = "";
			if(code){
				var rows = code.split("\n");
				for (var i = 0; i < rows.length; i++) {
					if(rows[i]!=""){
						var selector = rows[i].split("{")[0];
						var rules = rows[i].split("{")[1].replace("}","");
						out += "<div><span class='slc'>"+selector+"</span>{" +  Utils.prettifyCss(rules) + "}</div>";
					}
				}
			}
			return out;
		}
}

Utils.widget = {
	getWidgetCodeRaw : function(c){		
		var out = "";
		if(c && (c.type=='yucca-widget' || c.type=='yucca-control')){
			out += "<"+c.content.directive;
			angular.forEach(c.content.params, function(param_section, param_section_key){
				angular.forEach(param_section, function(p, p_key){
			    	if(p.values != null && p.values !=="")
			    		if(typeof p.values == 'string')
			    			out += " " +p.name + "='"+p.values.replace(/'/g, "\\'")+"'\r\n"; 
			    		else
			    			out += " " +p.name + "='"+p.values+"'\r\n"; 
			    });
			});
			angular.forEach(c.content.events, function(event_section, event_section_key){
				angular.forEach(event_section, function(e, e_key){
			    	if(e.values != null && e.values !="")
			    		out += " " +e.name + "='"+e.values+"'\r\n"; 
			    });
			});
//			for (var property in c.content.advancedParams) {
//			    if (c.content.advancedParams.hasOwnProperty(property)) {
//			    	var p = c.content.advancedParams[property];
//			    	if(p.values != null && p.values !="")
//			    		out += " " +p.name + "='"+p.values+"'"; 
//			    }
//			}
			out += "></" + c.content.directive + ">";
			
		}
		else if(c && c.type=='yucca-html'){
			out = c.content.htmlstring;
		}
		else if(c && c.type=='yucca-advanced-widget'){
			out += "<"+c.directive;
			angular.forEach(c.params, function(p, p_key){
		    	if(p.values && p.values != null && p.values !="")
		    		if(p.values instanceof Array){
		    			var valuesArray  = "";
		    			for (var i = 0; i < p.values.length; i++) {
		    				valuesArray +="\"" + p.values[i].replace(/'/g, "\\'")+"\","
						}
		    			out += " " +p.name + "='["+valuesArray+"]'";
		    		}
		    		else if(typeof p.values == 'string')
		    			out += " " +p.name + "='"+p.values.replace(/'/g, "\\'")+"'"; 
		    		else
		    			out += " " +p.name + "='"+p.values+"'"; 
			});
			angular.forEach(c.advancedParams, function(p, p_key){
		    	if(p.values && p.values != null && p.values !="")
		    		if(p.values instanceof Array){
		    			var valuesArray  = "";
		    			for (var i = 0; i < p.values.length; i++) {
		    				valuesArray +="\"" + p.values[i].replace(/'/g, "\\'")+"\","
						}
		    			out += " " +p.name + "='["+valuesArray+"]'";
		    		}
		    		else if(typeof p.values == 'string')
		    			out += " " +p.name + "='"+p.values.replace(/'/g, "\\'")+"'"; 
		    		else
		    			out += " " +p.name + "='"+p.values+"'"; 
			});
			
			out += "/>";

		}
		return out;
	},
	getWidgetCssRaw : function(c){
		var out = "";
		var widgetId = "";
		if(c && c.type!='yucca-empty'){
			if(c.content.params.advanced.widget_id.values)
				widgetId += "#"+c.content.params.advanced.widget_id.values;

			angular.forEach(c.content.styles, function(style_section, style_section_key){
				angular.forEach(style_section, function(s, s_key){
			    	if(s.custom != null && s.custom !=""){
			    		if(c.type=='yucca-widget')
			    			out += widgetId+".yucca-widget " +s.selector+ "{"+s.custom+"}\n";
			    		else
			    			out +=  widgetId + " " + s.selector + "{"+s.custom+"}\n";
			    	}
			    	
			    });
			});
		}
		return out;			
	}
};



