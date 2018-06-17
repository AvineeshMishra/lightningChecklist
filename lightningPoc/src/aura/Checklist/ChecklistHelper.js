({
    // To load data
    initializeThis : function(component) {
        component.set("v.isLoading", true);
        var action = component.get("c.getChecklistTypes");
        action.setCallback(this, function(result){
            component.set("v.options", result.getReturnValue());
            window.setTimeout(
                $A.getCallback( function() {
                	$A.log("Errors", result.getError());   
                }));
        });
        $A.enqueueAction(action);
        var action1 = component.get("c.getParentRecord");
        action1.setCallback(this, function(result){
            //   alert(JSON.stringify(result.getReturnValue()));
            if(result.getReturnValue() != undefined){
                component.set("v.newChecklist", result.getReturnValue());
                component.set("v.notEditable", true);
            }
            window.setTimeout(
                $A.getCallback( function() {
                      $A.log("Errors", result.getError());
            }));
        });
        $A.enqueueAction(action1);
        component.set("v.isLoading", false);
    },
    //To create checklist
    handleSaveHelper : function(component) {
        var inputValues = component.get("v.newChecklist");
        if(inputValues.Name == undefined || inputValues.Name == '' || inputValues.Type__c == undefined || inputValues.Type__c == ''){
            var toastEvent = $A.get("e.force:showToast");
            if(toastEvent) {
                toastEvent.setParams({
                    title : 'Error Message',
                    message:'Name or Type Should not be blank',                
                    type: 'error',
                });
                toastEvent.fire();
        	}
            else {
                alert('Name or Type Should not be blank');
            }
        }
        else
        {
            var action = component.get("c.createRecord");
            //  alert(JSON.stringify(inputValues));
            action.setParams({
                "insertObj": inputValues
            });
            action.setCallback(this, function(a) {
                if (a.getState() === "SUCCESS") {
                    component.set("v.notEditable", true);
                    var toastEvent = $A.get("e.force:showToast");
                    if(toastEvent) {
                        toastEvent.setParams({
                            title : 'Success Message',
                            message:'Checklist record created successfully',                
                            type: 'success',
                        });
                        toastEvent.fire();
                    }
                    else {
                        alert('Checklist record created successfully');
                    }
                } else if (a.getState() === "ERROR") {
                    $A.log("Errors", a.getError());
                }
            });
            $A.enqueueAction(action); 
        }
    },
});