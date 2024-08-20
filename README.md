# Blog-platform-API
This project is a blog API built with TypeScript, Express, and TypeORM, designed to manage articles, tags, users, and statuses. It provides endpoints for creating, updating, deleting, and retrieving articles, with a focus on clean and easy to test code.

## Features
- User Authentication: Secure authentication and authorization to protect user data.
- Article Management: Create, update, and delete articles.
- Tagging System: Articles can be tagged with multiple tags for better organization.
- Status Management: Articles can have statuses like "draft", "published or "archived"."
- MySQL Database: Data is stored in a MySQL database, managed with TypeORM.

## Technologies
- Node.js and Express.js for the server and routing.
- TypeScript for static type-checking and improved development experience.
- TypeORM for object-relational mapping and managing complex database relationships.
- JWT for secure user authentication.

  ## Setup
  1. Clone the Repository:
     
     `https://github.com/Luwa-Tech/Blogging-platform-API`
  2. Install Dependencies:
     
     `npm install`
  3. Setup Environment Variables:
      Create a .env file in the root directory and add the following:
     
       ```
       DB_USERNAME=your-db-username
       DB_PASSWORD=your-db-password
       DB_NAME=your-db-name
       DB_PORT=3306
       DB_HOST=localhost
       ACCESS_KEY=your-secret-key
       NODE_ENV=development
       ```

  4. Start the Server:
     
     `npm run start`

  6. Testing:
      - Use Postman or Thunder Client to test the endpoints.
      - Ensure the MySQL server is running on your local machine.
