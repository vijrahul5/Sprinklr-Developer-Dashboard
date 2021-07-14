class Mediator {}

Mediator.prototype.get = async function (model, searchObj, type) {
    try {
        if (type === "one") {
            return model.findOne(searchObj);
        } else if (type === "all") {
            return model.find(searchObj);
        }
    } catch (err) {
        return err;
    }
};

Mediator.prototype.set = async function (document, setObj) {
    for (let key in setObj) {
        document[key] = setObj[key];
    }
    try {
        return document.save();
    } catch (err) {
        return err;
    }
};

Mediator.prototype.create = async function (model, createObj) {
    try {
        return model.create(createObj);
    } catch (err) {
        return err;
    }
};

Mediator.prototype.delete = async function (model, deleteObj, type) {
    try {
        if (type === "one") {
            return model.deleteOne(deleteObj);
        } else if (type === "all") {
            return model.delete(deleteObj);
        }
    } catch (err) {
        return err;
    }
};

module.exports = Mediator;
