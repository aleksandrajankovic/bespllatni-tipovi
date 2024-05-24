<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">


</head>
<body>

  <h1>Betting Tips Platform</h1>

  <p>Welcome to the Betting Tips Platform repository! This project is a web application designed for managing and sharing betting tips. The platform consists of both frontend and backend components.</p>

  <h2>Frontend</h2>

  <h3>Technologies Used:</h3>
  <ul>
    <li><strong>React.js:</strong> A JavaScript library for building user interfaces.</li>
    <li><strong>Redux:</strong> State management for handling global application state.</li>
    <li><strong>Axios:</strong> A library for making HTTP requests to the backend.</li>
    <li><strong>Bootstrap or Material-UI:</strong> Styling libraries for creating a visually appealing user interface.</li>
  </ul>

  <h3>Components:</h3>
  <ul>
    <li><strong>Navbar:</strong> Allows users to sign in, sign out, and search for different types.</li>
    <li><strong>TipList:</strong> Lists all active and expired tips.</li>
    <li><strong>ActiveTipItem:</strong> Displays information about active tips.</li>
    <li><strong>ExpiredTipItem:</strong> Displays information about expired tips with labels "winner" or "loser."</li>
    <li><strong>TipDetailPopup:</strong> Opens when "read more" is clicked, providing detailed information and comments.</li>
  </ul>

  <h3>Features:</h3>
  <ul>
    <li>Filtering and sorting of tips.</li>
    <li>Like/Dislike functionality.</li>
    <li>Display and addition of comments.</li>
  </ul>

  <h2>Backend</h2>

  <h3>Technologies Used:</h3>
  <ul>
    <li><strong>Node.js:</strong> JavaScript runtime for server-side development.</li>
    <li><strong>Express.js:</strong> Framework for creating APIs.</li>
    <li><strong>MongoDB:</strong> NoSQL database for storing tip and user information.</li>
    <li><strong>Mongoose:</strong> Object-Document Mapping (ORM) for MongoDB.</li>
    <li><strong>JWT:</strong> JSON Web Tokens for authentication.</li>
  </ul>

  <h3>Routes:</h3>
  <ul>
    <li><code>GET /tips</code>: Fetches all tips.</li>
    <li><code>POST /tips</code>: Adds a new tip.</li>
    <li><code>GET /tips/:id</code>: Fetches a specific tip by ID.</li>
    <li><code>PUT /tips/:id</code>: Updates a specific tip.</li>
    <li><code>DELETE /tips/:id</code>: Deletes a specific tip.</li>
    <li><code>POST /tips/:id/like</code>: Adds a "like" to a specific tip.</li>
    <li><code>POST /tips/:id/dislike</code>: Adds a "dislike" to a specific tip.</li>
    <li><code>POST /tips/:id/comment</code>: Adds a comment to a specific tip.</li>
    <li>Authentication routes for user management.</li>
  </ul>

  <h3>Database:</h3>

  <h4>Tip Model:</h4>
  <ul>
    <li>Rivals</li>
    <li>League</li>
    <li>Sport</li>
    <li>Date and time</li>
    <li>Proposed tip and odds</li>
    <li>Number of likes/dislikes</li>
    <li>Description</li>
    <li>Comments</li>
  </ul>

  <h4>User Model:</h4>
  <ul>
    <li>Username</li>
    <li>Password</li>
    <li>Email</li>
    <li>Tips added by the user</li>
    <li>User's like/dislike history</li>
  </ul>

  <h3>Authentication:</h3>
  <p>Implement JWT authentication to enable user authentication for adding, updating, and deleting tips.</p>

  <h3>Security:</h3>
  <ul>
    <li>Implement CORS policy.</li>
    <li>Hash passwords before storing them in the database.</li>
    <li>Input validation and protection against SQL injection attacks.</li>
  </ul>

  <h2>Getting Started</h2>

  <ol>
    <li>Clone the repository.</li>
    <li>Install dependencies for both frontend and backend using <code>npm install</code>.</li>
    <li>Set up MongoDB and configure the connection in the backend.</li>
    <li>Run the frontend and backend servers using <code>npm start</code>.</li>
  </ol>

  <p>Feel free to contribute and improve this platform. Happy coding!</p>

</body>
</html>
