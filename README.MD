# Bank Simulator

This project consists of two main parts: the API and the client.

## BankSymulatorApi

This is the backend of the application, built with .NET. It contains the main logic for the bank simulator.

Before the first running application, ensure the database connection string is set up in appsetting.json file and then go to the 'database setup' step before running the application.

To run the API, navigate to the `BankSymulatorApi` directory and run:

```sh
dotnet run
```

The API will start on https://localhost:44397/.

## Database Setup

This application uses Entity Framework Core for data access. Before running the application, you need to create the database.

Navigate to the `BankSymulatorApi` directory and run the following command:

```sh
dotnet ef database update
```

## Banksymulatorclient

This is the frontend of the application, built with React and Vite.

Navigate to the vite.config.js file and ensure that the connection variable 'server' is correctly configured. 

To run the client, navigate to the banksymulatorclient directory and run:

```sh
npm run dev
```

The client will start on http://localhost:5173/.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
GNU GPLv3

# How to use?

## As user

Navigate to the client application running on http://localhost:5173/.
Click on the "Register" button on navbar.
Fill in the registration form with your details. This typically includes fields like username, email, and password.
Click on the "Register" button to submit the form.
Now you can log in and use application as user.

## As admin

Register a user following the normal registration process.
Identify the user's ID in the `AspNetUsers` table.
Identify the admin role ID in the `AspNetRoles` table. The role name is typically "Admin".
Insert a new record in the `AspNetUserRoles` table with the user's ID and the admin role ID.

# Known Issues

## Admin Mode Activation Requires Page Refresh

**Issue:** After logging as an admin, the admin privileges may not immediately reflect without refreshing the page.

**Solution:** If you've logged as an admin but cannot access admin features, try refreshing the page. This action should update the user's role and grant admin privileges.

### Work in Progress

I am actively working on addressing any known issues and improving the application's functionality. If you encounter any problems or have suggestions for improvement, please feel free to reach out or monitor the project's repository for updates.
