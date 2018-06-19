({
	//To create Checklist Item Record
    createItem : function(component,event,helper) {
        helper.createChecklistItemRec(component,event,helper);
        helper.getData(component,event,helper);
       
    },
    //To open modal popup of Checklist Item 
    openModal : function(component,event,helper) {
        var modal = component.find("checklistModal");
        var modalBackdrp = component.find("checklistModalBackdrop");
        $A.util.addClass(modal,'slds-fade-in-open');
        $A.util.addClass(modalBackdrp,'slds-backdrop_open');
    },
    //To close modal popup of Checklist Item
    closeModal : function(component,event,helper) {
    	var modal = component.find("checklistModal");
        var modalBackdrp = component.find("checklistModalBackdrop");
        $A.util.removeClass(modal,'slds-fade-in-open');
        $A.util.removeClass(modalBackdrp,'slds-backdrop_open');
	},
    //To load the required data
    init : function(component,event,helper) {
        component.set('v.columns', [
            {label: 'Description', fieldName: 'Description__c',editable:'true', type: 'text'},
            {label: 'Completion Status', fieldName: 'Completion_Status__c', type: 'boolean'},           
            
            {label: 'Mark Completed', 
            	type:  'button',typeAttributes: {
                iconName: 'action:update_status',
                label: '', 
                name: 'completed',    
                disabled: false     
            	}
            },
            {label: 'Action',
            	type:  'button',typeAttributes: {
                iconName: 'action:delete',
                label: '', 
                name: 'delete',    
                disabled: false     
            	}
            }
            
        ]);
        helper.getData(component,event,helper);    		
    },
    //To handle button actions
    handleRowAction: function (cmp, event, helper) { 
        var action = event.getParam('action');         
        //alert(JSON.stringify(action.name));
        var row = event.getParam('row'); 
        switch (action.name) { 
            case 'completed':
                helper.completeRow(cmp,row,action);
                helper.getData(cmp,event,helper);
                break;
            case 'delete':
                helper.deleteRow(cmp, row);
        }
    },
    //Calling this function for inline editing on Checklist Item Records
    onSave : function (component, event, helper) {
        helper.saveDataTable(component, event, helper);
    }  
})