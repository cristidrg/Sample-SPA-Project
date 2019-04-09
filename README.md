# Outcomes Readme
## API Interaction
GraphQL Endpoint: https://7i6ffm3gkrhxnpbd5olq53nkwm.appsync-api.us-east-1.amazonaws.com/graphql

Api key: da2-5edjqbmorveqnlg7mou7bv65fq

GraphQL Query:

```
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
```


The back end can send up to 1000 responses for a query, providing offset parameters  to handle this. To work with this efficiently, the front end needs to fire async requests and wait for all of them to finish.

## Implementation
When the app is served, the client will fire requests to fetch all of the student data and storing it. We decided to go with this approach as we’ve seen that it does not produce significant waiting times on filtering on modern browsers (not ie11). This means that after the initial loading screen, all the data is available to interact with for the user. 


## Back-end data format
All of the back end data is being served as strings. While some fields have different null/empty values than others we are implementing the following filtering for the fields upon receiving the data:

```
career_outcomes.filter(element => element != "")

employment_status.filter(element => element != “ “ && element != “”);

final_university.filter(element => element != “NA" && element != "" & element != "#N/A");

final_coop_numbers.filter(element => element != “ “ && element != “”);
 
final_did_coop.filter(element => element != “ “ && element != “”);

element.final_industry.filter(element => element != “" && element != "#N/A" && element != " ");

final_companyname.filter(element => element != “NA” && element != “”)

salary_categories.filter(element => element != “ “ && element != “”)
```

## Maintenance
Doing a project wide search for `#Maintenance` inside the project will show you parts of the code you are likely to update in the following cases: 

### Adding more students:
When more students are added to the database the front end needs to add additional queries to fetch them if their number surpasses the current maximum (working in increments of 1000).    Check the *fetchData* method of *App.vue*.

It is important that the new students do not have different null values  that are not present in the filtering set in the previous section.

### Adding more categories
If more categories are added, there are some specific color to value mappings in the application for the *employment_status* and *career_outcomes* fields.  The application itself won’t break but they will receive the default color of gray if not specified. The code for this is inside the *routes/* folder in their specific pages.

## Useful links:
[Getting Started | 📈 vue-chartjs](https://vue-chartjs.org/guide/)
[Chart.js · Chart.js documentation](https://www.chartjs.org/docs/latest/)
[Vue.js Toggle Button](http://vue-js-toggle-button.yev.io/)
[Vue-Multiselect | Vue Select Library](https://vue-multiselect.js.org/)
[Introduction | Vue Router](https://router.vuejs.org/)
[chartjs-plugin-labels](https://emn178.github.io/chartjs-plugin-labels/samples/demo/)
[vue-scrollto  -  npm](https://www.npmjs.com/package/vue-scrollto)

## Potential Upgrades.
If in the future, filtering might seem slow, using memoization via [GitHub - reduxjs/reselect: Selector library for Redux](https://github.com/reduxjs/reselect) will reduce filtering time.

If we notice that the production server might be failing to respond,  introducing a please try again in a few minutes screen will be useful. 