DYNAMODB_PRICES_TABLE=cryptocurrency_prices
DYNAMODB_OSCILLATIONS_TABLE=cryptocurrency_oscillations
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
    --table-name $DYNAMODB_PRICES_TABLE \
    --endpoint-url $URL \
    &>> ./scripts/db_prices_create.txt

aws dynamodb create-table \
    --attribute-definitions \
        AttributeName=currency,AttributeType=S \
        AttributeName=oscillation,AttributeType=S \
        AttributeName=createdAt,AttributeType=S \
    --key-schema AttributeName=currency,KeyType=HASH AttributeName=createdAt,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"OscillationIndex\", 
                \"KeySchema\": [{\"AttributeName\":\"currency\",\"KeyType\":\"HASH\"},
                                {\"AttributeName\":\"oscillation\",\"KeyType\":\"RANGE\"}],
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
    --table-name $DYNAMODB_OSCILLATIONS_TABLE \
    --endpoint-url $URL \
    &>> ./scripts/db_oscillations_create.txt