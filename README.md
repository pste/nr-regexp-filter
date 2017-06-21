# nr-regexp-filter
A node that filters messages using the given property name and regular expression.  
The property name is deep-searched, so you can use something like "payload.my.prop" to test over "prop".

When the regexp matches the whole message will be returned, otherwise the whole message will be **dropped**.

Example: *\.(json|xml)$* matches everything that ends with .json and .xml

# install
Go to <HOME>/.node-red and launch

`npm install nr-regexp-filter`

It will creates a *node_modules* folder with the needed package. Restart the server to load the new palette.
