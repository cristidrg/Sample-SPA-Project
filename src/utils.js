const ALL = 'All';

const createArrayOfUniqueValues = (field, data) => [
    ALL,
    ...new Set(data.map(entry => entry[field]))
];

export {
    ALL,
    createArrayOfUniqueValues
};


