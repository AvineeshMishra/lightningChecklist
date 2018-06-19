/* @Name        : ChecklistController
 * @Description : To create and edit checklist for Community Users
 * @Version     : 1.0
 * @Author      : avineesh.k.mishra
 * @CreatedDate : 16-June-2018
 */
public with sharing class ChecklistController {

    
    /* @method        : getChecklistTypes
     * @Description   : To get the picklist values of Type field in checklist
     * @param         : none
     * @return        : List of string(picklist values) 
     */
    @AuraEnabled
    public static List<String> getChecklistTypes() {
        List<String> options = new List<String>();
        Schema.DescribeFieldResult fieldResult = Checklist__c.Type__c.getDescribe();
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p: pList) {
            options.add(p.getLabel());
        }
        return options;
    }
    /* @method        : getParentRecord
     * @Description   : To get the the parent checklist record 
     * @param         : none
     * @return        : Checklist__c record data 
     */
    @AuraEnabled 
    public static Checklist__c getParentRecord() {
        Id UserId = UserInfo.getUserId();
        Checklist__c cl = new Checklist__c();
        String soql = 'SELECT ID, name, Type__c FROM Checklist__c WHERE OwnerId =: UserId LIMIT 1'; 
        cl = Database.query(soql);
        return cl;
    }
    /* @method        : createRecord
     * @Description   : To save to interted object 
     * @param         : sObject
     * @return        : sObject 
     */
    @AuraEnabled
    public static sObject createRecord(sObject insertObj) {
        if(insertObj != null) {
            try {
                    insert insertObj;   
            }
            catch(Exception e) {
                    system.debug('*Exception in saving record***--> '+e.getMessage());
            }
        }
        return insertObj;
    }
    /* @method        : changeStatusChecklistItem
     * @Description   : To change completion status 
     * @param         : Checklist Item
     * @return        : Checklist Item
     */
    @AuraEnabled
    public static Checklist_Item__c changeStatusChecklistItem(Checklist_Item__c checlistItemObj) {
        system.debug('checlistItemObj'+checlistItemObj);
        Checklist_Item__c item = new Checklist_Item__c();
        if(checlistItemObj != null) {
            item.Id = checlistItemObj.Id;
            item.Completion_Status__c = true;
            update item; 
            system.debug('item'+item);
        }
           
        return item;
    }
    /* @method        : getChecklistItemRecord
     * @Description   : To get the item records to display in data table
     * @param         : none
     * @return        : List of Checklist Item
     */
    @AuraEnabled
    public static List<Checklist_Item__c> getChecklistItemRecord() {
        List<Checklist_Item__c> checklistRec = new List<Checklist_Item__c>();
        checklistRec = [Select Description__c,Completion_Status__c from Checklist_Item__c where Checklist__r.OwnerId=:UserInfo.getUserId()];
        return checklistRec;
    }   
    /* @method        : createChecklistItemRec
     * @Description   : To create checklist Item Record
     * @param         : Checklist_Item__c 
     * @return        : void
     */
    @AuraEnabled     
    public static void createChecklistItemRec(Checklist_Item__c cheklistItemobj) {                
        cheklistItemobj.Checklist__c = getParentRecord().Id;         
        insert cheklistItemobj;         
    }
    /* @method        : deleteChecklistItemCon
     * @Description   : To delete checklist Item Record
     * @param         : Checklist_Item__c 
     * @return        : void
     */
    @AuraEnabled
    public static void deleteChecklistItemCon(Checklist_Item__c checklistItem) {
        delete checklistItem;
    }
    /* @method        : deleteChecklistData
     * @Description   : To delete checklist Record
     * @param         : none
     * @return        : void
     */
    @AuraEnabled
    public static void deleteChecklistData() {
        try {
            Checklist__c checklist = [Select Id from Checklist__c where Owner.Id =:UserInfo.getUserId() Limit 1]; 
            if(checklist.Id != null ) {
                delete checklist;    
            }
        }
        catch(Exception e) {
            system.debug('Error in deletion-->'+e.getMessage());
        }
    }
    /* @method        : updateChecklistItems
     * @Description   : To update checklist Items on save
     * @param         : List of Checklist Items
     * @return        : boolean
     */
    @AuraEnabled
    public static boolean updateChecklistItems(List<Checklist_Item__c> editedItemList){
        try{
            update editedItemList;
            return true;
        } catch(Exception e){
            return false;
        }
    }
}