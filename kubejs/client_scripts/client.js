ItemEvents.tooltip(event => {
    event.addAdvanced("friendsandfoes:crab_claw", text =>
        text.add(Text.of("Increases your reach when held!").gray().italic()));
});