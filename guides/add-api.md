## adding AWS API

```
amplify add api
```

- Choose GraphQL
- Proive Api Name: memorygameapi
- Authorization type: Cognito user pool
  - Choose default configuration for authentication
- Do you have an annotated GraphQL Schema? : No
- Do you want a guided schema creation? : Yes
  - Choose One To Many relationship
- Do you want to edit the schema? :Yes
  ⚠️ WARNING: your GraphQL API currently allows public create, read, update, and delete access to all models via an API Key. To configure PRODUCTION-READY authorization rules, review: https://docs.amplify.aws/cli/graphql/authorization-rules

  https://www.linkedin.com/pulse/aws-amplify-adding-user-group-programmatically-guillermo-misa-iii/
