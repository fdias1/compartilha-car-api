const { Model, model } = require("mongoose")

const create = (Model) => (
    async data => {
        const newObject = new Model(data)
        await newObject.save()
        return newObject
    }
)

const readOne = (Model) => (
    async id => {
        const data = await Model.findById(id)
        return data
    }
)

const readAll = (Model) => (
    async () => {
        const data = await Model.find({})
        return data
    }
)

const readQuery = (Model) => (
    async (queryObject) => {
        const data = await Model.find(queryObject)
        return data
    }
)

const update = (Model) => (
    async (id,object) => {
        const data = await Model.findByIdAndUpdate(id,object)
        return data
    }
)

const del = (Model) => (
    async id => {
        const data = await Model.findByIdAndDelete(id)
        return data
    }
)

const crud = Model => (
    {
        create:create(Model),
        readOne:readOne(Model),
        readAll:readAll(Model),
        readQuery:readQuery(Model),
        update:update(Model),
        del:del(Model),
    }
)

module.exports = crud