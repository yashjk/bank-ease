# BankEase

BankEase is a modern banking application built with TypeScript and Next.js, designed to provide a seamless user experience for managing finances.

## Features

- **User Authentication**: Sign up for an account and securely authenticate users.
- **Plaid Integration**: Connect your bank account to the sandbox environment using Plaid for seamless financial data retrieval.
- **Dashboard**: View recent transactions on the Dashboard and the Recent Transactions page.
- **Bank Details**: Check your bank details on the My Banks page.
- **Multiple Account Support**: Connect and manage multiple bank accounts.
- **Real-time Funds Transfer**: Transfer funds between accounts using sharableId for instant transactions.

## Tech Stack

- **Frontend**: TypeScript, Next.js, TailwindCSS, shadcn/ui
- **Backend**: Appwrite
- **Data Visualization**: Chart.js
- **Financial Integration**: Plaid, Dwolla
- **Deployment**: Vercel
- **Error Monitoring**: Sentry

## Getting Started

1. **Clone the repository**:

   ```
   git clone https://github.com/yashjk/bank-ease.git
   cd bank-ease
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```
3. Set up environment variables:

Create a .env file based on the .env.example template and fill in the required credentials and configurations.
You can obtain these credentials by signing up on the [Appwrite](https://appwrite.io/?utm_source=youtube&utm_content=reactnative&ref=JSmastery), [Plaid](https://plaid.com/) and [Dwolla](https://www.dwolla.com/)

4. Run the application:

```
npm run dev
```
or 
```
yarn run dev
```

## Contributing
Contributions are welcome! If you'd like to contribute to BankEase, please follow these steps:

- Fork the repository.
- Create a new branch `git checkout -b feature/your-feature-name`
- Make your changes.
- Commit your changes `git commit -am 'Add some feature'`
- Push to the branch `git push origin feature/your-feature-name`
- Create a new Pull Request.

