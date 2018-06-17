@isTest
/**
* Name          : ChecklistControllerTestFactory
* Description   : Data factory class for class for ChecklistControllerTest
* @author       : avineesh.k.mishra
* Date          : 16-June-2018
*/
public class ChecklistControllerTestFactory {  
    
   /**
    * Name          : buildChecklistData
    * Description   : To create Checklist Data
    * @param        : none
    * return        : Checklist__c 
    */
    public static Checklist__c buildChecklistData() {
        Checklist__c check = new Checklist__c(); 
        check.Name = 'Test';
        check.Type__c ='Security';
        return check;
    }
    /**
    * Name          : buildChecklistItemData
    * Description   : To create Checklist Item Data
    * @param        : none
    * return        : Checklist_Item__c 
    */
    public static Checklist_Item__c buildChecklistItemData(Checklist__c checklistObj) {
        Checklist_Item__c checkItem = new Checklist_Item__c(); 
        checkItem.Description__c = 'Test';
        checkItem.Completion_Status__c = false;         
        checkItem.Checklist__c = checklistObj.Id;
        return checkItem;
    }
}