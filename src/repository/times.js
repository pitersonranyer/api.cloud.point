const Times = require('../model/times');

const listarTodos = () => {
    return Times.findAll().then(data => {
        if (data === null) {
            return false;
        } else {
            return data;
        }
    });
};

const consultaPorId = (id)  => {
    return Times.findByPk(id).then(data => {
        if (data === null) {
            return false;
        } else {
            return data;
        }
    });
};

module.exports = { listarTodos, consultaPorId };
