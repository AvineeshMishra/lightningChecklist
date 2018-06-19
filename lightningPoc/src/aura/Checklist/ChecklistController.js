({
	//Calling this function to initialize the component and load required data 
    doInit : function(component, event, helper) { 
        helper.initializeThis(component);
    },
    //Calling this function to save the Checklist Record
    handleSave : function(component, event, helper) {
        helper.handleSaveHelper(component);  
    },
    //Calling this function to delete the Checklist Record
    deleteChecklist : function(component,event,helper) {
        helper.handleDelete(component);
    }     
})