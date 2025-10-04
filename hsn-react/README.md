# HSN STORE replica with React(Vite)

## TODO's

- At first I found the idea of centralizing the form inputs into an useState a brilliant one, but I haven't found a way to modularize the components (inputs of 'Empresa' and 'Particular') without having duplicate properties in the useState object. So many duplicated lines of code...

- The second password input validates if that text matches the first password input, but all validations depend on the input having the onChange, so if the 1st password input changes and ends up matching both, the error message is still showing even if the validations are ok.
