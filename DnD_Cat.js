var Discord = require('discord.js')
const { reverse } = require('dns')

var client = new Discord.Client()
var pet = 0
var rand = 0
var roll = new Array()
var total = 0
var organized = ""
var people = 0
var initiative = new Array()
var names = new Array()
var message
var iteration = 0
var min = 100
var go = false





const prefix = "&"











client.on('ready', () => {



    console.log(client.guilds)
    console.log("Connected as " + client.user.tag);

    setInterval (serverCount, 15000)
    client.user.setActivity("&help in " + client.guilds.cache.size + " servers")


    //timer code currently disabled as the bot is now running on multiple servers

    //creates a timer to remind my players about D&D
    //setInterval(function(){ // Set interval for checking
        //var date = new Date();// Create a Date object to find out what time it is
    
        //var week = date.getDay();
    
        //console.log(week);
        //console.log(date.getHours());
        ///console.log(date.getMinutes());
    
        //if(date.getHours() === 8 && date.getMinutes() === 0 && week == 4){ // Check the time
            //var channel = client.channels.cache.get('735284750998306920');
                //channel.send('@everyone dnd today');
       /// }
  //  }, 60000); // Repeat every 60000 milliseconds (1 minute)
    
    

})



client.on('message', (recievedMessage, channel) => {

    //stops the if statements if the bot is the one that sent a message, prevents loops

    




    if (recievedMessage.author == client.user){


        return

    }

    else {





    console.log(recievedMessage.content.startsWith)
        //checks if the command symbol was used
        if (recievedMessage.content.startsWith("&")) {



                //if so it sends the message to the function that checks what the command is
                processCommand(recievedMessage)


        }


    }
})



function serverCount (){
    //updates the bots count of how many servers it is in

    client.user.setActivity("&help in " + client.guilds.cache.size + " servers")

}


function processCommand(recievedMessage){




    






    //removes the symobl
    let fullCommand = recievedMessage.content.substr('1')

    //splits the message into seperate words in an array
    let splitCommand = fullCommand.split(" ")

    //sets the command to look for as the first index of the array
    let primaryCommand = splitCommand[0]
  
    console.log(primaryCommand);

    if (primaryCommand == "pet"){


        pet++;

        recievedMessage.channel.send("The cat has been pet " + pet + " times")


}

else if (primaryCommand == "help"){


    

    recievedMessage.channel.send("Thank you for choosing the D&D cat! Here are some of the basic commands ")
    recievedMessage.channel.send("``` &help- Accesses this page ```")
    recievedMessage.channel.send("``` &pet- Pets the D&D cat ```")
    recievedMessage.channel.send("``` &roll- (amount of dice) d(how many sides it has)- Allows you to roll as many dice as you want, up to discords character limit ```")
    recievedMessage.channel.send("``` &randchar- Generates random character stats (5e compliant) ```")
    
}



else if (primaryCommand == "roll"){
        console.log(splitCommand.length)

        //checks if the roll command was given the correct format
        
        if(splitCommand.length != 3){

            recievedMessage.channel.send("Please use the correct format for rolling dice: &roll (amount of dice) d(how many sides it has)")



        }
        else{

            //grabs the 2nd index of the array and uses it as the amount of dice rolled
        var amount = parseInt(splitCommand[1])
        organized += "["


        for( var x = 0; x<amount; x++){

            if (x==amount-1){

                roll[x] = Math.floor(Math.random() * splitCommand[2].substr('1'))+1;
                var num = parseInt(roll[x]);
                total += num;
                var temp = roll[x].toString();
                console.log("x:" + x); 
                organized += temp;


            }

            else{
            //recievedMessage.content.substr('1')
            //grabs the 3rd index in the array and uses that as how many sides it has
            roll[x] = Math.floor(Math.random() * splitCommand[2].substr('1'))+1
            //adds it to an array
            num = parseInt(roll[x])
            total += num;
            temp = roll[x].toString()
            organized += temp + ", "
            
           
            }
        }
        
        organized += "]"


        //checks if the end product will be greater than 2000 characters before it sends it to the discord
        if(organized.length>1999){

            recievedMessage.channel.send("Please choose a lower amount of dice, this is too many to send into discord")

        }
        else{
       
        recievedMessage.channel.send(organized)
        recievedMessage.channel.send(total)
        
        }
        }

        roll = [];
        organized = ""
        total = 0;
        
}

else if (primaryCommand == "randchar"){


    console.log("test")

    for (var i = 0; i < 6; i++){

        

        roll = []

        

        organized += "["


    


        for( x = 0; x<4; x++){

            

                
        


        
        roll[x] = Math.floor(Math.random() * 6)+1

        }

        if (roll.length == 4){


            //finds the lowest number in the array
            for(var a = 0; a <roll.length; a++){

                if (roll[a]<min){

                        min = roll[a]
                        iteration = a


                }

                if (a == 3){


                    go = true

                }



            }




        }
        
        
       

        

        if(roll.length == 4 && go){

                    
            for (var t = 0; t < roll.length; t++){
                
                console.log(t)
        
                if (t == iteration){
        
                    temp = parseInt(roll[iteration])
        
                    organized += "~~" + temp + "~~" +  ", "
        
        
                }
                else{
        
        
                    temp = parseInt(roll[t])
        
                    organized +=  temp +   ", "
        
                    total+= temp
        
        
                }
        
        
            }

            
        
            }
                
            
            organized = organized.substr(0,organized.length-2);
            
            organized += "]"
            recievedMessage.channel.send(organized)
            recievedMessage.channel.send(total)
            roll = [];
            organized = ""
            total = 0;
            go = false
            min = 100
   
   
   
   
   
            
}
    



}



else{

    recievedMessage.channel.send("Hey, looks like that's not one of my commands. Go ahead and do &help to see what my commands are")


}


}


