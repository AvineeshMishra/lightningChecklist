({
	
    createItem : function(component,event,helper) {
        helper.createChecklistItemRec(component,event,helper);
        helper.getData(component,event,helper);
       
    },
    openModal : function(component,event,helper) {
        var modal = component.find("checklistModal");
        var modalBackdrp = component.find("checklistModalBackdrop");
        $A.util.addClass(modal,'slds-fade-in-open');
        $A.util.addClass(modalBackdrp,'slds-backdrop_open');
    },
    closeModal : function(component,event,helper) {
    	var modal = component.find("checklistModal");
        var modalBackdrp = component.find("checklistModalBackdrop");
        $A.util.removeClass(modal,'slds-fade-in-open');
        $A.util.removeClass(modalBackdrp,'slds-backdrop_open');
	},
    init : function(component,event,helper) {
        component.set('v.columns', [
            {label: 'Description', fieldName: 'Description__c', type: 'text'},
            {label: 'Completion Status', fieldName: 'Completion_Status__c', type: 'boolean'},           
            
            { type:  'button',typeAttributes: {
                iconName: 'action:check',
                label: 'Mark Complete', 
                name: 'completed',    
                disabled: false     
            	}
            },
            { type:  'button',typeAttributes: {
                iconName: 'action:delete',
                label: 'Delete', 
                name: 'delete',    
                disabled: false     
            	}
            }
            
        ]);
        helper.getData(component,event,helper);    		
    },
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
    }
})