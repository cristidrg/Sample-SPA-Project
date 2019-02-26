export const getAllData = `
    query getData {
        getGraduateDestinations {
            id
            final_companyname
            final_university
            final_industry
            final_coop_numbers
            final_salary_recalculated
            employment_type
            employmemt_status
            job_year
            student_level
            collegedesc
            majordesc
        }
    }
`