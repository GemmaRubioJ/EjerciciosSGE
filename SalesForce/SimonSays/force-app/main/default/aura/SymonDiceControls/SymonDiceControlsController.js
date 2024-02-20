({
    startRecording : function(component, event, helper) {
        var appEvent = $A.get("e.c:SymonDiceEvent");
        appEvent.setParams({ "action" : "startRecording" });
        appEvent.fire();
    },

    stopRecording : function(component, event, helper) {
        var appEvent = $A.get("e.c:SymonDiceEvent");
        appEvent.setParams({ "action" : "stopRecording" });
        appEvent.fire();
    },

    saveSequence : function(component, event, helper) {
        var appEvent = $A.get("e.c:SymonDiceEvent");
        appEvent.setParams({ "action" : "saveSequence" });
        appEvent.fire();
    },

    playSequence : function(component, event, helper) {
        var appEvent = $A.get("e.c:SymonDiceEvent");
        appEvent.setParams({ "action" : "playSequence" });
        appEvent.fire();
    }
})
