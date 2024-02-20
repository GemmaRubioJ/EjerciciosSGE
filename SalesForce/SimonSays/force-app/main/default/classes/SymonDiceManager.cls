public with sharing class SymonDiceManager {
    @AuraEnabled
    public static void saveSequence(String accountId, String sequence) {
        Account accountToUpdate = [SELECT Id, Description FROM Account WHERE Id = :accountId LIMIT 1];
        accountToUpdate.Description = accountToUpdate.Description + ',' + sequence; 
        update accountToUpdate;
    }

    @AuraEnabled
    public static String getSequence(String accountId) {
        Account account = [SELECT Id, Description FROM Account WHERE Id = :accountId LIMIT 1];
        return account.Description; // Devuelve la secuencia almacenada
    }
}