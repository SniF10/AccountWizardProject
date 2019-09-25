public class AccountWizardController {

    @AuraEnabled
    public static Boolean validAccount(String name) {

        Boolean valid = false;

        if ([SELECT COUNT() FROM Account WHERE Name = :name] == 0) {
            valid = true;
        }

        return valid;

    }

    @AuraEnabled
    public static Account getAccount(String recordId) {

        return [SELECT Name, BillingState, BillingPostalCode, BillingStreet FROM Account WHERE Id = :recordId];
    }

    /*@AuraEnabled
    public static Boolean validContact(List<Contact> contactsList){

        Set<String> contactEmails = getEmails(contactsList);

        Boolean valid = false;

        if([SELECT COUNT() FROM Contact WHERE Email=:contactEmails ]==0){
            valid = true;
        }

        return valid;
    }

    public static Set<String> getEmails(List<Contact> contactsList){

        Set<String> contactEmails = new Set<String>();

        for (Contact getEmails : contactsList) {
            contactEmails.add(getEmails.Email);
        }

        return contactEmails;
    }*/

    @AuraEnabled
    public static void insertRec(Account currentAccount, List<Contact> contactsList) {

        /*System.debug(currentAccount);

        System.debug(String.isNotEmpty(currentAccount.Id));
        System.debug(currentAccount.Id!='');

        if (String.isNotEmpty(currentAccount.Id)) {
            update currentAccount;
        }else {
            insert currentAccount;
        }*/

        upsert currentAccount;


        if (String.isNotEmpty(contactsList[0].LastName)) {
            for (Integer i = 0; i < contactsList.size(); i++) {
                contactsList[i].AccountId = currentAccount.Id;
            }

            insert contactsList;
        }
    }

}