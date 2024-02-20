public with sharing class GameManager {
    
       
    private static final String UNIQUE_ACCOUNT_NAME = 'UniqueNameForSequenceStorage';

    @AuraEnabled
    public static void updateSequence(String newSequence) {
        // Intenta encontrar el registro único
        List<Account> accounts = [SELECT Id, Description FROM Account WHERE Name = :UNIQUE_ACCOUNT_NAME LIMIT 1];

        if (!accounts.isEmpty()) {
            // Si existe, actualiza el registro existente
            Account accountToUpdate = accounts[0];
            accountToUpdate.Description = (accountToUpdate.Description != null ? accountToUpdate.Description + ' ' : '') + newSequence;
            update accountToUpdate;
        } else {
            // Si no existe, opcionalmente podría crearlo o manejar el error
            // Por ejemplo, creando un nuevo registro:
            Account newAccount = new Account(Name = UNIQUE_ACCOUNT_NAME, Description = newSequence);
            insert newAccount;
        }
    }

    @AuraEnabled
    public static String getSequence() {
        // Intenta encontrar el registro único
        List<Account> accounts = [SELECT Id, Description FROM Account WHERE Name = :UNIQUE_ACCOUNT_NAME LIMIT 1];

        // Verifica si se encontró el registro y devuelve su descripción
        if (!accounts.isEmpty()) {
            return accounts[0].Description;
        }

        // Devuelve una cadena vacía o null si no se encuentra el registro
        return null;
    }
}
