# gulp-setup-with-translations

### Installation
Make sure you have node, npm, gulp, and bower installed globally. Then, run the following commands in the root directory:
`npm install` and `bower install`

### Running Locally
In the root directory, run:
`gulp --watch`
This will start the server on port 4000 and watch html, css, and js files for changes.

##### File Structure
root  
├── dist - final files get built into here  
├── gulp - gulp tasks  
├── src - editable files  
|     ├── fonts  
|     ├── images  
|     ├── locales - json files for all the language translations  
|     ├── markup - all HTML files (note: translations are referenced with !{}! )  
|     ├── scripts - all JS files (get concatenated)  
|     └── styles - all sass files  
└── .public - files for dev server get build into here (not checked in)  

### Building files for production
run `gulp --build` in the root directory
