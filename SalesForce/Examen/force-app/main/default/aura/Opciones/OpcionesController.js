({
    startRecording : function(component, event, helper) {
        var appEvent = $A.get("e.c:GameEvent");
        appEvent.setParams({ "action" : "startRecording" });
        appEvent.fire();
    },

    stopRecording : function(component, event, helper) {
        var appEvent = $A.get("e.c:GameEvent");
        appEvent.setParams({ "action" : "stopRecording" });
        appEvent.fire();
    },

    playSequence : function(component, event, helper) {
        var appEvent = $A.get("e.c:GameEvent");
        appEvent.setParams({ "action" : "playSequence" });
        appEvent.fire();
    },

    saveSequence : function(component, event, helper) {
        var appEvent = $A.get("e.c:GameEvent");
        appEvent.setParams({ "action" : "saveSequence" });
        appEvent.fire();
    }, 
    clearSequence : function(component, event, helper) {
        var appEvent = $A.get("e.c:GameEvent");
        appEvent.setParams({ "action" : "clearSequence" });
        appEvent.fire();
    }
})
