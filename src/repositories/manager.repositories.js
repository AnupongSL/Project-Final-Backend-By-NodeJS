const db = require('../database/models');

exports.findAll = async () => await db.Managers.findAll({
    order: [
        ['id', 'ASC']
    ]
})

exports.findByID = async (id) => await db.Managers.findByPk(id)

exports.add = async (manager1) => await db.Managers.create(manager1)

exports.update = async (id, manager1) => await db.Managers.update(manager1, {
    where: {
        id: id,
    }
})

exports.remove = async (id) => await db.Managers.destroy({
    where: {
        id: id
    }
})