	var result = [];
var result1= [];

	var fs = require('fs'),
	    readline = require('readline'),
	    stream = require('stream');
	
	var arrest="arrest.json";
	
	fs.writeFileSync(arrest,' ','utf-8');
	var instream = fs.createReadStream('Crimes_-_2001_to_present.csv');
	var writableStream = fs.createWriteStream('file2.json');
	var outstream = new stream;
	outstream.readable = true;
	outstream.writable = true;

	 var ended = false;
	 instream.on('end', () => { ended = true });

	var rl = readline.createInterface({
	    input: instream,
	    output: outstream,
	    terminal: false
	});

	var lineCount=0;
	var myHeader="";
	var num=0;
	var n8=0;
	var n9=0;

	//var nobj={};

	rl.on('line', function(line) 
	{
	    
				var headers = myHeader.split(",");//all headers

				var obj = {};

				var row = line,
				headCount = 0,
				startValue = 0,
				count = 0;
				
					
					while (count < row.length) 
					{
						

						var c = row[count];

						if (c == '"') 
						{
							do
							{
								c = row[++count]; 
								
							} 
							while(c !== '"' && count < row.length - 1);
						}

						if (c == ',' || count == row.length - 1) 
						{
							var value = row.substr(startValue,count - startValue).trim();//one column

							if (value[0] == '"') 
							{ 
								value = value.substr(1); 
							}
							if (value[value.length - 1] == ',') 
							{ 
								value = value.substr(0, value.length - 1); 
							}
							if (value[value.length - 1] == '"') 
							{ 
								value = value.substr(0, value.length - 1); 
							}

							var key = headers[headCount++];
							obj[key] = value;
							startValue = count + 1;
						}
						++count;
					}
					if(lineCount==0)
					{
						lineCount++;
						myHeader=line;
					}
					else
					{
						//console.log(obj.Arrest);
						
	                    if((obj['Primary Type'] ==='ASSAULT') && (+obj.Year>2001) && (+obj.Year<2016)  )
	                    {
	                    	//console.log("jkjkjk");
	                    	   var nobj={};
								nobj['Year']=obj.Year;
	                    		nobj['Arrest']=obj.Arrest;

	                    		//console.log(obj.Year+"   "+obj.Description     );
	                    	//	console.log(nobj);
	                    		result.push(nobj);

	                           //  console.log(result);

	                    	
					   }
					}
					 

					
			
	});


	rl.on('close',function()    
		{
		 //console.log(result.length+"    klkl   ");  
		//console.log(result);
	      
	//console.log(";;;;;;;;;;;;;;;;;;;;;;;;new arrays;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
	/*console.log(newarray);  

		newarray=result.filter(function (el) {  return (+el.Year ===2009 );});
	     console.log("lemgth of new array is    2009"+newarray.length+" ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
	 	
	 */


	for(var o=2001;o<=2016;o++)
	{

		var obj1={};
		var newarray=result.filter(function (el) {  return (+el.Year ===o  && el. Arrest==='false' );});
		//console.log("length of     "+o+"   is    "+newarray.length+"      and no arrested");
		/*if(newarray.length!=0)
		{
			console.log("length of     "+o+"   is    "+newarray.length+"      and for over  $500");
		}*/

	     obj1['Year']=o;
	     obj1['NotArrest']=newarray.length;
	      newarray=result.filter(function (el) {  return (+el.Year ===o  && el. Arrest==='true' );});
		
		//console.log("length of     "+o+"   is    "+newarray.length+"      and arrested     ");
		/*if(newarray.length!=0)
		{
			console.log("length of     "+o+"   is    "+newarray.length+"      and for under  $500     ");
		
		}
	*/
		 obj1['Arrest']=newarray.length;
		 result1.push(obj1);
		 fs.writeFile(arrest, JSON.stringify(result1)+"\n", 'utf8',function(err){});
	}


		//fs.writeFile('myjsonfile.json', json, 'utf8', callback);

		});













