# Pokedex
We are Ash Ketchum from Palate town, and our goal is to become master Pokemons! \
**Can you Catch'Em All?** -
[Pokedex (Please click on the main site's title - it's a surprise)](https://pokedex-pro.onrender.com):point_left:

## About this project:
This was a Cyber4s middle program project. \
The main goal of this project was to program a scalable web app that had a large database and could serve many users. \
At the beginning of this project, we used a MongoDB database and we had to create a database of 1 million merged Pokemons. \
During the development process, we were asked to make a migration between MongoDB and PostgreSQL databases and kept only 10,000 pokemon. 

## What have I learned?
1. How to create server-side by creating meaningful routes and controllers.
2. How to create MongoDB and PostgreSQL databases and how to make a migration between them.
3. How to create client-server-database integration by smart client serving. \
The client gets his data in chunks (by pagination approach) and not all at once.
4. How to create vanilla TypeScript components in React.js way.


## Technologies:
 **Front-End**:
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Sass](https://www.npmjs.com/package/sass)**
  
 **Back-End**:
- **[Express](https://www.npmjs.com/package/express)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[mongoDB](https://www.mongodb.com/)**

**Misc**:
- **[Webpack](https://webpack.js.org/)**
- **[ESlint](https://eslint.org/docs/latest/user-guide/configuring/)**


## Installation
1. **Clone the repo**
   ```
   git clone git@github.com:rom-orlovich/Pokedex.git
   ```
2. **Install all the dependencies**
   ```
    npm ci
   ```
3. **Run server**
   ```
   npm run server
   
   ```
4. **Run Client**

   ```
   npm run start
   ```

5. **Go to http://localhost:3000 and have fun**!

## Main Feautres:
1. **Infinite-Scrolling** - Every time the user scrolls to the bottom of the page, the client fetches more results. There is a scroll-up button
2. **Filter Pokemons by their name** - The user can filter the display of Pokemons by their names.
3. **Favorite Pokemons list** - The user can create and remove his favorite Pokemons list.


## Images: 
<img alt="Filter pokemons by their names" src="./readme-images/search.png" width="600" hight="600">
<img alt="Favorite pokemons list" src="./readme-images/favorites.png" width="600" hight="600">
<img alt="Main page" src="./readme-images/main.png" width="600" hight="600">


## Contributors:
* [rom-orlovich](https://github.com/rom-orlovich)
* [naornahum](https://github.com/naornahum)



