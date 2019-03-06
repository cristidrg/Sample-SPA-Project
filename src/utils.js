const ALL = 'All';

const createArrayOfUniqueValues = (field, data) => [
    ...new Set(data.map(entry => entry[field]))
];

const percentageOf = (value, total) => value / total * 100

export {
    ALL,
    createArrayOfUniqueValues,
    percentageOf
};


