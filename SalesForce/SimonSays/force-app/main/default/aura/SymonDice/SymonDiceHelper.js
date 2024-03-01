({
    validatePlayerTwoSequence: function (component) {
        var playerOneSequence = component.get("v.playerOneSequence");
        var playerTwoSequence = component.get("v.clickSequence");

        console.log('Player One Sequence:', playerOneSequence);
        console.log('Player Two Sequence:', playerTwoSequence);


        if (playerOneSequence === playerTwoSequence) {
            console.log('El jugador 2 acertó la secuencia');
            var playerTwoScore = component.get("v.playerTwoScore");
            component.set("v.playerTwoScore", playerTwoScore + 1);
            // Aquí actualizas el mensaje del modal antes de mostrarlo
            component.set("v.modalMessage", "El jugador 2 acertó la secuencia");
        } else {
            console.log('El jugador 2 falló la secuencia');
            component.set("v.modalMessage", "El jugador 2 falló la secuencia");
        }
        // Muestra el modal con el mensaje

        component.set("v.isRecording", false);
        component.set("v.clickSequence", "");
    },

    resetSequences: function (component) {
        component.set("v.playerOneSequence", "");
        component.set("v.playerTwoSequence", "");
    }
})