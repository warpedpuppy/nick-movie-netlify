  <h1>NixFlix</h1>
    <p>
      This is my documentation file requiere to give you instructions in how to
      use this API. Hear we have the requirements for this API to work:
    </p>
    <h3>App Dependencies</h3>
    <ul>
      <li>Express</li>
      <li>Body-Parser</li>
      <li>Lodash</li>
      <li>Method-override</li>
      <li>Morgan</li>
      <li>UUID</li>
    </ul>
    <h3>Technical Requirements</h3>
    <ul>
      <li>The API must be a Node.js and Express application.</li>
      <li>
        The API must use REST architecture, with URL endpoints corresponding to
        the data operations listed above
      </li>
      <li>
        The API must use at least three middleware modules, such as the
        body-parser package for reading data from requests and morgan for
        logging.
      </li>
      <li>The API must use a “package.json” file.</li>
      <li>The database must be built using MongoDB.</li>
      <li>The business logic must be modeled with Mongoose.</li>
      <li>The API must provide movie information in JSON format.</li>
      <li>The JavaScript code must be error-free.</li>
      <li>The API must be tested in Postman.</li>
      <li>The API must include user authentication and authorization code.</li>
      <li>The API must include data validation logic.</li>
      <li>The API must meet data security regulations.</li>
      <li>
        The API source code must be deployed to a publicly accessible platform
        like GitHub.
      </li>
      <li>The API must be deployed to Heroku.</li>
    </ul>
    <table class="method-table">
      <tr>
        <th>GET</th>
        <th>POST</th>
        <th>PUT</th>
        <th>DELETE</th>
      </tr>
      <tr>
        <td>Return all movies use; /movies</td>
        <td>To add user use; /users</td>
        <td>To find user by id use; /users/:id</td>
        <td>To delete user use; /users/:id</td>
      </tr>
      <tr>
        <td>Return specific move use; /movies/:title</td>
        <td>To add a favorite movie use; /users/:id/:movieTitle</td>
        <td></td>
        <td>To delete a user's favorite movie use; /users/:id/:movieTitle</td>
      </tr>
      <tr>
        <td>Return director info use; /directors/:directorName</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Return Genre info use; /movies/genre/:genreName</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Return user list use; /users</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td class="table-end">Returned in JSON format.</td>
        <td class="table-end">Returned in JSON format.</td>
        <td class="table-end">Returned in JSON format.</td>
        <td class="table-end">Returned in JSON format.</td>
      </tr>
    </table>
