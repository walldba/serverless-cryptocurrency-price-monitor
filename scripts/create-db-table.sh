TABLE_NAME=cryptocurrency_prices
URL=http://localhost:4566

aws dynamodb create-table \
    --attribute-definitions \
        AttributeName=price,AttributeType=S \
        AttributeName=currency,AttributeType=S \
    --key-schema AttributeName=currency,KeyType=HASH AttributeName=price,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --table-name $TABLE_NAME \
    --endpoint-url $URL \
    &>> ./scripts/db_create.txt