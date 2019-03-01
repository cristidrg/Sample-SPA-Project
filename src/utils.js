const ALL = 'All';

const createArrayOfUniqueValues = (field, data) => [
    ...new Set(data.map(entry => entry[field]))
];

export {
    ALL,
    createArrayOfUniqueValues
};


