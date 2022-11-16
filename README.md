# Project 4 Pitch:
I plan on creating a website where gamers who play rocket league will be able to go and sign up for small tournaments. This website will hold info for rocket league news/updates, tournaments, and more. These tournaments will win them real money but there is a "background-check" and regulations to avoid smurfs as best as possible. 

## Technology:
- MERN Stack
- cloudinary 
- tailwind
- bcrypto

## WireFrames
![wireframe](./img/WireFrame.png)

## ERDs:
<!-- ![ERDs](./img/ERDs.png) -->

## Restful Routes:

### User Routes
| Method | Path | Purpose |
| ------ | -------------- | -------------------------------- |
| GET | `/register/` | signup page |
| POST | `/register/` | creates a new user |
| POST | `/login/` |  user authentication |
| GET | `/:username/` | user profile page |
| GET | `/:username/edit/` | user profile edit profile selection (settings) |
| PUT | `/:username/edit/` | update profile changes|
| DELETE | `/:username/` | delete user profile page (redirect to login) |
| GET | `/home` | homepage |
| GET | `/tournaments` | all tournaments |
| GET | `/tournaments/:id` | details for specific tournament |
| POST | `/tournaments/:id` | user can add a comment to discussion forum |
| PUT | `/tournaments/:id/:comid` | update comment |
| DELETE | `/tournaments/:id/:comid` | delete comment |
| GET | `/tournaments/:id/submission` | form to sign up for specific tournament |
| POST | `/tournaments/:id/submission` | submit form for specific tournament |
| GET | `/tournaments/:id/submission/:subid` | submission for specific tournament |
| PUT | `/tournaments/:id/submission/:subid` | update form for specific tournament |
| DELETE | `/tournaments/:id/submission/:subid` | undo submission for specific tournament |

### Admin Special Routes:
| Method | Path | Purpose |
| ------ | -------------- | -------------------------------- |
| GET | `/tournaments` | All tournaments |
| POST | `/tournaments` | New tournament post |
| GET | `/tournaments/:id` | tournaments will have edit option |
| PUT | `/tournaments/:id` | update tournament details |
| DELETE | `/tournaments/:id` | cancel tournament |
| GET | `/tournaments/:id/submission/:subid` | submission for specific tournament |
| PUT | `/tournaments/:id/submission/:subid` | update form for specific tournament (approved or not) |
| DELETE | `/tournaments/:id/submission/:subid` | undo submission for specific tournament (player removed) |

## User Stories:
- user will be able to access homepage without an account
- user will be able to access Tournament details without an account
- user will be able to access All Tournaments without an account
- user will be able to login/register for an account
- user with an account will be able to sign up for tournament 
- user with an account will be able to comment on tournament
- user with an account will be able to edit/delete comment
- user with an account will be able to edit/delete profile 

## MVP Goals:
- [x] Homepage with site purpose/use 
- [ ] Page for all tournaments with a search function
- [x] tournament details have a discussion part 
- [ ] Users can enter a tournament through details
- [x] Users can comment in discussion 
- [x] User can edit/delete comment
- [x] User has personalized profile
- [x] User can edit/delete profile

## Stretch Goal:
- [x] profile photo
- [x] adding streaming preview of tournament 
- [ ] adding brackets for tournament
- [ ] api to track rocket league rank 
- [ ] admin checkbar

## Sprint:
Day 1:
- build backend server with routes as much as possible and then link to front end server

Day2:
- Start building out frontend functionality page by page

Day3:
- Start adding in all minor content and ensuring functionality is up to par 

Day4:
- Debugging and functionality with css/tailwind tampering

Day5: 
- Tailwind tampering & Debugging 

Day6: 
- Tailwind tampering & Debugging (deployment) 
