## BlogAPI built with GraphQL

Build the basic BlogAPI with graphQL.

-   How to make authorization in graphQL ?
    -   go to graphQL playground & find HTTP HEADER at the bottom
    -   Make the value pair like this :
    ```json
    {
        "Authorization": "Bearer {$token you generate from}"
    }
    ```
    -   How to generate token by `prisma token`
