
# miniBlog Web Application

This is a code repository for an assignement of Full-Stack blog application using Express.js with Node.js for the Backend, React for the Frontend and MySQL alongwith Prisma for the database.

Major requirement of the Web Application:
 - The user can  Add/Update/Delete a  post
 - Showing posts order by publication date.
 - Login/Register and create an account using an email/password
 - Showing the top 10 categories


## Setup and Run Locally

To run the app locally run you have to run Backend and Frontend seperately. 
### Backend Side
Go to the project directory
```bash
    cd mini-blog-api
    npm install
```

add this to .env file
```bash
    API_PORT=5000
    DATABASE_URL='mysql://bo1yb1jsec7lkuaxd91y:pscale_pw_SGCayYpY6QKrEODvNaPkmTVvkJtI9MJHpxjmRJNHEbw@aws.connect.psdb.cloud/mini-blog?sslaccept=strict'
```

Start the server

```bash
    nodemon index.js 
```

Your express server will now be running on port 5000. You can visit http://localhost:5000 in your web browser to verify that the server is working correctly.

### Fronend side

Go to the project directory

```bash
    cd mini-blog-client
    npm install
```

Start the server

```bash
    npm run dev
```
Runs the app in the development mode. Open http://localhost:3000 to view it in your browser.