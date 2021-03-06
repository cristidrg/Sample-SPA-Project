const ALL = 'All';
const ALL_COLLEGES = 'All Colleges';
const ALL_YEARS = 'All Years (2016 & 2017)';

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
