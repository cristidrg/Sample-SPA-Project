export const getAllData = (offset, max) => `
    query getData {
        getGraduateDestinationPage(offset: ${offset}, max: ${max}) {
            id
            final_companyname
            final_university
            final_industry
            final_did_coop
            final_coop_numbers
            final_salary_recalculated
            salary_categories
            employment_type
            employment_status
            job_year
            student_level
            collegedesc
            majordesc
            career_outcomes
        }
    }
`