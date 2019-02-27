# Career outcomes
## Tasks 0/53
## Curently worked on: 8 points

### Build Header  - 3 points
PR: https://bitbucket.org/nupods/outcomes/pull-requests/1/header-component/

### Build Navigation & Filtering UI - 3 Points

### Build Career Outcomes UI - 5 points

### Build Employment Status UI - 3 points
Dependencies: **Mobile UI** **Lacks Appeal**

### Build Co-op Participation UI - 5 points

### Build Industry UI - 5 points
PR: https://bitbucket.org/nupods/outcomes/pull-requests/2/industry-data

Dependencies:

- *View More Button Behavior*: There are a lot of companies, I assume a modal or some other mechanism would take effect rather than just appending a list of over 500 items to the displayed one  
- *Mobile UI*: not here yet

### Build Grad School UI - 3 points
- [ ] Leverage view more functionality from industry

### Build Starting Salaries Screen - 2 points

### Build Map Screen - 8 points

### Implement Routing in Navigation - 13 points
- [ ] Learn Routing in Vue - 5 points
- [ ] Code split the current screens by route - 3 points
- [ ] Implement it ! - 5 points
Notes: SEO updates will come based on each route


### Integrating GraphQL Endpoint in our flow DevWork - 8 points

## TOTAL: 53 POINTS 

## Open Questions - ordered by importance / Missing Requirements
- Figure out how to handle the selection of filters which produce 0 results.
One ideea is:
    You have two filters selected already which show some results.
    You click on the third filter and the dropdown shows with values
    Values are enabled only if they produce more than 0 results, otherwise they 
    are disabled/not clickable/grayed out

- In two screens, there are View More Buttons. The content they expand to
has over 500 items, what would their behavior be?

- Listing Hiring Companies alphabetically in the Industry screen is not that useful

- Getting the sketch file or the exact typography, colors, padding for the design
would be nice

- Mobile UI is not ready and it's not accounted towards total


## Dev Notes
Make sure College to Industry mapping in filtering works if these filters will remain