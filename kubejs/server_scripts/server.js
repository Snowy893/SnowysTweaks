/**
 * @param {Internal.RecipeJS} event 
 * @param {string|Internal.ItemStack} output
 * @param {Internal.Ingredient|Internal.Ingredient[]} ingredients
 */
function mortarAndPestleRecipe(event, output, ingredients) {
    let outputItem = !(output instanceof Item) ? Item.of(output) : output;
    let ingredientsArray = !(ingredients instanceof Array) ? [ingredients] : ingredients;
    event.shapeless(outputItem, [{ item: "hexalia:mortar_and_pestle" }].concat(ingredientsArray))
        .keepIngredient("hexalia:mortar_and_pestle");
    event.custom({
        type: "hexalia:mortar_and_pestle",
        ingredients: ingredientsArray,
        output: outputItem
    });
}

let crushedHerbs = [];

ServerEvents.tags("item", event =>
    event.get("hexalia:crushed_herbs").getObjectIds().forEach(id => crushedHerbs.push(Item.of(id))));

ServerEvents.recipes(event => {
    event.remove({ id: "minecraft:lead" });
    event.remove({ id: "minecraft:lodestone" });
    event.remove({ id: "minecraft:powered_rail" });
    event.remove({ id: "sulfar_mod:blaze_powder_sulfar_recipe" });
    event.remove({ id: "hexalia:salt" });
    event.remove({ id: "hexalia:salt_from_mortar" });
    event.remove({ id: "hexalia:leather_from_salt" });
    event.remove({ id: "workstations:coking/quartz" });
    event.remove({ id: "projectvibrantjourneys:cindercane_to_blaze_powder" });
    event.remove({ id: "projectvibrantjourneys:glowcap_to_glowstone_dust" });
    event.remove({ id: "winteroverhaul:skates" });
    event.remove({ id: "hearthandharvest:cotton_candy" });

    // Remake the mortar and pestle crafting table recipes such that the mortar and pestle isn't lost on crafting
    ["shaped", "shapeless"].forEach(type => {
        event.forEachRecipe({ type: "minecraft:crafting_" + type, input: "hexalia:mortar_and_pestle" }, recipe => {
            // Eeverse the order so that mortar and pestle appears first in the recipe
            let ingredients = recipe.getOriginalRecipeIngredients().reversed().toArray();
            let output = recipe.originalRecipeResult;

            event[type](output, ingredients)
                .keepIngredient("hexalia:mortar_and_pestle")
                .id(recipe.getId());
        });
    });

    event.replaceInput({ output: "farmersdelight:fried_egg" }, "minecraft:egg", "#c:eggs");

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
    ]).id("hearthandharvest:kjs/syrup_crate");

    event.smelting("sulfar_mod:sulfar", "projectvibrantjourneys:cindercane", 1.0, 200)
        .id("sulfar_mod:kjs/sulfar_from_smelting_cindercane");

    event.smelting("sulfar_mod:sulfar", "sulfar_mod:nether_sulfar_ore", 1.0, 200)
        .id("sulfar_mod:kjs/sulfar_from_smelting_nether_sulfar_ore");

    event.smithing("winteroverhaul:skates", "minecraft:string", "minecraft:leather_boots", "minecraft:iron_ingot")
        .id("winteroverhaul:kjs/skates_from_smithing_table");

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
        type: "farmersdelight:cooking",
        container: { item: "minecraft:bucket" },
        cookingtime: 100,
        experience: 0.35,
        ingredients: [{ item: "biomesoplenty:porous_flesh" }],
        recipe_book_tab: "misc",
        result: { item: "biomesoplenty:blood_bucket" },
    });

    new Map(Object.entries({
        cobblestone: "rocks",
        mossy_cobblestone: "mossy_rocks",
        sandstone: "sandstone_rocks",
        red_sandstone: "red_sandstone_rocks",
        ice: "ice_chunks",
    })).forEach((output, ingredient) => {
        event.custom({
            type: "farmersdelight:cutting",
            ingredients: [{ item: ingredient }],
            result: [{ item: "projectvibrantjourneys:" + output, count: 4 }],
            tool: {
                type: "farmersdelight:tool_action",
                action: "pickaxe_dig",
            },
        });
    });

    event.custom({
        type: "hexalia:mortar_and_pestle",
        ingredients: [{ item: "hexalia:saltsprout" }],
        output: { item: "hearthandharvest:salt" },
    });

    event.custom({
        type: "hexalia:mortar_and_pestle",
        ingredients: [{ item: "hexalia:silk_fiber" }],
        output: { item: "minecraft:string", count: 3 },
    });

    mortarAndPestleRecipe(event, Item.of("sulfar_mod:sulfar", 2), { item: "minecraft:blaze_powder" });
    mortarAndPestleRecipe(event, "minecraft:flint", { item: "minecraft:gravel" });
    mortarAndPestleRecipe(event, "minecraft:glowstone_dust", { item: "projectvibrantjourneys:glowcap" });
    mortarAndPestleRecipe(event, "hearthandharvest:cotton_candy", [
        { item: "minecraft:stick" },
        { item: "hearthandharvest:cotton" },
        { item: "minecraft:sugar" },
    ]);
    mortarAndPestleRecipe(event, Item.of("hexalia:salt", 2), [
        { item: "hearthandharvest:salt" },
        { tag: "hexalia:crushed_herbs" },
    ]);

    event.custom({
        type: "hexalia:ritual_table",
        ingredients: [{ item: "hexalia:air_node" }].concat(crushedHerbs),
        output: { item: "minecraft:phantom_membrane" }
    });

    event.custom({
        type: "hexalia:ritual_table",
        ingredients: [
            { item: "minecraft:rotten_flesh" },
            { item: "hearthandharvest:salt" },
            { item: "hearthandharvest:salt" },
            { item: "hearthandharvest:salt" },
            { item: "hearthandharvest:salt" },
        ],
        output: { item: "minecraft:leather" }
    }).id("hexalia:kjs/leather_from_salt_ritual_table");
});

LootJS.modifiers(event =>
    event.addBlockLootModifier("hexalia:salt_block").replaceLoot("hexalia:salt", "hearthandharvest:salt", true));

console.info("Loaded Snowy's Server Tweaks");