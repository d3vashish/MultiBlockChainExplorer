# Multi Blockchain Explorer

## Project Overview
The Multi Blockchain Explorer is a web application that allows users to explore multiple blockchain networks. It provides key details such as the current block number, gas price, and the latest blocks for selected networks. The application supports Ethereum Sepolia, Polygon Mumbai, Avalanche Fuji, Hedera Testnet, and Base Sepolia networks.

## Features
- View the active network.
- Display the current block number and gas price.
- Fetch and display the latest blocks with details such as block number, hash, number of transactions, gas used, and timestamp.
- Switch between different blockchain networks.

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** N/A (relies on RPC endpoints for data fetching)
- **Libraries:** Axios (for API requests), React Router (for navigation)

## Environment Variables
To run this project, create a `.env` file in the root directory and add the following environment variables:

```
REACT_APP_ETHEREUM_SEPOLIA_RPC="https://rpc.ankr.com/eth_sepolia"
REACT_APP_POLYGON_MUMBAI_RPC="https://rpc.ankr.com/polygon_amoy"
REACT_APP_AVALANCE_FUJI_RPC="https://rpc.ankr.com/avalanche_fuji"
REACT_APP_HEDERA_TESTNET_RPC="https://testnet.hashio.io/api"
REACT_APP_BASE_SEPOLIA_RPC="https://rpc.ankr.com/base_sepolia"
```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/d3vashish/multi-blockchain-explorer.git
   cd multi-blockchain-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Usage
- Select a blockchain network from the dropdown menu.
- View the latest blocks and other details for the selected network.
- Navigate using the menu to explore blocks, transactions, or addresses.


## Dependencies
- **React**: Frontend library
- **Axios**: For API requests
- **Tailwind CSS**: For styling

## Contribution
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements
- RPC endpoints provided by Ankr and Hashio.
- Inspiration from various blockchain explorers.

## Contact
For queries, reach out to:
- **Email:** dsonkusare13@gmail.com
- **GitHub:** [d3vashish](https://github.com/d3vashish)
