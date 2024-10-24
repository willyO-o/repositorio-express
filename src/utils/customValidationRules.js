const fieldNotEmpty = (value) => {
    if (!value) {
        throw new Error('El campo no tiene elementos');
    }
    value = JSON.parse(value);

    //veriviar si el array tiene elementos
    if (value.length === 0) {
        throw new Error('El campo no tiene elementos');
    }
    return true;
}

const fieldNotEmptyString = (value) => {
    if (!value) {
        throw new Error('El campo no tiene elementos');
    }
    return true;
}

module.exports = {
    fieldNotEmpty,
    fieldNotEmptyString
}