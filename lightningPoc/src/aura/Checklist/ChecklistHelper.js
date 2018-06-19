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
                    message:'Name and Type Should not be blank',                
                    type: 'error',
                });
                toastEvent.fire();
            }
            else {
                alert('Name and Type Should not be blank');
            }
        }
        else
        {
            var action = component.get("c.createRecord");             
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
                            message: inputValues.Name + ' ' + 'created successfully',                
                            type: 'success',
                        });
                        toastEvent.fire();
                    }
                    else {
                        alert( inputValues.Name + ' ' + 'created successfully');
                    }
                } else if (a.getState() === "ERROR") {
                    $A.log("Errors", a.getError());
                }
            });
            $A.enqueueAction(action); 
        }
    },
    //To delete checklist Record
    handleDelete : function(component) {   
        var checklistRec = component.get("v.newChecklist");
        var action = component.get("c.deleteChecklistData");             
        action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {                
                var toastEvent = $A.get("e.force:showToast");
                if(toastEvent) {
                    toastEvent.setParams({
                        title : 'Success Message',
                        message: checklistRec.Name + ' ' + 'deleted successfully',                
                        type: 'success',
                    });
                    toastEvent.fire();
                }
                else {
                    alert(checklistRec.Name + ' ' + 'deleted successfully');
                }
                //Reset Form
                var newChecklist = {'sobjectType': 'Checklist__c',                                     
                                    'Name': '',
                                    'Type': ''
                                   };                 
                //resetting the Values in the form
                component.set("v.newChecklist",newChecklist);
                component.set("v.notEditable", false);
            } 
            else if (a.getState() === "ERROR") {
                $A.log("Errors", a.getError());
            }
        });
        $A.enqueueAction(action); 
    }
});