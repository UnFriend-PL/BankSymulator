# Bank Simulator

This project consists of two main parts: the API and the client.

## Database Setup

This application uses Entity Framework Core for data access. Before running the application, you need to create the database.

Navigate to the `BankSymulatorApi` directory and run the following command:

```sh
dotnet ef database update
```

## BankSymulatorApi

This is the backend of the application, built with .NET. It contains the main logic for the bank simulator.

To run the API, navigate to the `BankSymulatorApi` directory and run:

```sh
dotnet run
```

The API will start on https://localhost:44397/.

## Banksymulatorclient

This is the frontend of the application, built with React and Vite.

To run the client, navigate to the banksymulatorclient directory and run:

```sh
npm run dev
```

The client will start on http://localhost:5173/.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
GNU GPLv3
