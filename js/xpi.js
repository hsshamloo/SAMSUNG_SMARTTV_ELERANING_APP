function send_statement(studentName,viddeoWatched){  
        var conf = {  
             "endpoint" : "https://trial-lrs.yetanalytics.io/xapi/",  
             "auth" : "Basic " + toBase64("2755eabecc5875fbecc8fcf43633fc7c:2a59cba476b4459efaf4f66fed52f107")  
             };  
  
        ADL.XAPIWrapper.changeConfig(conf);  
           
        
        
        //define the xapi statement being sent  
        var statement = {  
            "actor": {  
                "mbox": "mailto:Tester@example.com",  
                "name": studentName,  
                "objectType": "Agent"  
            },  
            "verb": {  
                "id": viddeoWatched,  
                "display": {"en-US": "Whatched Video"}  
            },  
            "object": {  
                "id": viddeoWatched,  
                "definition": {  
                    "name": {"en-US": "Watched Video"},  
                    "description": {"en-US": viddeoWatched}  
                },  
                "objectType": "Activity"  
            }  
        }; //end statement definition  
   
        // Dispatch the statement to the LRS  
        var result = ADL.XAPIWrapper.sendStatement(statement);  
        }