# Career outcomes
## Tasks 11/87
### Curently worked on: Career UI 5 points
Tasks are completed once PR is merged

### Build Header  - 3 points DONE
PR: https://bitbucket.org/nupods/outcomes/pull-requests/1/header-component/

### Build Navigation & Filtering UI - 3 Points

### Build Career Outcomes UI - 5 points

### Build Employment Status UI - 3 points
Dependencies: **Mobile UI** **Lacks Appeal**

### Build Co-op Participation UI - 5 points

### Build Industry UI - 5 points DONE
PR: https://bitbucket.org/nupods/outcomes/pull-requests/2/industry-data

Dependencies:

- *View More Button Behavior*: There are a lot of companies, I assume a modal or some other mechanism would take effect rather than just appending a list of over 500 items to the displayed one  
- *Mobile UI*: not here yet

### Build Grad School UI - 3 points DONE
PR: https://bitbucket.org/nupods/outcomes/pull-requests/3

### Build Starting Salaries Screen - 2 points

### Build Map Screen - 8 points

### Implement Routing in Navigation - 13 points
- [ ] Learn Routing in Vue - 5 points
- [ ] Code split the current screens by route - 3 points
- [ ] Implement it ! - 5 points
Notes: SEO updates will come based on each route


### Integrating GraphQL Endpoint in our flow DevWork - 8 points

## TOTAL DEFINED: 53 POINTS 
## Points left for buffer: 34 POINTS


## Missing Requirements & Open Questions - ordered by importance 
- Figure out how to handle the selection of filters which produce 0 results.
One ideea is:
    You have two filters selected already which show some results.
    You click on the third filter and the dropdown shows with values
    Values are enabled only if they produce more than 0 results, otherwise they 
    are disabled/not clickable/grayed out
Proposed Solution: https://bitbucket.org/nupods/outcomes/pull-requests/5/filter-validation

- Consistency check for null value in database, different values are currently used
across fields to indicate nothingness

- Field used to query information about graduate school has values like: 
  'Harvard University - continuing university', the latter part is irelevant.
Other examples would be 'xxx university - master's programme'

- Mobile UI is not ready and it's not accounted towards total

- In two screens, there are View More Buttons. The content they expand to
has over 500 items, what would their behavior be?

- Listing Hiring Companies alphabetically in the Industry screen is not that useful

- Getting the sketch file or the exact typography, colors, padding for the design
would be nice

Cristi's Notes:

- Ask about padding/container for outcome layout

