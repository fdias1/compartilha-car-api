const add = async (targetModel,targetRelArrName,triggerDoc,triggerRelArrName) => {
    for (let id of triggerDoc[triggerRelArrName]) {
        const targetDoc = await targetModel.findById(id)
        targetDoc[targetRelArrName].push(triggerDoc._id)
        await targetDoc.updateOne(targetDoc)
    }
}

const remove = async (targetModel,targetRelArrName,triggerDoc,triggerRelArrName) => {
    for (let id of triggerDoc[triggerRelArrName]) {
        const targetDoc = await targetModel.findById(id)
        targetDoc[targetRelArrName].splice(targetDoc[targetRelArrName].indexOf(triggerDoc._id),1)
        await targetDoc.updateOne(targetDoc)
    }
}

const saveTriggerHandler = (thisRelArrName,targetModel,targetRelArrName) => {
    return async function () {
        const thisRelArr = this[thisRelArrName]
        add(targetModel,targetRelArrName,this,thisRelArrName)
    }
}

const updateTriggerHandler = (thisRelArrName,targetModel,targetRelArrName) => {
    return async function () {
        const thisRelArr = (await this.model.findOne(this.getQuery()))[thisRelArrName]
        const thisDoc = await this.model.findOne(this.getQuery())
        add(targetModel,targetRelArrName,thisDoc,thisRelArrName)
    }
}

const delTriggerHandler = (thisRelArrName,targetModel,targetRelArrName) => {
    return async function () {
        const thisRelArr = (await this.model.findOne(this.getQuery()))[thisRelArrName]
        const thisDoc = await this.model.findOne(this.getQuery())
        remove(targetModel,targetRelArrName,thisDoc,thisRelArrName)
    }
}

module.exports = {saveTriggerHandler,updateTriggerHandler,delTriggerHandler}
