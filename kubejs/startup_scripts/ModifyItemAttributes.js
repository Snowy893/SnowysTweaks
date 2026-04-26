//priority: 10

function pseudoRandomUUID(seedString){
    const $CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag")
    const tag = new $CompoundTag()
    tag.putString("4fb32ac0-c684-4828-9992-4e122191c65d", seedString)
    const seed = tag.hashCode()
    const random = Utils.newRandom(seed)
    const byteArray = Array(32).fill(0).map(_ => Array(4).fill(0).map(_ => random.nextBoolean()).reduce((a, b, index) => (a + b * (2 ** index))))
    const $UUID = Java.loadClass("java.util.UUID")
    return $UUID.nameUUIDFromBytes(byteArray)
}

function _ItemAttributes(){
    this.$Modifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier")
    this.$Attributes = Java.loadClass("net.minecraft.world.entity.ai.attributes.Attributes")
    this.checkAttribute = attribute => {    
        if(attribute instanceof String){
            const registeredAttributes = Utils.getRegistryIds("attribute").toArray().map(c => `${c}`)
            if(!registeredAttributes.includes(attribute)) {
                console.warn(`CANNOT FIND ATTRIBUTE WITH ID ${attribute}`)
                return false;
            }
        }
        return attribute
    }

    this.$EquipmentSlot = Java.loadClass("net.minecraft.world.entity.EquipmentSlot")
    this.armorSlots = this.$EquipmentSlot.values().filter(slot => slot.armor)
    this.array = []

    this.curiosMaxRepeatSlotNumber = 10
    this.curiosArray = []

    this.arrayToRemove = []
    /**
     * 
     * @param {Internal.Consumer<_ItemAttributes>} modify
     */
    this.modify = modify => {
        StartupEvents.postInit(event => modify(this))
        if(Utils.server) modify(this)
    }
}

_ItemAttributes.prototype._add = function(itemFilter, attmod, slot){
    /**@type {Internal.Ingredient} */const filter = Ingredient.of(itemFilter)
    const index = this.array.findIndex(ele => filter.equals(ele.filter) && (!ele.slot || ele.slot == attmod.slot))
    if(index != -1) {
        this.array[index].attmods.push(attmod)
    }
    else this.array.push({filter: filter, attmods:[attmod], slot:slot})
}

_ItemAttributes.prototype._curios_add = function(itemFilter, attmod){
    /**@type {Internal.Ingredient} */const filter = Ingredient.of(itemFilter)
    const index = this.curiosArray.findIndex(ele => filter.equals(ele.filter))
    if(index != -1) {
        this.curiosArray[index].attmods.push(attmod)
    }
    else this.curiosArray.push({filter: filter, attmods:[attmod,]})
}

/**
 * 
 * @param {Internal.Ingredient} itemFilter 
 * @param {Internal.Attribute} attribute 
 * @param {number} amount 
 * @param {Internal.AttributeModifier$Operation_} operation 
 * @param {Internal.EquipmentSlot_} slot
 * @returns 
 */
 _ItemAttributes.prototype.add = function (itemFilter, attribute, amount, operation, slot, addToEntity){
    const _add = () => {
        const filter = Ingredient.of(itemFilter)
        const attribute_ = this.checkAttribute(attribute)
        const modifier = new this.$Modifier(pseudoRandomUUID(`${attribute}_${operation}_${itemFilter.hashCode()}`), "addedByKubejs", amount, operation)
        const curiosModifiers = Array.from(Array(this.curiosMaxRepeatSlotNumber).keys()).map(i => new this.$Modifier(pseudoRandomUUID(`curios_${i}_${attribute}_${operation}_${itemFilter.hashCode()}`), addToEntity ? "needAddToEntity" :"addedByKubejs", amount, operation))    
        this._add(filter, {attribute: attribute_, modifier: modifier}, slot)
        this._curios_add(filter, {attribute: attribute_, modifiers: curiosModifiers})
    }
    _add()
}


_ItemAttributes.prototype._remove = function(itemFilter, att, slot){
    /**@type {Internal.Ingredient} */const filter = Ingredient.of(itemFilter)
    const index = this.arrayToRemove.findIndex(ele => filter.equals(ele.filter) && (!ele.slot || ele.slot == attmod.slot))
    if(index != -1) {
        this.arrayToRemove[index].attmods.push(att)
    }
    else this.arrayToRemove.push({filter: filter, atts:[att], slot:slot})
}

/**
 * 
 * @param {Internal.Ingredient} itemFilter 
 * @param {Internal.Attribute} attribute 
 * @param {Internal.EquipmentSlot_} slot 
 */
_ItemAttributes.prototype.remove = function (itemFilter, attribute, slot){
    const filter = Ingredient.of(itemFilter)
    const attribute_ = this.checkAttribute(attribute)
    //const _remove = () => {this._remove(filter, attribute_, slot)}
    this._remove(filter, attribute_, slot)
}

