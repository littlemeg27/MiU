//Brenna Pavlinchak
//MiU 1212
//Project 3
//12/04/2012


		$('#home').on('pageinit', function()
		{
			//code needed for home page goes here
		});	
				
		$('#addItem').on('pageinit', function()
		{
		
				var myForm = $('#lifeguardForm');
				var errorFormLink = $('#errorFormLink');
				
		myForm.validate(
		{
				    
					invalidHandler: function(form, validator) 
					{
						errorFormLink.click();
						var html = '';
						
						for(var key in validator.submitted)
						{
							var label = $('[for^="'+ key +'"]');
							var legend = label.closest('fieldset').find('.ui-controlgroup-label');
							var fieldName = legend.length ? legend.text() : label.text();
							html += '<li>'+fieldName+'</li>';
						}
						
						$("#errorFormPage ul").html(html);
					},
					
					submitHandler: function() 
					{
						var data = myForm.serializeArray();
						storeData(data);
					}
		});
			
			//any other code needed for addItem page goes here
			
		});
		
		//The functions below can go inside or outside the pageinit function for the page in which it is needed.
		
		var autofillData = function ()
		{
			 
		};
		
		var getData = function()
		{
		
		};
		
		var storeData = function(data)
		{
			var key;
			var id;
	            
	            if(!key)
	            {
	                id = Math.floor(Math.random()*1000001);    
	            }
	            
	            else
	            {
	            	id = key;
	            }
	                
	                
		    var item                  = {};
                item.firstName        =["First Name:", $("#firstName").val()];
                item.lastName         =["Last Name:", $("#lastName").val()];
                item.phoneNumber      =["Phone Number:", $("#phoneNumber").val()];
                item.email            =["Email:", $("#email").val()];
                item.pools            =["Pools:", $("#pools").val()];    
                item.job	          =["Job:", $("input:radio[name=job]:checked").val()];
                item.cprDate          =["Date of CPR certification:", $("#cprDate").val()];
	            item.firstAidDate     =["Date of First Aid certification:", $("#firstAidDate").val()];
                item.lifeguardDate    =["Date of Lifeguard certification:", $("#lifeguardDate").val()];
			    item.hours            =["Hours a week you can work:", $("#hours").val()];
                item.requests         =["Requests:", $("#requests").val()];
                
                localStorage.setItem(id, JSON.stringify(item)); //Save data in not local storage: Use Stringify to convert our object to a string.
                alert("Lifeguard Saved!");
                
		}; //End of saveData
		
		var	deleteItem = function ()
		{
					
		};
							
		var clearLocal = function()
		{
		
		};