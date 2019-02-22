import dataDump from './data_dump.json';

export const ALL = 'All';

const createArrayOfUniqueValues = (field, data) => [
    ALL,
    ...new Set(data.map(entry => entry[field]))
];

export const employers = createArrayOfUniqueValues("final_COMPANYNAME", dataDump);

export const schools = createArrayOfUniqueValues("final_UNIVERSITY", dataDump);

export const industries = createArrayOfUniqueValues("final_INDUSTRY", dataDump);

export const emp_status = createArrayOfUniqueValues("employment_STATUS", dataDump);

export const years = createArrayOfUniqueValues("job_YEAR", dataDump);

export const stdnt_level = createArrayOfUniqueValues("student_LEVEL", dataDump);

export const colleges = createArrayOfUniqueValues("collegedesc", dataDump);

export const majors = createArrayOfUniqueValues("majordesc", dataDump);


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