ForgeEvents.onEvent("net.minecraftforge.event.ItemAttributeModifierEvent", event => {
    global.V$ItemAttributeModifierEvent(event)    
})

const ItemAttributes = new _ItemAttributes()
global.V$ItemAttributeModifierEvent = event => {
    /**@type {Internal.ItemStack} */const itemStack = event.itemStack
    /**@type {Internal.EquipmentSlot} */ const slotType = event.slotType
    const isCurios = itemStack.itemHolder.tagKeys.anyMatch(tagkey => tagkey.location().namespace == "curios")
    const player = Utils.server.players.first
    if(!player) return;
    const armorSlot = ItemAttributes.armorSlots.filter(slot => itemStack.canEquip(slot, player))[0]
    const checkSlot = slot => slotType == (slot ? slot : armorSlot ? armorSlot : isCurios ? "null" : "mainhand")
    const attsToRemoveArray = ItemAttributes.arrayToRemove.filter(ele => ele.filter.test(itemStack) && checkSlot(ele.slot)).map(ele => ele.atts)
    const attsToRemove = attsToRemoveArray.length > 0 ? attsToRemoveArray.reduce((a, b) => a.concat(b)) : []
    attsToRemove.forEach(att => event.removeAttribute(att))

    const attmodsArray = ItemAttributes.array.filter(ele => ele.filter.test(itemStack) && checkSlot(ele.slot)).map(ele => ele.attmods)
    const attmods = attmodsArray.length > 0 ? attmodsArray.reduce((a, b) => a.concat(b)) : []
    attmods.forEach(attmod => {
        if(attmod.modifier.getName() == "needAddToEntity") return;
        event.addModifier(attmod.attribute, attmod.modifier)
    })
}

ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingEquipmentChangeEvent", event=>{
    global.V$LivingEquipmentChangeEvent(event)
})
/**@param {Internal.LivingEquipmentChangeEvent_} event */
global.V$LivingEquipmentChangeEvent = event => {
    const {from, to, slot, entity} = event
    to.getAttributeModifiers(slot).forEach((att, mod) => {
        if(mod.getName() != "needAddToEntity") return;
        entity.modifyAttribute(att, mod.id, mod.amount, mod.operation)
    })
    from.getAttributeModifiers(slot).forEach((att, mod) => {
        if(mod.getName() != "needAddToEntity") return;
        entity.removeAttribute(att, mod.id)
    })
}

// ↓↓↓ REMOVE THESE IF YOU DON'T HAVE CURIOS ↓↓↓
if(Platform.isLoaded("curios")){
    global.V$CurioAttributeModifierEvent = event => {
        const {itemStack, slotContext} = event
        const slotIndex = slotContext.index()
        const attsToRemoveArray = ItemAttributes.arrayToRemove.filter(ele => ele.filter.test(itemStack)).map(ele => ele.atts)
        const attsToRemove = attsToRemoveArray.length > 0 ? attsToRemoveArray.reduce((a, b) => a.concat(b)) : []
        attsToRemove.forEach(att => event.removeAttribute(att))
        const attmodsArray = ItemAttributes.curiosArray.filter(ele => ele.filter.test(itemStack)).map(ele => ele.attmods)
        const attmods = attmodsArray.length > 0 ? attmodsArray.reduce((a, b) => a.concat(b)) : []
        attmods.forEach(attmod => {
            const modifier = attmod.modifiers[slotIndex]
            if(!modifier) return
            if(modifier.getName() == "needAddToEntity") return;
            event.addModifier(attmod.attribute, modifier)
        })
    }
    ForgeEvents.onEvent("top.theillusivec4.curios.api.event.CurioAttributeModifierEvent", event => {
        global.V$CurioAttributeModifierEvent(event)
    })
    
    /**@param {Internal.CurioChangeEvent_} event */
    global.V$CurioChangeEvent = event => {
        const {from, to, entity, identifier} = event
        const V$CuriosHelper = Java.loadClass("top.theillusivec4.curios.common.CuriosHelper")
        const curiosHelper = new V$CuriosHelper()
        /**@type {Internal.Multimap<Internal.Attribute, Internal.AttributeModifier>} */
        const to_attributesMap = curiosHelper.getAttributeModifiers(identifier, to)
        to_attributesMap.forEach((att, mod) => {
            if(mod.getName() != "needAddToEntity") return;
            entity.modifyAttribute(att, mod.id, mod.amount, mod.operation)
        })
        /**@type {Internal.Multimap<Internal.Attribute, Internal.AttributeModifier>} */
        const from_attributesMap = curiosHelper.getAttributeModifiers(identifier, from)
        from_attributesMap.forEach((att, mod) => {
            if(mod.getName() != "needAddToEntity") return;
            entity.removeAttribute(att, mod.id)
        })
    }    
    ForgeEvents.onEvent("top.theillusivec4.curios.api.event.CurioChangeEvent", event => {
        global.V$CurioChangeEvent(event)
    })    
}

// ↑↑↑ REMOVE THESE IF YOU DON'T HAVE CURIOS //

