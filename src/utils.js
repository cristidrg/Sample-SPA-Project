const ALL = 'All';
const ALL_COLLEGES = 'All colleges';
const ALL_YEARS = 'All years';

const createArrayOfUniqueValues = (field, data) => [
    ...new Set(data.map(entry => entry[field]))
];

const percentageOf = (value, total) => value / total * 100

export {
    ALL,
    ALL_COLLEGES,
    ALL_YEARS,
    createArrayOfUniqueValues,
    percentageOf
};


