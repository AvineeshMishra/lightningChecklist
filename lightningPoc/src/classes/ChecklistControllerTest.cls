/* @Name        : ChecklistControllerTest
 * @Description : To test ChecklistController functionality
 * @Version     : 1.0
 * @Author      : avineesh.k.mishra
 * @CreatedDate : 17-June-2018
 */
@isTest
public class ChecklistControllerTest {
    @isTest
    private static void testChecklistDataPostiveTest() {
        Checklist__c check = new Checklist__c();         
        Test.startTest();
            ChecklistController.createRecord(check);
        Test.stopTest();
        System.AssertEquals(true,check.Id !=null);
    }
    @isTest
    private static void testChecklistDataNegativeTest() {
        Checklist_Item__c checkItem = new Checklist_Item__c();         
        Test.startTest();
            ChecklistController.createRecord(checkItem);
        Test.stopTest();
        System.AssertEquals(false,checkItem.Id !=null);
    }
    @isTest
    private static void testChecklistData() {
        Checklist__c check = ChecklistControllerTestFactory.buildChecklistData();
        insert check;
        Test.startTest();
            ChecklistController.getParentRecord();
            ChecklistController.getChecklistTypes();
        Test.stopTest();
    }
    @isTest
    private static void testChecklistItemData() {
        Checklist__c check = ChecklistControllerTestFactory.buildChecklistData();
        insert check;
        Checklist_Item__c checkItem = ChecklistControllerTestFactory.buildChecklistItemData(check);
        insert checkItem;
        checklist_Item__c checkItem1;
        Test.startTest();
            checkItem1 = ChecklistController.changeStatusChecklistItem(checkItem);
        Test.stopTest();
        System.AssertEquals(true, checkItem1.Completion_Status__c);
    }
    @isTest
    private static void testChecklistItemRec() {
        Checklist__c check = ChecklistControllerTestFactory.buildChecklistData();
        insert check;
        Checklist_Item__c checkItem = new Checklist_Item__c();
        Test.startTest();
            ChecklistController.createChecklistItemRec(checkItem);
        Test.stopTest();
        System.AssertEquals(true,checkItem.Id !=null);
    }
    @isTest
    private static void testChecklistItemDataCheck() {
        Checklist__c check = ChecklistControllerTestFactory.buildChecklistData();
        insert check;
        Checklist_Item__c checkItem = ChecklistControllerTestFactory.buildChecklistItemData(check);
        insert checkItem;
        List<Checklist_Item__c> itemList = new List<Checklist_Item__c>();
        Test.startTest();
            itemList = ChecklistController.getChecklistItemRecord();
        Test.stopTest();
        System.AssertEquals(true,itemList.size() > 0);
    }
    @isTest
    private static void testChecklistItemDeleteCheck() {
        Checklist__c check = ChecklistControllerTestFactory.buildChecklistData();
        insert check;
        Checklist_Item__c checkItem = ChecklistControllerTestFactory.buildChecklistItemData(check);
        insert checkItem;
        Test.startTest();
            ChecklistController.deleteChecklistItemCon(checkItem);
        Test.stopTest();
        List<Checklist_Item__c> checkItemList = [select id from Checklist_Item__c where Id=:checkItem.Id limit 1];
        System.AssertEquals(true,checkItemList.isEmpty());
    }
    
}