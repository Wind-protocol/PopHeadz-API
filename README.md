
This project includes a [Node.js](https://nodejs.org/en/about/) server script that uses a persistent [SQLite](https://www.sqlite.org) database.

The database stores chat messages, each one with an ID and string of message text. The endpoints allow the client to retrieve, add, update, and delete messages, using an admin key you can set in the `.env`.

_The home route `/` lists the endpoints in the API. With the Glitch editor open showing the preview on the right, click __Change URL__ and add `messages` to the end to see the first `GET` request._

## What's in this project?

← `README.md`: That’s this file, where you can tell people what your cool website does and how you built it.

← `server.js`: The Node.js server defines the endpoints in the site API, processing requests, connecting to the database using the `sqlite.js` script, and sending info back to the client.

← `sqlite.js`: The database script handles setting up and connecting to the SQLite database. The `server.js` API endpoints call the functions in the database script to manage the data.

When the app runs, the scripts build the database:

← `.data/popheadz.db`: Your database is created and placed in the `.data` folder, a hidden directory whose contents aren’t copied when a project is remixed. You can see the data in the Glitch Log when the scripts first execute.

-You can seed a new SQLite DB from the PopHeadz.csv file

← `package.json`: The NPM packages for your project's dependencies.

← `.env`: The environment is cleared when you initially remix the project, but you can add and edit.

## Setting up your admin key

The API allows the client to update data if a valid key is provided. This is a simplified example of auth that checks if the submitted key matches the one in the `.env`.

To set your app up to support auth:

* In your `.env` file, find the variable named `ADMIN_KEY` and give it a text string as a value.
* Pass the value with requests in an `admin_key` header.
