public with sharing class Player {

    @AuraEnabled
    public static Id registerPlayer(String name){
        Player__c newPlayer = new Player__c(
            Name__c = name,
            Score__c = 0
        );
        insert newPlayer;
        return newPlayer.Id;
    }

    @AuraEnabled
    public static void updateScore(Id playerId, Integer score){
        Player__c player = [SELECT Id, Score__c FROM Player__c WHERE Id = :playerId];
        player.Score__c += score;
        update player;
    }
}


