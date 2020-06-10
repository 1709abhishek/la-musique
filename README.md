# la-musique -- Music full stack app
an API where anyone can create questions with options and also add votes to it.

# dependencies used

1. bcypt-nodejs
2. body-parser
3. connect-flash
4. connect-mongo
5. cookie-parser
6. crypto
7. ejs
8. express
9. express-ejs-layouts
10. express-flash-messages
11. express-session
12. flash
13. mongoose
14. nodemon
15. passport
16. passport-github
17. passport-google-oauth
18. passport-jwt
19. passport-local
20. request
21. unirest

# Routes
1. /questions/create → To create a question
2. /questions/:id/options/create → To add options to a specific question
3. /questions/:id/delete -> To delete a question
4. /options/:id/delete -> To delete an option
5. /options/:id/add_vote → To increment the count of votes
6. /questions/:id -> To view a question and it's options

# setup
1. clone https://github.com/1709abhishek/la-musique
2. cd la-musique
3. run nodemon index.js
4. open postman and visit api routes
5. sign-in,sign-up,google,github auth,sign-out,playlists,queues,add favorites, save preferences, show trending.
