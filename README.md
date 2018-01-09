# project-cli
Generating a project with a command line

## Support
- A: landing page
- B: activity / project
- C: Creating new pages based on an existing template

## Version
`1.1` support type B  
`1.2` support type C    

## Usage
```
var build = require("./createProject/index.js");

build.init()
```

## Api
```
build.init({
    pathroot: './'
})
```

## Use
- step1
    + Enter `node index.js` on the command line
- step2
    + Enter your project name 
- step3
    + Chose project structor according to Tips
- step4
    + Enter your project && use `npm install` to install dependence
    + RUN 

## imagine
1. Generating projects based on the complexity of the project
2. Select the build tool to create a project  
    Only use `gulp`  
    Only use `webpack`  
    Use `gulp` and `webpack`  
    static
3. Enter the markdown format to generate the page  
    For Example: The activity rule page, which only needs to enter the copywriting and the title, automatically replaces the content, and generates a new page




