# Serverless Crytocurrency Price Monitor

### Linkedin: https://www.linkedin.com/in/walldba/

## Index

- [About](#about)
- [Diagram](#diagram)
- [Usage](#usage)
- [Technologies](#technologies)

## About
This app was built to monitor a cryptocurrency price and send a notification if the price had an oscillation. 
To create this solution, I used Serverless Framework, AWS Lambda, DynamoDB and SES.
To avoid unnecessary charges on AWS, I chose use the Localstack to simulate AWS environment offline.

## Diagram

![Alt text](/docs/solution-diagram.png?raw=true 'Solution Diagram')

## Usage
### To run on development:
To install all packages use the command:

```bash
yarn install
```

To simulate AWS enviromennt offline using localstack:

```bash
docker compose up -d
```

To create the dynamoDb tables:

```bash
bash ./scripts/create-db-table.sh
```

To invoke functions locally:

```bash
yarn invoke:getPrice
yarn invoke:sendNotification
```

### To run on Serverless Framework:
- Configure AWS envinments:
  
  - AWS config file:
    ```
    [default]
    region=us-east-1
    output=json
    ```
  - AWS credentials file:
    ```
    [default]
    aws_access_key_id=<YOUR_AWS_ACCESS_KEY>
    aws_secret_access_key=<YOUR_AWS_SECRET_ACCESS_KEY>

To deploy functions:

```bash
sls deploy
```

## Technologies

- [Serveless Framework](https://www.serverless.com/)
- [Localstack](https://localstack.cloud/)
