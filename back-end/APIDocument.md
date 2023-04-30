API Document:

- The user sends a POST request to /signup with email, name, password, address, and zipCode in the request body. The server returns a 201 status code for successful signup and other codes for failed attempts.
- The user sends a POST request to /login with email and password as parameters. The server returns a 200 status code along with user information and cart details for successful login and other codes for failed attempts.
- The user sends a GET request to /logout. A 200 status code is returned if the logout is successful and other codes for failed attempts.
- The user sends a GET request to /cart to get authorization for the cart content. A 200 status code with the cart array is returned for authorized users and a null cart is returned for users who are not logged in.
- The user sends a POST request to /order with name, quantity, and URL in the request body. A 201 status code is returned for successful orders, and a 500 status code is returned if the user is not logged in.
- The user sends a GET request to /delete. A 201 status code is returned if the delete operation is successful, and a 500 status code is returned if the user is not logged in.
- The user sends a POST request to /update with address and zipCode in the request body. A 200 status code is returned for successful address updates, and a 500 status code is returned if the user is not logged in.
- The user sends a GET request to /checkout. A 200 status code is returned for successful cart cleaning, and a 500 status code is returned if the user is not logged in.
