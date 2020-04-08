--------------------------------------------------------------------- 
* Test bower publishing with private local instance of bower
---------------------------------------------------------------------

1 - install private-bower  https://www.npmjs.com/package/private-bower
	from node.js cmd prompt install
		npm install -g private-bower
	then run 
		private-bower
	go to url http://localhost:5678/
2 - in the root forlder create a file named .bowerrc with
	{
		"registry": "http://localhost:5678",
		"timeout": 300000
	}
3 - from node.js cmd prompt  run 
	bower register yucca-angular-widgets https://github.com/csipiemonte/yucca-angular-widgets.git

4 - testing: in a different folder copy folder .bowerrc and from node.js cmd prompt  run 
	bower install yucca-angular-widgets
	
--------------------------------------------------------------------- 
* Test if bower.json is correct
---------------------------------------------------------------------
1 - install bower-json https://www.npmjs.com/package/private-bower
	npm install bower-json
2 - create a js file with this content
    
	var bowerJson = require('bower-json');

	// Can also be used by simply calling bowerJson()
	bowerJson.read('./bower.json', function (err, json) {
		if (err) {
			console.error('There was an error reading the file');
			console.error(err.message);
			return;
		}

		console.log('JSON: ', json);
	});
	
3 - from node.js cmd prompt  run 
	node check_bower.js


--------------------------------------------------------------------- 
* Publish on real bower
---------------------------------------------------------------------
Nothing to do: Bower use the github release: if no release it will use the master
