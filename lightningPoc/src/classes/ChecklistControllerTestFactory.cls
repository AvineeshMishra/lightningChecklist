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
    /**
    * Name          : insertContactData
    * Description   : To create community user need to create Contact
    * @param        : none
    * return        : Contact
    */
    public static Contact insertContactData() {
        Account partnerAccount = new Account(Name ='Test');
        insert partnerAccount;
        Contact partnerContact = new Contact(
        FirstName = 'Test Contact',
        LastName = 'Test Contact',
        AccountId = partnerAccount.Id,
        Email = 'testemail'+Math.round(Math.random()*Math.pow(10, 7))+'@testemail.com');         
        insert partnerContact;
        return partnerContact;         
    }
    /**
    * Name          : buildUserData
    * Description   : To create community user
    * @param        : none
    * return        : User
    */
    public static User buildUserData() {
        Profile p = [SELECT Id FROM Profile WHERE Name='Custom Community User'];
        User u = new User (         
        ProfileId = p.Id,
        Username = System.now().millisecond() + 'test2@test.com',
        Alias = 'batman',
        Email='mark.smith@accenture.com',
        EmailEncodingKey='UTF-8',
        Firstname='Mark', 
        ContactId = insertContactData().Id,
        Lastname='Smith',
        LanguageLocaleKey='en_US',
        LocaleSidKey='en_US',
        TimeZoneSidKey='America/Chicago');
        return u;
    }
}