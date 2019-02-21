import dataDump from './data_dump.json';

export const employers = [
    ALL,
    ...new Set(dataDump.map(entry => entry.final_COMPANYNAME))
];

export const schools = [
    ALL, 
    ...new Set(dataDump.map(entry => entry.final_UNIVERSITY))
];

export const industries = [
    ALL, 
    ...new Set(dataDump.map(entry => entry.final_INDUSTRY))
];

export const emp_status = [
    ALL,
    ...new Set(dataDump.map(entry => entry.employment_STATUS))
]

export const ALL = 'All';

export const st_lvl = {
    UNDERGRD: 'Undergraduate',
    GRAD: 'Graduate',
    PHD: 'PHD'
};

/* Fields to work with:
{
    "student_LEVEL": "Undergraduate",
    "employment_STATUS": "Employed part-time",
    "employment_TYPE": "Employed in a temporary/contract work assignment",
    "final_COMPANYNAME": "Harvard University",
    "final_INDUSTRY": "Educational Services",
    "final_SALARY_RECALCULATED": "52000",
    "final_UNIVERSITY": "NA",
    "final_COOP_NUMBERS": "1 Co-op",
}
*/
