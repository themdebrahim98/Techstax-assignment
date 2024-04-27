# Techstax Assignment

## Client

### How to Run

To run the client application, follow these steps:

1. Navigate to the client folder:
    ```bash
    cd client
    ```

2. Install packages for the client:
    ```bash
    npm install
    ```

3. Start the client:
    ```bash
    npm run dev
    ```


## Server

### How to Run

To run the server application, follow these steps:

1. Navigate to the server folder:
    ```bash
    cd server
    ```

2. Install packages for the server:
    ```bash
    npm install
    ```

3. Create a `.env` file in the server folder, if not already present, and define the following variables:

    ```plaintext
    MONGODB_URL="mongodb+srv://your_username:your_password@your_cluster_url/your_database_name?retryWrites=true&w=majority&appName=your_app_name"
    ACCESS_TOKEN_SECRET="your_access_token_secret"
    ```

    Replace the placeholder values with your actual MongoDB connection URL and access token secret.

4. Start the server:
    ```bash
    npm run dev
    ```



## License

This project is licensed under the [MIT License](LICENSE).
