# Food For Thought Project

To deploy run 'serverless deploy'

## Architecture Diagram:
https://app.cloudcraft.co/view/511050e4-1c7c-4483-9264-b069c26a6633?key=nQzfnBLpHCw9UyjpG5Mh0A


## Steps Taken
Used serverless CLI to create an aws-node template\
Provisioned an S3 bucket and DynamoDB using serverless\
Created an S3 trigger that runs a lambda function whenever anything is added to the bucket\
Created an SNS destination to get an email alert when a file is uploaded to the bucket\
If the file added is called 'generic-food.csv' then it writes the contents to the database\
This project has been created with the idea of being easily replicable\
The next steps would be to create an AppSync API to interrogate the database
