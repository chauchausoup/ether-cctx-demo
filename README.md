##  etherjs and ccxt demo APIs with NestJS

This project showcases two APIs built using NestJS for interacting with cryptocurrency exchanges: Binance and Ethereum.

## Installation

1. Clone this repository.
2. Navigate to the project folder and install dependencies: `yarn install`


### Documentation
API documentation is generated using Swagger. You can access the Swagger UI by navigating to /api after starting the server. For example: `http://localhost:3000/api` .

`/ether/validate/{address}` \
`/ether/createWallet` \
`/ether/transactions/{count}` 

`/binance/tradableCoins` \
`/binance/coinPrice/{baseCoin}/{calculateAveragePrices}` 