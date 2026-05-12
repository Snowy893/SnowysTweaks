ItemEvents.modification(event => {
    event.modify("sulfar_mod:sulfar_block", item => item.burnTime = 20000);
    event.modify("hexalia:mortar_and_pestle", item => item.maxStackSize = 1);
    event.modify("friendsandfoes:crab_claw", item => item.maxStackSize = 1);
    event.modify("minecraft:potion", item => item.maxStackSize = 4);
    event.modify("minecraft:splash_potion", item => item.maxStackSize = 4);
    event.modify("minecraft:lingering_potion", item => item.maxStackSize = 4);

    ["anchor", "cannon", "helm", "mast", "sail"].forEach(equippable =>
        event.modify("whaleborne:" + equippable, item => item.maxStackSize = 16));
});

MoreJSEvents.registerPotionBrewing(event => {
    let disabledPotions = ["reaching", "long_reaching", "strong_reaching"];
    disabledPotions.forEach(potion => {
        event.removeByPotion(null, null, potion);
        event.removeByPotion(potion, null, null);
    });
});

ItemAttributes.modify(attributes => {
    let crabClawSlots = ["mainhand", "offhand"];
    crabClawSlots.forEach(slot => {
        attributes.add(Ingredient.of("friendsandfoes:crab_claw"), "forge:entity_reach", 0.25, "addition", slot);
        attributes.add(Ingredient.of("friendsandfoes:crab_claw"), "forge:block_reach", 1, "addition", slot);
    });
});

console.info("Loaded Snowy's Startup Tweaks");