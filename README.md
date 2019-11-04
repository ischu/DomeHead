# DomeHead
Domehead was our group name for our project. We were tasked with building an application that met the requirements listed here: https://richmond.bootcampcontent.com/Richmond-Boot-Camp/RICH201810FSF4/tree/master/16-project-2/02-Project-Requirements/Requirements Using the required concepts we decided to create Rad Libs. 
## About Rad Libs
We created a fun revamped version of Mad Libs. Users will be able to both create Mad Libs templates for others to play, or play stories created by others. If you're not familiar with Mad Libs it's a phrasal template word game where you submit words that meet a certain criteria without knowing what context it will be used in. You then can read back a story that includes the words you've submitted.

Play it here: https://dry-forest-45652.herokuapp.com/

## Technologies Used
- Materialize
- Pug
- MySQL
## Technical Concepts
We've created two databases one for storing stories and the other for storing authors as well as that author's login credentials. The two databases are linked using the author's id. The actual game functionality is inside of our write.js file where we utilized regex to search for words contained in brackets and create input fields in their place. The Create page includes validation for both logging in, signing up, and creating new stories
## Group
Our group consisted of Ian Schu, Joseph Fondaco, and Ryan Colosanti. Links to our Github profiles are provided below.

Ian Schu: https://github.com/ischu
Joseph Fondaco: https://github.com/Jfondaco
Ryan Colosanti: https://github.com/rjcolo28
