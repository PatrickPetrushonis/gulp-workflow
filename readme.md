# Gulp Workflow

* * * 

## Index

* Description
* Instructions
* Applications
* Modules
* Commands
* Installation

* * *

## Description

This is a template repository for setting up a Gulp workflow.
Structure, layout and mixins are found in the Bourbon Suite: 
    Bourbon, Neat, Bitters, and Refills.
HTML and CSS are preprocessed using Jade.js and SASS, respectively.
CoffeeScript compiles to JavaScript for reduced syntax redundancy. 

* * *

## Instructions

1. Download repository to accessible directory.
2. Download applications.
    * Git
    * Node
    * Ruby
3. Execute commands to install NPM dependencies and Gems.
    * CoffeeScript
    * Jade
    * Gulp
    * Bourbon Suite
4. Execute Gulp command to run all or single specified process.

* * *

## Applications

### [Git](http://git-scm.com/)
* Version control for branching or centralized workflow.
* Download git installer:
    * [Windows](http://www.git-scm.com/download/win)
    * [Mac](http://www.git-scm.com/download/mac)
    * [Linux](http://www.git-scm.com/download/linux)

### [Node](http://nodejs.org/)
* Cross-platform runtime environment for scalable, network applications.
* Download node.js [installer](https://nodejs.org/download/)
    * Chose operating system and bit version.
        * If unsure, choose 32-bit installer.
    * NPM is included with Node installation.

### [Ruby](https://www.ruby-lang.org)      
* Ruby language execution environment
* Download latest [Ruby installer](http://rubyinstaller.org/downloads/)
    * [Sass](http://sass-lang.com/) is included with Ruby installation.
* Download [RubyGems](https://rubygems.org/pages/download)

* * *

## Modules

### [CoffeeScript](http://coffeescript.org/)
* Minimal language that compiles pre-runtime to JavaScript
* Dependencies: Node

### [Jade](http://jade-lang.com/)
* Preprocessor/template engine for HTML 
* Dependencies: Node

### [Gulp](http://gulpjs.com/)           
* Build management system for file handling.
* Dependencies: Node

### Bourbon Suite

#### [Bourbon](http://bourbon.io/)         
* Simple and lightweight mixin library for Sass
* Dependencies: Ruby, Sass

#### [Neat](http://neat.bourbon.io/)          
* Lightweight semantic grid framework for Sass and Bourbon
* Dependencies: Ruby, Sass, Bourbon

#### [Bitters](http://bitters.bourbon.io/)    
* Scaffold styles, variables and structure for Bourbon projects
* Dependencies: Ruby, Sass, Bourbon

#### [Refills](http://refills.bourbon.io/)   
* Components and patterns built with Bourbon and Neat
* Dependencies: Ruby, Sass, Bourbon, Neat

* * *

## Commands

### NPM

    $ npm install <package>             Install specified NPM package.
    $     uninstall <package>           Remove specified package.
    $     search <package>              Search GitHub for new NPM package.
    $     --save-dev                    Save to devDependancies.json; for development-related scripts.
    $     --save                        Save to dependancies.json; for production use.
    $     --global (-g)                 Install in <path to npm>/npm/node_modules; for use in shell.

### Gulp

    $ gulp                              Run scripts and begin watching.
    $ gulp watch                        Watch specified scripts without initial run.
    $ gulp scripts                      Only process JS files.
    $ gulp styles                       Only process Sass files to CSS.
    $ gulp images                       Optimize image files.
    $ gulp jade                         Converts 
    $ gulp doc                          Create documentation for Sass code.
    $ gulp uncss                        Remove any CSS not being used.
    $ ^C                                End current watch/process

* * *

## Installation

### CoffeeScript

    $ npm install -g coffee-script              Current Stable Version
    $                jashkenas/coffeescript     Latest Master Version

### Jade

    $ npm install jade -g                       Global Jade installation
    $ 

### Gulp Modules

    $ npm install gulp -g                       Global Gulp installation
    $             gulp                          Streaming build system.
    $             gulp-autoprefix               Supplies prefixes for cross-browser compatibility.
    $             gulp-coffee                   Coffeescript plugin.
    $             gulp-concat                   Concatenates JavaScript files into a single file.
    $             gulp-filter                   Filter files in vinyl stream.
    $             gulp-imagemin                 Minifies gif, jpeg, png, and svg images,
    $             gulp-jade                     Jade plugin.
    $             gulp-jshint                   Lints JavaScript, analyzing code for potential errors.
    $             gulp-livereload               Reloads in browser upon detecting changes; requires Chrome extension.
    $             gulp-minify-css               CSS optimizer built upon clean-css.
    $             gulp-notify                   Sends messages based on vinyl files or errors.
    $             gulp-plumber                  Prevents pipe breaking on error.
    $             gulp-rename                   Provides file renaming methods.
    $             gulp-sass                     SASS plugin.
    $             gulp-sourcemaps               Generates sourcemaps for imported sass files.
    $             gulp-uncss                    Removes unused CSS.
    $             gulp-uglify                   Minifies JavaScript to improve efficiency.
    $             gulp-util                     Utility functions for vinyl stream.
    $             del                           Cleans specified directory of files and folders.
    $             imagemin-pngquant             Imagemin dependancy.

    Appended modules for easy installation: 

    $ gulp gulp-autoprefix gulp-coffee gulp-concat gulp-filter gulp-imagemin gulp-jade gulp-jshint gulp-livereload gulp-minify-css gulp-notify gulp-plumber gulp-rename gulp-sass gulp-sourcemaps gulp-uncss gulp-uglify gulp-util del imagemin-pngquant

* Helpful Tip: Modules can be appended for mass installation
    * Commands can also be copied and pasted via the right-click menu.
* Chrome Extension: [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

### Bourbon Suite

    $ gem install bourbon
    $ gem install neat
    $ gem install bitters
    $ gem install refills

#### In SASS directory (folder for current project's stylesheets):
    
    $ bourbon install
    $ neat install
    $ bitters install
