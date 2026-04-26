ServerEvents.recipes(event => {
    event.remove({ id: "minecraft:lead" });
    event.remove({ id: "minecraft:lodestone" });
    event.remove({ id: "minecraft:powered_rail" });
    event.remove({ id: "minecraft:blaze_powder" });
    event.remove({ id: "minecraft:sugar_from_sugar_cane" });
    event.remove({ id: "sulfar_mod:blaze_powder_sulfar_recipe" });
    event.remove({ id: "hexalia:salt" });
    event.remove({ id: "hexalia:salt_from_mortar" });
    event.remove({ id: "workstations:coking/quartz" });
    event.remove({ id: "projectvibrantjourneys:cindercane_to_blaze_powder" });

    event.forEachRecipe({ type: "minecraft:crafting_shape", input: "hexalia:mortar_and_pestle" }, recipe => {
        let ingredients = recipe.originalRecipeIngredients;
        let output = recipe.originalRecipeResult;

        event.shaped(output, ingredients)
            .replaceIngredient("hexalia:salt", "hearthandharvest:salt")
            .keepIngredient("hexalia:mortar_and_pestle")
            .id(recipe.getId())
            .replaceOutput("hexalia:salt", "hearthandharvest:salt");
    });

    event.forEachRecipe({ type: "minecraft:crafting_shapeless", input: "hexalia:mortar_and_pestle" }, recipe => {
        let ingredients = recipe.originalRecipeIngredients;
        let output = recipe.originalRecipeResult;

        event.shapeless(output, ingredients)
            .replaceIngredient("hexalia:salt", "hearthandharvest:salt")
            .keepIngredient("hexalia:mortar_and_pestle")
            .id(recipe.getId())
            .replaceOutput("hexalia:salt", "hearthandharvest:salt");
    });

    event.replaceInput({ output: "farmersdelight:fried_egg" }, "minecraft:egg", "#c:eggs");
    event.replaceInput({ input: "hexalia:salt" }, "hexalia:salt", "hearthandharvest:salt");
    event.replaceOutput({ output: "hexalia:salt" }, "hexalia:salt", "hearthandharvest:salt");

    event.shapeless("minecraft:fire_charge", [
        { item: "sulfar_mod:sulfar" },
        { item: "sulfar_mod:sulfar" },
        { item: "minecraft:gunpowder" },
        { item: "sulfar_mod:sulfar" },
    ]).id("sulfar_mod:fire_charge_sulfar_recipe");

    event.shapeless("hearthandharvest:syrup_crate", [
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
    ]).id("hearthandharvest:syrup_bottle_crate");

    event.smelting("sulfar_mod:sulfar", "projectvibrantjourneys:cindercane", 0.3, 600)
        .id("sulfar_mod:kjs/cindercane_to_sulfar");

    event.custom({
        type: "farmersdelight:cooking",
        cookingtime: 100,
        experience: 0.35,
        ingredients: [{ item: "biomesoplenty:dried_salt" }],
        recipe_book_tab: "misc",
        result: {
            item: "hearthandharvest:salt",
            count: 8,
        },
    });

    event.custom({
        type: "hexalia:mortar_and_pestle",
        ingredients: [{ item: "hexalia:saltsprout" }],
        output: { item: "hearthandharvest:salt" },
    });

    event.custom({
        type: "hexalia:mortar_and_pestle",
        ingredients: [{ item: "hexalia:silk_fiber" }],
        output: {
            item: "minecraft:string",
            count: 3,
        },
    });

    event.shapeless(Item.of("sulfar_mod:sulfar", 2), [
        { item: "hexalia:mortar_and_pestle" },
        { item: "minecraft:blaze_powder" },
    ]).keepIngredient("hexalia:mortar_and_pestle");

    event.custom({
        type: "hexalia:mortar_and_pestle",
        ingredients: [{ item: "minecraft:blaze_powder" }],
        output: {
            item: "sulfar_mod:sulfar",
            count: 2,
        },
    });

    event.shapeless(Item.of("minecraft:blaze_powder", 2), [
        { item: "hexalia:mortar_and_pestle" },
        { item: "minecraft:blaze_rod" },
    ]).keepIngredient("hexalia:mortar_and_pestle");

    event.custom({
        type: "hexalia:mortar_and_pestle",
        ingredients: [{ item: "minecraft:blaze_rod" }],
        output: {
            item: "minecraft:blaze_powder",
            count: 2,
        },
    });

    event.shapeless("minecraft:sugar", [
        { item: "hexalia:mortar_and_pestle" },
        { item: "minecraft:sugar_cane" },
    ]).keepIngredient("hexalia:mortar_and_pestle");

    event.custom({
        type: "hexalia:mortar_and_pestle",
        ingredients: [{ item: "minecraft:sugar_cane" }],
        output: { item: "minecraft:sugar" },
    });
});

LootJS.modifiers(event =>
    event.addBlockLootModifier("hexalia:salt_block").replaceLoot("hexalia:salt", "hearthandharvest:salt", true));

console.info("Loaded Snowy's Server Tweaks");