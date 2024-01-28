# Resource Wall Workflow

- SPA behaviour utilizing modals
- Working on backend and frontend together 
- Building and seeding Database first

## Database
- An asterisk marks the column as mandatory *
- Using concise seeding method (One INPUT INTO statement and multiple values lines)
- Using Chat GPT to help create randomized seeds
### Users table
- ID *
- username *
- First name
- Last name
- email address *

### Resources
- ID *
- user_id *
- category_id 
- url *
- title *
- description *
- rating
- thumbnail

### Likes
- ID *
- user_id *
- resource_id *

### Comments
- ID *
- user_id *
- resource_id *
- text *
- date_posted *

### Categories
- ID *
- topic *

> Seeding 8 users, and between 6 - 10 resources per category.

### Category names:
- Javascript
- React
- Ruby
- CSS
- Front-end
- Back-end

## Styles

TODO: Investigate if we prefer bootstrap or SASS

### Nav
!["nav"](screenshot)
- Logo
- Home
- Create new (modal)
- Search
- Profile

### Modals
!["modals"](screenshot)
- centered in page, darken page background
- X button to close in top right corner
- user can click darkened page to exit modal
  - this clears any information that was entered

### Create New (modal)
!["create new modal"](screenshot)
- Form including:
  - Optional thumbnail
  - Title
  - Description
  - URL
  - Category

### Resources (modal)
!["resources modal"](screenshot)
- user must open the resource before they can like it
- left side thumbnail
- like button top right of inner container
- description
- comments (accordion)
  - Individual comments include:
    - username
    - user image
    - text
    - timestamp
  - comments section can scroll to view more
- New comment form (input + submit)

### Main page
!["main"](screenshot)
- grid-style images, default is to show all resources
- on hover, images darken and show a truncated version of the description.
- on hover images, the cursor changes to a pointer to indicate user can click

### Profile page
!["profile"](screenshot)
- Top displays the profile info:
  - User image
  - Username
  - Edit profile button
- Beneath profile info is a grid similar to main page showing the user's created and liked resources
- If the user created the resource, they have an option to delete
- If the user liked the resource, they have an option to Unlike

### Search component
!["search"](screenshot)
- located in nav
- text input field
- X appears to clear input and stop typing when input field selected
- category drop-down for filtering
- Submit button or Enter allows form to submit

## Routes
> To be discussed
- Using cookies-session

## Optional Stretch Features
- Custom categories
- Pagination (load more behaviour)
  - If pagination, return to top button
