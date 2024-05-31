get /user
post /user
put /user/:id
patch /user/:id
delete /user/:id

# We can particular result by writing in url

## Req body

JSON - application/json
Multipart - multipart/form-data; boundary={boundary string}

# File uploading

The server listens for incoming requests on port 3000.
When a POST request is made to /upload, the server parses the form data using the multiparty library.
Uploaded files are saved to a local uploads directory.
After successfully processing the upload, a JSON response is sent back to the client indicating success.
