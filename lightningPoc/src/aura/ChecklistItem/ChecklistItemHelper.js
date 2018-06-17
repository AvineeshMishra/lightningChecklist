({
	getData : function(component,event,helper) {
		var action = component.get("c.getChecklistItemRecord");
		action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set("v.data", response.getReturnValue());
                
            }else if (state === 'ERROR'){
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            } else{
                console.log('Something went wrong, Please check with your admin');
            }
        });
        $A.enqueueAction(action);	
	},
    completeRow : function(cmp, row,action) {         
        if(!row.Completion_Status__c) {
            var item = cmp.get("c.changeStatusChecklistItem");  
            item.setParams({
                checlistItemObj :row
            });         
            item.setCallback(this,function(a) {
                var state = a.getState();             
                if(state === 'SUCCESS'){
                    var updatedItem = a.getReturnValue();               
                    var toastEvent = $A.get("e.force:showToast");
                    if(toastEvent) {
                        toastEvent.setParams({
                            title : 'Success Message',
                            message:'checklist item'+ ' ' + row.Description__c +' ' +'completed',                
                            type: 'success',
                        });
                        toastEvent.fire();
                    }
                    else {
                        alert('checklist item'+ " " +row.Description__c + " " +'updated successfully' );
                    }
                }
            });
            $A.enqueueAction(item);
        }
        else {
                           
            var toastEvent = $A.get("e.force:showToast");
            if(toastEvent) {
                toastEvent.setParams({
                    title : 'Info Message',
                    message:'checklist item'+ ' ' + row.Description__c +' ' +'is already Completed',                
                    type: 'info',
                });
                toastEvent.fire();
            }
            
        }
    
    },
    deleteRow: function(cmp, row) {         
      var action = cmp.get("c.deleteChecklistItemCon");
        action.setParams({
            "checklistItem":row
        });
        action.setCallback(this, function(response) {
            var state = response.getState();             
            if (state === "SUCCESS") {
                var rows = cmp.get('v.data');
                var rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                cmp.set('v.data', rows);
                var toastEvent = $A.get("e.force:showToast");
    			toastEvent.setParams({
        		"title": "Success!",
                 type: 'success',
        		"message": "Record has been deleted successfully."
    			});
    			toastEvent.fire();
            }
            else if (state === "ERROR") {
                alert('Technical Issue in deletion');
            }
        });
        $A.enqueueAction(action);
    },
    createChecklistItemRec : function(component,event,helper) {
        //getting the Checklist Item information
        var checklistItem = component.get("v.newChecklistItem");         
        //Calling the Apex Function
        var action = component.get("c.createChecklistItemRec");         
        //Setting the Apex Parameter
        action.setParams({
            cheklistItemobj : checklistItem             
        });         
        //Setting the Callback
        action.setCallback(this,function(a){
            //get the response state
            var state = a.getState();             
            //check if result is successfull
            if(state == "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                if(toastEvent) {
                    toastEvent.setParams({
                        title : 'Success Message',
                        message:'Checklist item created Successfully',                
                        type: 'success'
                    });
                    toastEvent.fire();
                }                                 
                //Reset Form
                var newItem = {'sobjectType': 'Checklist_Item__c',                                     
                               'Description__c': '',
                               'Completion_Status__c': false
                              };                 
                //resetting the Values in the form
                component.set("v.newChecklistItem",newItem);
                var modal = component.find("checklistModal");
                var modalBackdrp = component.find("checklistModalBackdrop");
                $A.util.removeClass(modal,'slds-fade-in-open');
                $A.util.removeClass(modalBackdrp,'slds-backdrop_open');
            } 
           else if(state == "ERROR"){
                alert('Error in calling server side action');
               
            }
        });
 		//adds the server-side action to the queue        
        $A.enqueueAction(action);
    }
})