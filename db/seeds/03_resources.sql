-- Javascript Category
INSERT INTO resources(creator_id, category_id, url, title, description, rating, thumbnail_url)
-- should have no image
VALUES(4, 1, 'https://auth.udacity.com/sign-up?next=https%3A%2F%2Flearn.udacity.com%2Fcourses%2Fud803%2Flessons%2Ff2c28aac-882f-4853-8f65-12bbc7aa3a52%2Fconcepts%2F477447d2-adb8-42f1-9620-1f63af838fe0', 'Udacity: Data Types & Variables', 'Interactive coding challenges for all levels, with instant feedback and progress tracking.', 3, '../../assets/no-image.png'),
(7, 1, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration', 'MDN: Loops and Iteration', 'Comprehensive coding tutorials covering languages, frameworks, and tools, with practical examples and exercises.', 5, '../../assets/resource-thumbs/javascript.jpg'),
(2, 1, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', 'MDN: Functions', 'Online coding bootcamp offering immersive, mentor-led programs in web development, data science, and more.', 2, '../../assets/resource-thumbs/books.jpg'),
-- should have no image
(6, 1, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', 'MDN: Arrays', 'Platform providing coding courses, projects, and assessments, with a focus on real-world applications and industry relevance.', 2, '../../assets/no-image.png'),
(3, 1, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects', 'MDN: Objects', 'Community-driven platform for coding enthusiasts, featuring tutorials, forums, and collaborative coding projects.', 4, '../../assets/resource-thumbs/working-hard.jpg'),
(8, 1, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator', 'Ternary Operators', 'Video-based coding tutorials covering a wide range of topics, from beginner to advanced levels.', 1, '../../assets/resource-thumbs/design.jpg'),
-- should have no image
(1, 1, 'https://dev.to/devsmitra/28-javascript-array-hacks-a-cheat-sheet-for-developer-5769', 'Array Hacks Cheat Sheet', 'Personalized coding learning paths tailored to individual goals and skill levels, with adaptive quizzes and assessments.', 5, '../../assets/no-image.png'),
(5, 1, 'https://logicmag.io', 'Logic Magazine', 'Coding challenges and competitions to sharpen skills and showcase talent, with opportunities for recognition and rewards.', 2, '../../assets/resource-thumbs/100-days.jpg'),
(2, 1, 'https://webdesign.tutsplus.com/top-15-best-practices-for-writing-super-readable-code--net-8118t', 'Coding Best Practices', 'Mobile app offering bite-sized coding lessons and challenges, designed for learning on the go.', 4, '../../assets/resource-thumbs/javascript.jpg'),
(7, 1, 'https://www.digitalocean.com/community/tutorials/for-loops-for-of-loops-and-for-in-loops-in-javascript', 'For Loops', 'Interactive coding playground for experimenting with code snippets, APIs, and libraries in a sandbox environment.', 1, '../../assets/resource-thumbs/javascript.jpg');

-- CSS Category
INSERT INTO resources(creator_id, category_id, url, title, description, rating, thumbnail_url)
VALUES(4, 2, 'https://coolors.co', 'Colour Palette Generator', 'Interactive coding challenges for all levels, with instant feedback and progress tracking.', 5, '../../assets/resource-thumbs/books.jpg'),
(7, 2, 'https://unsplash.com', 'Stock Image Resource', 'Comprehensive coding tutorials covering languages, frameworks, and tools, with practical examples and exercises.', 5, '../../assets/resource-thumbs/no-bad-days.jpg'),
(2, 2, 'https://www.toptal.com/designers/subtlepatterns', 'Design Patterns', 'Online coding bootcamp offering immersive, mentor-led programs in web development, data science, and more.', 3, '../../assets/resource-thumbs/comfort-zone.jpg'),
-- should have no image
(6, 2, 'https://cssgridgarden.com', 'CSS Grid Garden', 'Platform providing coding courses, projects, and assessments, with a focus on real-world applications and industry relevance.', 5, '../../assets/no-image.png'),
(3, 2, 'http://www.flexboxdefense.com', 'Flexbox Defense', 'Community-driven platform for coding enthusiasts, featuring tutorials, forums, and collaborative coding projects.', 4, '../../assets/resource-thumbs/working-hard.jpg'),
(8, 2, 'https://github.com/awesome-css-group/awesome-css#readme', 'Awesome CSS', 'Video-based coding tutorials covering a wide range of topics, from beginner to advanced levels.', 2, '../../assets/resource-thumbs/design.jpg'),
-- should have no image
(1, 2, 'https://developer.mozilla.org/en-US/docs/Web/CSS/animation', 'MDN: CSS Animations', 'Personalized coding learning paths tailored to individual goals and skill levels, with adaptive quizzes and assessments.', 5, '../../assets/no-image.png'),
(5, 2, 'https://web-design-weekly.com/viewport-units-vw-vh-vmin-vmax', 'Viewport Units', 'Coding challenges and competitions to sharpen skills and showcase talent, with opportunities for recognition and rewards.', 2, '../../assets/resource-thumbs/gitlab.jpg'),
(2, 2, 'https://css-tricks.com/making-css-animations-feel-natural', 'Natural CSS Animations', 'Mobile app offering bite-sized coding lessons and challenges, designed for learning on the go.', 4, '../../assets/resource-thumbs/design.jpg'),
(7, 2, 'https://web.dev/learn/design/ui-patterns', 'UI Patterns', 'Interactive coding playground for experimenting with code snippets, APIs, and libraries in a sandbox environment.', 1, '../../assets/resource-thumbs/books.jpg');

-- React Category
INSERT INTO resources(creator_id, category_id, url, title, description, rating, thumbnail_url)
VALUES(4, 3, 'https://legacy.reactjs.org/community/courses.html', 'Learn React', 'Interactive coding challenges for all levels, with instant feedback and progress tracking.', 5, '../../assets/resource-thumbs/react.jpg'),
(7, 3, 'https://www.udemy.com/course/react-the-complete-guide-incl-redux', 'Udemy Complete Guide to React', 'Comprehensive coding tutorials covering languages, frameworks, and tools, with practical examples and exercises.', 5, '../../assets/resource-thumbs/no-bad-days.jpg'),
(2, 3, 'https://www.codecademy.com/learn/react-101', 'Codecademy Learn React', 'Online coding bootcamp offering immersive, mentor-led programs in web development, data science, and more.', 3, '../../assets/resource-thumbs/comfort-zone.jpg'),
-- should have no image
(6, 3, 'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps', 'MDN: Progressive Web Apps', 'Platform providing coding courses, projects, and assessments, with a focus on real-world applications and industry relevance.', 5, '../../assets/no-image.png'),
(3, 3, 'https://www.taniarascia.com/crud-app-in-react-with-hooks', 'CRUD App with React', 'Community-driven platform for coding enthusiasts, featuring tutorials, forums, and collaborative coding projects.', 4, '../../assets/resource-thumbs/react.jpg'),
(8, 3, 'https://www.youtube.com/watch?v=T3NHNuD60h4', 'Contact Form Tutorial Video', 'Video-based coding tutorials covering a wide range of topics, from beginner to advanced levels.', 3, '../../assets/resource-thumbs/100-days.jpg'),
-- should have no image
(1, 3, 'https://www.codinn.dev', 'React Portfolio Projects', 'Personalized coding learning paths tailored to individual goals and skill levels, with adaptive quizzes and assessments.', 5, '../../assets/no-image.png'),
(5, 3, 'https://www.coursera.org/specializations/front-end-development-using-react-specialization?ref=browsee.io', 'Coursera: React on the Frontend', 'Coding challenges and competitions to sharpen skills and showcase talent, with opportunities for recognition and rewards.', 3, '../../assets/resource-thumbs/gitlab.jpg'),
(2, 3, 'https://www.classcentral.com/course/full-stack-react-18915?ref=browsee.io', 'Full Stack React', 'Mobile app offering bite-sized coding lessons and challenges, designed for learning on the go.', 4, '../../assets/resource-thumbs/react.jpg');


-- SQL Category
INSERT INTO resources(creator_id, category_id, url, title, description, rating, thumbnail_url)
VALUES(4, 4, 'https://www.postgresql.org', 'Postgres Docs', 'Interactive coding challenges for all levels, with instant feedback and progress tracking.', 5, '../../assets/resource-thumbs/no-bad-days.jpg'),
(7, 4, 'https://blog.codinghorror.com/a-visual-explanation-of-sql-joins', 'SQL Joins', 'Comprehensive coding tutorials covering languages, frameworks, and tools, with practical examples and exercises.', 5, '../../assets/resource-thumbs/gitlab.jpg'),
(2, 4, 'https://en.wikipedia.org/wiki/Database_design', 'Wikipedia: Databse Design', 'Online coding bootcamp offering immersive, mentor-led programs in web development, data science, and more.', 4, '../../assets/resource-thumbs/javascript.jpg'),
-- should have no image
(6, 4, 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-data-types', 'PostgreSQL Data types', 'Platform providing coding courses, projects, and assessments, with a focus on real-world applications and industry relevance.', 5, '../../assets/no-image.png'),
(3, 4, 'https://www.tutorialspoint.com/sql/sql-insert-query.htm', 'SQL Insert Into', 'Community-driven platform for coding enthusiasts, featuring tutorials, forums, and collaborative coding projects.', 4, '../../assets/resource-thumbs/working-hard.jpg'),
(8, 4, 'https://node-postgres.com', 'Welcome to Node Postgres', 'Video-based coding tutorials covering a wide range of topics, from beginner to advanced levels.', 4, '../../assets/resource-thumbs/100-days.jpg'),
-- should have no image
(1, 4, 'https://www.khanacademy.org/computing/computer-programming/sql/more-advanced-sql-queries/pc/challenge-karaoke-song-selector', 'Karaoke Song Selector Tutorial', 'Personalized coding learning paths tailored to individual goals and skill levels, with adaptive quizzes and assessments.', 5, '../../assets/no-image.png');

-- Express Category
INSERT INTO resources(creator_id, category_id, url, title, description, rating, thumbnail_url)
VALUES(7, 5, 'https://www.guru99.com/node-js-create-server-get-data.html', 'Web Servers', 'Comprehensive coding tutorials covering languages, frameworks, and tools, with practical examples and exercises.', 5, '../../assets/resource-thumbs/javascript.jpg'),
(2, 5, 'https://www.guru99.com/node-js-express.html', 'Node.js Express', 'Online coding bootcamp offering immersive, mentor-led programs in web development, data science, and more.', 4, '../../assets/resource-thumbs/javascript.jpg'),
-- should have no image
(6, 5, 'https://en.wikipedia.org/wiki/Express.js#History', 'History of Express.js', 'Platform providing coding courses, projects, and assessments, with a focus on real-world applications and industry relevance.', 5, '../../assets/no-image.png'),
(3, 5, 'https://expressjs.com', 'Express.js Docs', 'Community-driven platform for coding enthusiasts, featuring tutorials, forums, and collaborative coding projects.', 5, '../../assets/resource-thumbs/working-hard.jpg'),
(8, 5, 'https://en.wikipedia.org/wiki/Create,_read,_update_and_delete', 'Wikipedia: CRUD', 'Video-based coding tutorials covering a wide range of topics, from beginner to advanced levels.', 4, '../../assets/resource-thumbs/100-days.jpg'),
-- should have no image
(1, 5, 'https://github.com/expressjs/method-override', 'Express.js Method Override', 'Personalized coding learning paths tailored to individual goals and skill levels, with adaptive quizzes and assessments.', 5, '../../assets/no-image.png');

-- Ruby Category
INSERT INTO resources(creator_id, category_id, url, title, description, rating, thumbnail_url)
-- should have no image
VALUES(4, 6, 'https://www.ruby-lang.org/en', 'Ruby Homepage', 'Interactive coding challenges for all levels, with instant feedback and progress tracking.', 3, '../../assets/no-image.png'),
(7, 6, 'https://www.codecademy.com/learn/learn-ruby', 'Codecademy: Learn Ruby', 'Comprehensive coding tutorials covering languages, frameworks, and tools, with practical examples and exercises.', 5, '../../assets/resource-thumbs/gitlab.jpg'),
(2, 6, 'https://www.railstutorial.org', 'Rails Tutorial', 'Online coding bootcamp offering immersive, mentor-led programs in web development, data science, and more.', 2, '../../assets/resource-thumbs/comfort-zone.jpg'),
-- should have no image
(6, 6, 'https://try.ruby-lang.org', 'Try Ruby', 'Platform providing coding courses, projects, and assessments, with a focus on real-world applications and industry relevance.', 2, '../../assets/no-image.png'),
(3, 6, 'https://www.rubykoans.com', 'Ruby Koans', 'Community-driven platform for coding enthusiasts, featuring tutorials, forums, and collaborative coding projects.', 4, '../../assets/resource-thumbs/working-hard.jpg'),
(8, 6, 'https://www.pluralsight.com/courses/code-school-rails-for-zombies', 'Rails for Zombies', 'Video-based coding tutorials covering a wide range of topics, from beginner to advanced levels.', 1, '../../assets/resource-thumbs/design.jpg'),
-- should have no image
(1, 6, 'https://rubygarage.org/blog/how-to-learn-ruby-on-rails', 'How to Learn Ruby on Rails', 'Personalized coding learning paths tailored to individual goals and skill levels, with adaptive quizzes and assessments.', 5, '../../assets/no-image.png'),
(5, 6, 'https://github.com/fpsvogel/learn-ruby', 'Github: Learn Ruby', 'Coding challenges and competitions to sharpen skills and showcase talent, with opportunities for recognition and rewards.', 2, '../../assets/resource-thumbs/100-days.jpg');
