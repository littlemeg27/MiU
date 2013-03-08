//Brenna Pavlinchak
//MiU 
//Project 1
//11/18/2012

    
window.addEventListener("DOMContentLoaded", function()
{
    
            var errMsg = getElement('errors');
            var jobValue;
            var swimLessonValue;
            var radios;
            var checkbox;
            var dayValue;
        
        
        function getElement(x) //getElementById Function
        {
            var theElement = document.getElementById(x);
            return theElement;
        }//End function $
        
        
            
            var choosePool = ["--Choose Your Pool--","Northside", "Emmett Scott", "Boyd Hill", "Oakwood", "Rolling Hills", 
                              "Knightsbridge", "Laurel Creek", "Baxter", "Meadow Lakes 1", "Meadow Lakes 2", "Rock Hill Country Club", 
                              "Shiland", "River Hills Country Club"]; //The choose pool drop down
            
 
    function makeLifeguards()
	{
		var formTag = document.getElementsByTagName("Form"),
			selectLi = getElement('pools'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		
		for (var i = 0, j=choosePool.length; i<j; i++)
		{
			
			var makeOption = document.createElement('option');
			var optText = choosePool[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
        
        
        function getSelectedJobRadio() //Find value of selected radio button.
        {
                var radios = document.forms[0].jobValue;
            
            for(var i=0; i<radios.length; i++)
            {
                    
                if (radios[i].checked)
                {
                jobValue = radios[i].value;
                }
                    
            }
        
        }//End function getSelectedJobRadio
           
       
        
        function toggleControls(n) 
        {
            switch(n)
            {
                case "on":
                    getElement('lifeguardForm').style.display = "none";
                    getElement('clearLifeguardData').style.display = "inline";
                    getElement('displayLifeguardData').style.display = "none";
                    getElement('addNewLifeguard').style.display = "inline";
                    break;
                case "off":
                    getElement('lifeguardForm').style.display = "block";
                    getElement('clearLifeguardData').style.display = "inline";
                    getElement('displayLifeguardData').style.display = "inline";
                    getElement('addNewLifeguard').style.display = "none";
                    getElement('items').style.display = "none";
                    break;
                default:
                    return false;        
    
            }
        }//End of function toggle controls
    
        
        function storeLifeguardData(key)
        {
            var id;
            
            if(!key)
            {
                id = Math.floor(Math.random()*1000001);    
            }
            
                else
                {
                    id = key;
                }
                console.log("storeLifeguardData");
            
            console.log("storeLifeguardData fired"); //Gathers all form field values & store in an object.
            
                getSelectedJobRadio(); 
            var item                  = {};
                item.firstName        =["First Name:", getElement('firstName').value];
                item.lastName         =["Last Name:", getElement('lastName').value];
                item.phoneNumber      =["Phone Number:", getElement('phoneNumber').value];
                item.email            =["Email:", getElement('email').value];
                item.pools            =["Pools:", getElement('groups').value];    
                item.jobValue         =["Job:", getElement('jobValue').value]; 
                item.cprDate          =["Date of CPR certification:", getElement('cprDate').value];
	            item.firstAidDate     =["Date of First Aid certification:", getElement('firstAidDate').value];
                item.lifeguardDate    =["Date of Lifeguard certification:", getElement('lifeguardDate').value];
			    item.slide            =["Hours a week you can work:", getElement('slide').value];
                item.comments         =["Comments:", getElement('comments').value];
                
            
            localStorage.setItem(id, JSON.stringify(item)); //Save data in not local storage: Use Stringify to convert our object to a string.
            alert("Lifeguard Saved!");
            window.location.reload();
        
        } //End of function storeLifeguardData
    
               
 
        
        function getLifeguardData()
        {
            toggleControls("on");
            
            if(localStorage.length === 0)
            {
                alert("There are no Lifeguards saved! Load default data");
                autoFillData(); //Calls the auto fill data function
            }
                
                var makeDiv = document.createElement('div'); 
                makeDiv.setAttribute("id", "items");
                var makeList = document.createElement('ul');
                makeDiv.appendChild(makeList);
                document.body.appendChild(makeDiv);
                getElement('items').style.display = "block";
                
            for(var i=0, len=localStorage.length; i<len; i++)
            {
                var makeli = document.createElement('li');
                var linksLi = document.createElement('li'); 
                
                makeList.appendChild(makeli);
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                
                var obj = JSON.parse(value); //Convert string from local storage value back to object using JSON.parse
                var makeSubList = document.createElement('ul'); 
                makeli.appendChild(makeSubList);
                
              // getImage(obj.pools[1], makeSubList);//Calls the getImage function
                
				for(var n in obj)
				{
					var makeSubli = document.createElement('li');
					makeSubList.appendChild(makeSubli);
					var optSubText = obj[n][0]+" "+obj[n][1];
					makeSubli.innerHTML = optSubText;
					makeSubList.appendChild(linksLi);
				}
				
                makeLifeguardItemLinks(localStorage.key(i), linksLi); //create our edit delete buttons link
       

            }
        } //End of function getLifeguardData
                            
       
       
       
        function makeLifeguardItemLinks(key, linksLi) //Create the edit and delete links for each stored item when displayed
        { 
             
                var editLink = document.createElement("a"); //add edit single item link
                editLink.href = "#";
                editLink.key = key;
                var editText = "Edit Contact"; 
                editLink.addEventListener("click", editEachLifeguard);
                editLink.innerHTML = editText;
                linksLi.appendChild(editLink);
                
                
                var breakTag = document.createElement("br"); //add link break
                linksLi.appendChild(breakTag);
                
                
                var deleteLink = document.createElement("a"); //add delete single item link
                deleteLink.href = "#";
                deleteLink.key = key;
                var deleteText = "Delete Lifeguard";
                deleteLink.addEventListener("click", deleteLifeguardItem);
                deleteLink.innerHTML = deleteText;
                linksLi.appendChild(deleteLink);
       
        }//End function makeLifeguardItemLinks


       
       
        function editEachLifeguard()//grabs the data from our item from local storage 
        {
            var value = localStorage.getItem(this.key);
            var item = JSON.parse(value);
            var checkIn;
            var validate;
            var radios = document.forms[0].jobValue;
            
            
            toggleControls("off"); //show the form
            
            getElement('firstName').value = item.firstName[1]; //populate the form fields with current localStorage values
            getElement('lastName').value = item.lastName[1];
            getElement('email').value = item.email[1];
            getElement('phoneNumber').value = item.phoneNumber[1];
            
	            for(var i=0; i<radios.length; i++)//Editing the job value radio
	            {
	                if(radios[i].value == "Lifeguard" && item.jobValue[1] == "Lifeguard")
	                {
	                    radios[i].setAttribute("checked", "checked");
	                }
	                
	                else if(radios[i].value == "poolAttendant" && item.jobValue[1] == "poolAttendant") 
	                {
	                    radios[i].setAttribute("checked", "checked");
	                }
	            }//end of for loop
                
            getElement('pools').value = item.pools[1];
            getElement('cprDate').value = item.date[1];
            getElement('firstAidDate').value = item.date[1];
            getElement('lifeguardDate').value = item.date[1];
            getElement('comments').value = item.comments[1];
            getElement('slide').value = item.slide[1];
        
        
                checkIn.removeEventListener("click", validate); //Remove the initital listener from the input "save contact" button
                
                getElement('checkIn').value = "Edit Contact"; //Change submit button value to edit button
                
                var editSubmit = getElement('checkIn');
                
                editSubmit.addEventListener("click", validate);//save the key value estiblished in this function as a property of the editSubmit event
                
                editSubmit.key = this.key; //so we can use that value when we save the data we edited
                
        }//End of function editEachLifeguard    
            
            
            
            
            
         function getImage(catName, makeSubList)//Adding images to the app
         {
            var imageLi = document.createElement('li');
            makeSubList.appendChild(imageLi);
            
            var newImg = document.createElement('img');
            var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
            imageLi.appendChild(newImg);
        
         }//End function getImage 
      
        
        
        
        
        function autoFillData() //Auto populate local storage
        {
        	  
               for(var n in json)
               {
                   var id = Math.floor(Math.random()*100000001);
                   localStorage.setItem(id, JSON.stringify(json[n]));
               }
       
        }//End function autoFillData
            
       
       
       
       
       function deleteLifeguardData()
       {
            if(localStorage.length === 0)
            {
                alert("There are no lifeguards clear!");
    
            }
                    else
                {
                    localStorage.clear();
                    alert("All Lifeguards Have Been Deleted!");
                    window.location.reload();
                    return false;
                }

                
       }//End function deleteLifeguardData
        
        
        
        
        function deleteLifeguardItem()
        {
            var ask = confirm("Do you want to delete this Lifeguard contact?");
                
            if(ask)
            {
                localStorage.removeItem(this.key);
                alert("Lifeguard contact was deleted!");
                window.location.reload();
            }
                
            else
            {
                alert("Lifeguard contact was not deleted");
            }
                
        } //End function deleteLifeguardItem

       
       
       
        
        function validate(e) //have to create a "validate" function
        { 
           
            var getfirstName = getElement('firstName');//Define the elements we want to check
            var getlastName = getElement('lastName');
            var getPhoneNumber = getElement('phoneNumber');
            var ErrMsg = getElement('errors');
            
            
            errMsg.innerHTML = ""; //Reset Error Messages
            getfirstName.style.border = "1px solid black";
            getlastName.style.border = "1px solid black";
            getPhoneNumber.style.border = "1px solid black";
            
            var messageAry = []; //Get error messages
        
            
            if(getfirstName.value === "") //First name validation 
            {
                var firstNameError = "Please enter a first name";
                getfirstName.style.border = "1px solid red";
                messageAry.push(firstNameError);
            }
        
            
            if(getlastName.value === "") //Last name validation 
            {
                var lastNameError = "Please enter a last name";
                getlastName.style.border = "1px solid red";
                messageAry.push(lastNameError);
            }
        
            var number = /^[0-9]{3}[\-]{1}[0-9]{3}[\-]{1}[0-9]{4}$/;//Phone Number Validation
        
            if(!(number.exec(getPhoneNumber.value)))
            {
                var phoneNumberError = "Please enter a phone number in format: 123-456-7890";
                getPhoneNumber.style.border = "1px solid red";
                messageAry.push(phoneNumberError);
            }
   
            
            if(messageAry.length >= 1)//If there are errors display them on the screen
            {
                for(var i=0, j=messageAry.length; i < j; i++)
                {
                    var txt = document.createElement('li');
                    txt.innerHTML = messageAry[i];
                    getElement('errors').appendChild(txt);
                }
            }    
                else
                {
                    storeLifeguardData(this.key);
                }
                
                e.preventDefault();
                return false;
                
        } //End function validate
        
        
                    
            
        makeLifeguards();//Calls make lifeguard function
    
                //Set Link & Submit Click Events  
    
                var displayLifeguardData = getElement('displayLifeguardData');
                displayLifeguardData.addEventListener("click", getLifeguardData);
                
                var clearLifeguardData = getElement('clearLifeguardData');
                clearLifeguardData.addEventListener ("click", deleteLifeguardData);
                
                var checkIn = getElement('checkIn');
                checkIn.addEventListener ("click", validate);
    
    
    
});