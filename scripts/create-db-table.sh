TABLE_NAME=cryptocurrency_prices
URL=http://localhost:4566

aws dynamodb create-table \
    --attribute-definitions \
        AttributeName=currency,AttributeType=S \
        AttributeName=price,AttributeType=S \
        AttributeName=createdAt,AttributeType=S \
    --key-schema AttributeName=currency,KeyType=HASH AttributeName=createdAt,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"PriceIndex\", 
                \"KeySchema\": [{\"AttributeName\":\"currency\",\"KeyType\":\"HASH\"},
                                {\"AttributeName\":\"price\",\"KeyType\":\"RANGE\"}],
                \"Projection\":{
                    \"ProjectionType\":\"INCLUDE\",
                    \"NonKeyAttributes\":[\"createdAt\"]
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 1,
                    \"WriteCapacityUnits\": 1
                }
            }
        ]" \
    --table-name $TABLE_NAME \
    --endpoint-url $URL \
    &>> ./scripts/db_create.txt