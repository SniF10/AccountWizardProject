@IsTest
public class AccountWizardControllerTest {

    static testMethod void wizardTest(){

        Integer numberContacts = 10;
        String name = 'TestName';
        Account currentAccount = new Account(Name='TestAccount');

        Account accountTest = new Account(Name = 'Test Account Name');
        insert accountTest;

        List<Contact> contacts = new List<Contact>();
        for (Integer i = 0; i < numberContacts; i++) {
            contacts.add(new Contact(
                    FirstName = 'First',
                    LastName = 'Last' + i,
                    Email = 'TestMail@mail.ru'+i
            ));
        }

        Test.startTest();

        Boolean resultAccount = AccountWizardController.validAccount(name);
        Account exitingAccount = AccountWizardController.getAccount(accountTest.Id);
        Boolean resultContact = AccountWizardController.validContact(contacts);
        AccountWizardController.insertRec(currentAccount,contacts);


        Test.stopTest();

        System.assertEquals(exitingAccount, accountTest);
        System.assertEquals(true, resultAccount);
        System.assertEquals(true, resultContact);
        System.assertEquals(numberContacts,[SELECT COUNT() FROM Contact]);

    }

}