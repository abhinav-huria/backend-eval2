
  const express = require('express')
const fs = require('fs')
const app = express();
const port = 80;

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}))

app.get("/",(req,res) =>{
    res.sendFile( __dirname + "/public/index.html" );
})

app.post("/submitFeedback",(req,res) => {
    console.log(req.body);
  const {fname,lname,email,feedback} = req.body;

  fs.readFile("./data.txt", "utf-8",function(err, data)
	{

    let records;

    if(data.length === 0){
			records = [];
		}
		else{
			try{
				records = JSON.parse(data);
			}
			catch(err){
				records = {};
			}
		}

    records.push({fname,lname,email,feedback});

    fs.writeFile("./data.txt", JSON.stringify(records), function(err)
		{
			if(err)
			{
				res.send("Error while saving");
				return;
			}	
		})

    res.sendFile( __dirname + "/public/index.html");
	})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
