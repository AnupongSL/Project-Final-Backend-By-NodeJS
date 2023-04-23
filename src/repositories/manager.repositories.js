const db = require('../database/models');

exports.findAll = async () => await db.Managers.findAll({
    order: [
        ['id', 'ASC']
    ]
})

exports.findByID = async (id) => await db.Managers.findByPk(id)

exports.checkUser = async (username, email) => await db.Managers.findAll({
    where: {
        username: username,
        email: email,
    }
})

exports.checkUserPass = async (username, password) => await db.Managers.findAll({
    where: {
        username: username,
        password: password,
    }
})

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