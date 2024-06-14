require('dotenv').config();
const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const bcrypt = require('bcryptjs');
const cardModule = require('../models/Card')
const Card = cardModule.model
const Deck = require('../models/Deck')
const User = require('../models/User');
const Favorite = require('../models/Favorite')

// Create four users
const users = [];

const newUser = new User({
  username: 'demo-user',
  email: 'demo-user@appacademy.io',
  hashedPassword: bcrypt.hashSync('starwars', 10)
})

users.push(newUser);


const scienceUser = new User({
  username: 'science-guy',
  email: 'bill-nye@appacademy.io',
  hashedPassword: bcrypt.hashSync('password', 10)
})

users.push(scienceUser);


const languageUser = new User({
  username: 'world-traveller',
  email: 'traveller@appacademy.io',
  hashedPassword: bcrypt.hashSync('password', 10)
})

users.push(languageUser);

const techUser = new User({
  username: 'tech-guru',
  email: 'tech-guru@appacademy.io',
  hashedPassword: bcrypt.hashSync('password', 10)
});
users.push(techUser);

const historyBuff = new User({
  username: 'history-buff',
  email: 'history-buff@appacademy.io',
  hashedPassword: bcrypt.hashSync('password', 10)
});
users.push(historyBuff);


const humanitiesGuy = new User({
  username: 'humanities-guy',
  email: 'humanities-guy@appacademy.io',
  hashedPassword: bcrypt.hashSync('password', 10)
});
users.push(humanitiesGuy);

//create Decks and Cards

const decks = [];
const cards = [];

const createDeckWithCards = async (user, deckName, category, terms, genieCreated) => {
  const deck =  new Deck({
    name: deckName,
    category,
    author: user.id,
    genieCreated,
    authorName: user.username
  });

  for (const term of terms) {
    const card = new Card({
      title: term.title,
      body: term.body,
      author: user.id,
      category
    });
    deck.cards.push(card);
    cards.push(card);
  }

  decks.push(deck);
};

// Terms for the decks
const microeconomicsTerms = [
  { title: 'Demand', body: 'Quantity purchased in a market at different prices' },
  { title: 'PED', body: 'Percentage change in quantity demanded over percentage change in prices.' },
  { title: 'PPF', body: 'Production possibilities frontier - shows all combinations of two goods an economy is capable of producing, given scarce available resources.' },
  { title: 'MPC', body: 'Marginal propensity to consume - percentage change in quantity consumed over percentage change in income' },
  { title: 'Supply', body: 'Quantity of a good or service that producers are willing to sell at different prices.' },
  { title: 'Opportunity Cost', body: 'The loss of potential gain from other alternatives when one alternative is chosen.' },
  { title: 'Monopoly', body: 'A market structure characterized by a single seller, selling a unique product in the market.' },
  { title: 'Elasticity', body: 'Measure of a variable\'s sensitivity to a change in another variable.' },
  ];

const macroeconomicsTerms= [
  { title: 'Fiscal Policy', body: 'Government adjustments to its spending levels and tax rates to monitor and influence a nation\'s economy.' },
  { title: 'Monetary Policy', body: 'The process by which the monetary authority of a country controls the supply of money.' },
  { title: 'GDP', body: 'Gross Domestic Product - the total value of goods produced and services provided in a country during one year.' },
  { title: 'Inflation', body: 'The sustained increase in price levels' },
  { title: 'CPI', body: 'Consumer Price Index - tracks a basket of goods and reflects a percentage change in a weighted average of the cost of goods in the basket' },
  { title: 'Aggregate Demand', body: 'Total output demanded in an economy at different price levels.  C + I + G + (Ex - Im)' },
  { title: 'Investment', body: 'Part of Aggregate Demand. Includes purchase of physical capital by business, purchase of new homes by households, and changes to inventory' }
]

const marketingTerms = [
  { title: 'Branding', body: 'The process of creating a unique name and image for a product in the consumer\'s mind, mainly through advertising campaigns.' },
  { title: 'Market Segmentation', body: 'The practice of dividing a market into distinct groups of buyers who have different needs, characteristics, or behaviors.' },
  { title: 'Target Market', body: 'A particular group of consumers at which a product or service is aimed.' },
  { title: 'Consumer Behavior', body: 'The study of how individual customers, groups, or organizations select, buy, use, and dispose of ideas, goods, and services.' },
  { title: 'SWOT Analysis', body: 'A strategic planning technique used to identify strengths, weaknesses, opportunities, and threats related to business competition or project planning.' },
  { title: 'Product Lifecycle', body: 'The cycle through which every product goes through from introduction to withdrawal or eventual demise.' },
  { title: 'Positioning', body: 'The process of establishing the image or identity of a brand or product so that consumers perceive it in a certain way.' },
  { title: 'Value Proposition', body: 'A statement that explains how a product solves a pain point, delivers specific benefits, and tells the ideal customer why they should buy it.' },
  { title: 'Marketing Mix', body: 'A set of actions or tactics that a company uses to promote its brand or product in the market, often summarized as the 4 Ps: Product, Price, Place, and Promotion.' },
  { title: 'Customer Relationship Management (CRM)', body: 'A technology for managing all your company\'s relationships and interactions with customers and potential customers.' },
  { title: 'Lead Generation', body: 'The process of attracting and converting strangers and prospects into someone who has indicated interest in your company\'s product or service.' },
  { title: 'Conversion Rate', body: 'The percentage of visitors to a website or marketing campaign who take a desired action.' },
  { title: 'SEO (Search Engine Optimization)', body: 'The process of optimizing web pages and their content to be easily discoverable by users searching for terms relevant to your website.' },
  { title: 'Content Marketing', body: 'A type of marketing that involves the creation and sharing of online material (such as videos, blogs, and social media posts) that does not explicitly promote a brand but is intended to stimulate interest in its products or services.' },
  { title: 'Pay-Per-Click (PPC)', body: 'An internet advertising model used to drive traffic to websites, in which an advertiser pays a publisher when the ad is clicked.' },
  { title: 'Social Media Marketing', body: 'The use of social media platforms and websites to promote a product or service.' },
  { title: 'Email Marketing', body: 'The act of sending a commercial message, typically to a group of people, using email.' },
  { title: 'Influencer Marketing', body: 'A type of social media marketing that involves endorsements and product placement from influencers, people and organizations who have a purported expert level of knowledge or social influence in their field.' },
  { title: 'Public Relations (PR)', body: 'The practice of managing the spread of information between an individual or an organization and the public.' },
  { title: 'Brand Equity', body: 'The value and strength of the brand that determines its worth.' }
];

const accountingTerms = [
  { title: 'Assets', body: 'Resources owned by a business that have economic value and can provide future benefits.' },
  { title: 'Liabilities', body: 'Obligations or debts that a company owes to outside parties.' },
  { title: 'Equity', body: 'The residual interest in the assets of the entity after deducting liabilities, also known as owner\'s equity or shareholder\'s equity.' },
  { title: 'Revenue', body: 'Income generated from normal business operations and includes discounts and deductions for returned merchandise.' },
  { title: 'Expenses', body: 'The costs incurred by a business in the process of earning revenue.' },
  { title: 'Balance Sheet', body: 'A financial statement that summarizes a company\'s assets, liabilities, and shareholders\' equity at a specific point in time.' },
  { title: 'Income Statement', body: 'A financial statement that shows a company\'s financial performance over a specific accounting period, detailing revenue, expenses, and profits or losses.' },
  { title: 'Cash Flow Statement', body: 'A financial statement that provides aggregate data regarding all cash inflows and outflows a company receives.' },
  { title: 'General Ledger', body: 'A complete record of all financial transactions over the life of a company.' },
  { title: 'Accounts Receivable', body: 'Money owed to a company by its debtors.' },
  { title: 'Accounts Payable', body: 'Money a company owes to its suppliers.' },
  { title: 'Depreciation', body: 'The allocation of the cost of a tangible asset over its useful life.' },
  { title: 'Accrual Accounting', body: 'An accounting method where revenue and expenses are recorded when they are earned or incurred, regardless of when the cash is actually received or paid.' },
  { title: 'Amortization', body: 'The process of gradually writing off the initial cost of an intangible asset over a period.' },
  { title: 'Budgeting', body: 'The process of creating a plan to spend your money, allocating future income towards expenses, savings, and debt repayment.' },
  { title: 'Double-Entry Accounting', body: 'A system of bookkeeping where every entry to an account requires a corresponding and opposite entry to a different account.' },
  { title: 'Fixed Assets', body: 'Long-term tangible assets that are used in the operations of a business and are not expected to be consumed or converted into cash quickly.' },
  { title: 'Trial Balance', body: 'A bookkeeping worksheet in which the balances of all ledgers are compiled into debit and credit account column totals that are equal.' },
  { title: 'Working Capital', body: 'The difference between a company\'s current assets and current liabilities.' },
  { title: 'Net Income', body: 'A company\'s total earnings, also called net profit, calculated as revenue minus expenses, taxes, and costs.' },
  { title: 'Cost of Goods Sold (COGS)', body: 'The direct costs attributable to the production of the goods sold by a company.' },
  { title: 'Gross Profit', body: 'Revenue minus the cost of goods sold.' },
  { title: 'Financial Statements', body: 'Records that provide an overview of a company\'s financial condition in both short and long term.' },
  { title: 'Liquidity', body: 'The availability of liquid assets to a company and the ease with which it can meet its financial obligations.' },
  { title: 'Retained Earnings', body: 'The cumulative amount of earnings not distributed to shareholders and reinvested in the business.' }
];



const physicsTerms = [
  { title: 'Acceleration', body: 'The rate at which velocity changes' },
  { title: 'Archimedes Principle', body: 'The rule that the buoyant force on an object is equal to the weight of the fluid the object displaces' },
  { title: 'Chemical Energy', body: 'The potential energy stored in chemical bonds' },
  { title: 'Joule', body: 'Unit used to measure electrical energy' },
  { title: 'Newton', body: 'Unit of force in the International System of Units (SI)' },
  { title: 'Velocity', body: 'The speed of something in a given direction' },
  { title: 'Force', body: 'An interaction that, when unopposed, will change the motion of an object' },
  { title: 'Kinetic Energy', body: 'The energy an object possesses due to its motion' },
  { title: 'Potential Energy', body: 'The energy held by an object because of its position relative to other objects' },
  { title: 'Thermodynamics', body: 'The branch of physics that deals with the relationships between heat and other forms of energy' },
  { title: 'Entropy', body: 'A measure of the disorder or randomness in a system' },
  { title: 'Quantum Mechanics', body: 'The branch of mechanics that deals with the mathematical description of the motion and interaction of subatomic particles' },
  { title: 'Relativity', body: 'The dependence of various physical phenomena on relative motion of the observer and the observed objects, especially regarding the nature and behavior of light, space, time, and gravity' },
  { title: 'Gravitational Force', body: 'An attractive force that acts between any two masses' }
];

const biologyTerms = [
  { title: 'Hymenoptera', body: 'An order of insects including bees, wasps, and ants' },
  { title: 'Prokaryotic Cell', body: 'Primitive cells that lack membrane-bound internal organelles' },
  { title: 'Autotrophic Nutrition', body: 'Type of nutrition where the source of carbon is simple, such as carbon dioxide' },
  { title: 'Isotopes', body: 'Elements that have the same number of protons and behave the same in chemical reactions, but they have a different number of neutrons' },
  { title: 'Mitosis', body: 'A type of cell division that results in two daughter cells each having the same number and kind of chromosomes as the parent nucleus' },
  { title: 'Meiosis', body: 'A type of cell division that reduces the chromosome number by half, creating four haploid cells' },
  { title: 'Photosynthesis', body: 'The process by which green plants and some other organisms use sunlight to synthesize foods with the aid of chlorophyll' },
  { title: 'Respiration', body: 'A process in living organisms involving the production of energy, typically with the intake of oxygen and the release of carbon dioxide' },
  { title: 'DNA', body: 'Deoxyribonucleic acid, the carrier of genetic information' },
  { title: 'RNA', body: 'Ribonucleic acid, a nucleic acid present in all living cells' },
  { title: 'Evolution', body: 'The process by which different kinds of living organisms are thought to have developed and diversified from earlier forms during the history of the earth' },
  { title: 'Natural Selection', body: 'The process whereby organisms better adapted to their environment tend to survive and produce more offspring' },
  { title: 'Gene', body: 'A unit of heredity that is transferred from a parent to offspring and is held to determine some characteristic of the offspring' },
  { title: 'Chromosome', body: 'A thread-like structure of nucleic acids and protein found in the nucleus of most living cells, carrying genetic information in the form of genes' },
  { title: 'Protein', body: 'A molecule composed of amino acids that performs a vast array of functions within organisms' }
];

const chemistryTerms = [
  { title: 'Specific Gravity', body: 'The ratio of the density of a given liquid to the density of water at 4 degrees Celsius' },
  { title: 'Elements', body: 'Substances that cannot be broken down into simpler substances by chemical reactions.' },
  { title: 'Distillation', body: 'The method for separating the components of a liquid mixture that depends on differences in the ease of vaporization of the components' },
  { title: 'Anion', body: 'Ions that have a negative charge. Form when an atom gains electrons.' },
  { title: 'Cation', body: 'Ions that have a positive charge. Form when an atom loses electrons.' },
  { title: 'Molecule', body: 'A group of atoms bonded together, representing the smallest fundamental unit of a chemical compound that can take part in a chemical reaction.' },
  { title: 'Atomic Number', body: 'The number of protons in the nucleus of an atom, which determines the chemical properties of an element and its place in the periodic table.' },
  { title: 'Molarity', body: 'A concentration unit, defined to be the number of moles of solute divided by the number of liters of solution.' },
  { title: 'Avogadro\'s Number', body: 'The number of constituent particles, usually atoms or molecules, that are contained in one mole, which is 6.02214076 × 10^23' },
  { title: 'Valence Electrons', body: 'The electrons in the outer shell of an atom that are involved in forming bonds.' },
  { title: 'Electronegativity', body: 'A measure of the tendency of an atom to attract a bonding pair of electrons.' },
  { title: 'pH', body: 'A scale used to specify the acidity or basicity of an aqueous solution.' },
  { title: 'Buffer', body: 'A solution that resists changes in pH when acid or alkali is added to it.' },
  { title: 'Catalyst', body: 'A substance that increases the rate of a chemical reaction without itself undergoing any permanent chemical change.' },
  { title: 'Endothermic Reaction', body: 'A chemical reaction that absorbs heat from its surroundings.' }
];

const languageTerms = [
  { title: 'Hola', body: 'Spanish for "Hello"' },
  { title: 'Bonjour', body: 'French for "Good morning" or "Hello"' },
  { title: 'Guten Tag', body: 'German for "Good day" or "Hello"' },
  { title: 'こんにちは', body: 'Japanese for "Hello"' },
  { title: 'Ciao', body: 'Italian for "Hello" or "Goodbye"' },
  { title: 'Olá', body: 'Portuguese for "Hello"' },
  { title: 'Gracias', body: 'Spanish for "Thank you"' },
  { title: 'Merci', body: 'French for "Thank you"' },
  { title: 'Danke', body: 'German for "Thank you"' },
  { title: 'ありがとう', body: 'Japanese for "Thank you"' },
  { title: 'Grazie', body: 'Italian for "Thank you"' },
  { title: 'Obrigado', body: 'Portuguese for "Thank you"' },
  { title: 'Adiós', body: 'Spanish for "Goodbye"' },
  { title: 'Au revoir', body: 'French for "Goodbye"' },
  { title: 'Auf Wiedersehen', body: 'German for "Goodbye"' },
  { title: 'さようなら', body: 'Japanese for "Goodbye"' },
  { title: 'Arrivederci', body: 'Italian for "Goodbye"' },
  { title: 'Tchau', body: 'Portuguese for "Goodbye"' },
  { title: 'Sí', body: 'Spanish for "Yes"' },
  { title: 'Oui', body: 'French for "Yes"' },
  { title: 'Ja', body: 'German for "Yes"' },
  { title: 'はい', body: 'Japanese for "Yes"' },
  { title: 'Sì', body: 'Italian for "Yes"' },
  { title: 'Sim', body: 'Portuguese for "Yes"' },
  { title: 'No', body: 'Spanish for "No"' },
  { title: 'Non', body: 'French for "No"' },
  { title: 'Nein', body: 'German for "No"' },
  { title: 'いいえ', body: 'Japanese for "No"' },
  { title: 'No', body: 'Italian for "No"' },
  { title: 'Não', body: 'Portuguese for "No"' }
];

const javascriptTerms = [
  { title: 'Variable', body: 'A storage location in programming with a symbolic name.' },
  { title: 'Function', body: 'A block of code designed to perform a particular task.' },
  { title: 'Array', body: 'An ordered list of values.' },
  { title: 'Object', body: 'A collection of properties, and a property is an association between a name (or key) and a value.' },
  { title: 'Closure', body: 'A function having access to the parent scope, even after the parent function has closed.' },
  { title: 'Promise', body: 'An object representing the eventual completion or failure of an asynchronous operation.' },
  { title: 'Async/Await', body: 'Syntax for writing asynchronous code in a synchronous manner.' },
  { title: 'Callback', body: 'A function passed into another function as an argument, which is then invoked inside the outer function.' },
  { title: 'Event Loop', body: 'A programming construct that waits for and dispatches events or messages in a program.' },
  { title: 'Prototype', body: 'An object from which other objects inherit properties.' },
  { title: 'Hoisting', body: 'JavaScript\'s behavior of moving declarations to the top of a scope before code execution.' },
  { title: 'Scope', body: 'The current context of execution in which values and expressions are visible or can be referenced.' },
  { title: 'This', body: 'A reference to the object from which the function was called.' },
  { title: 'Arrow Function', body: 'A shorthand syntax for writing function expressions.' },
  { title: 'Rest Parameters', body: 'Allows a function to accept an indefinite number of arguments as an array.' }
];

const htmlCssTerms = [
  { title: 'HTML', body: 'The standard markup language for creating web pages.' },
  { title: 'CSS', body: 'A stylesheet language used for describing the presentation of a document written in HTML or XML.' },
  { title: 'Flexbox', body: 'A CSS layout module designed to provide a more efficient way to lay out, align, and distribute space among items in a container.' },
  { title: 'Grid', body: 'A CSS layout system for creating complex web layouts.' },
  { title: 'Selectors', body: 'Patterns used to select the elements you want to style.' },
  { title: 'Box Model', body: 'A CSS concept that describes the rectangular boxes generated for elements in the document tree and the layout structure.' },
  { title: 'Media Query', body: 'A CSS technique introduced in CSS3 to apply styles depending on the result of one or more media queries.' },
  { title: 'Positioning', body: 'The CSS properties used to determine the position of an element in a document.' },
  { title: 'Pseudo-Classes', body: 'Keywords added to selectors that specify a special state of the selected elements.' },
  { title: 'Transitions', body: 'CSS properties that allow you to change property values smoothly (over a given duration).' },
  { title: 'Animations', body: 'A CSS module that allows the animation of HTML elements without using JavaScript or Flash.' },
  { title: 'Responsive Design', body: 'An approach to web design that makes web pages render well on a variety of devices and window or screen sizes.' },
  { title: 'Semantic HTML', body: 'Using HTML markup to reinforce the semantics, or meaning, of the content in webpages and web applications.' },
  { title: 'Flexbox Container', body: 'The parent element in a flexbox layout.' },
  { title: 'Flexbox Item', body: 'The children of a flexbox container.' }
];

const reactTerms = [
  { title: 'Component', body: 'A reusable piece of code that returns a React element to be rendered to the page.' },
  { title: 'State', body: 'A built-in object used to contain data or information about the component.' },
  { title: 'Props', body: 'Arguments passed into React components.' },
  { title: 'JSX', body: 'A syntax extension that allows mixing HTML with JavaScript.' },
  { title: 'Virtual DOM', body: 'A programming concept where a virtual representation of a UI is kept in memory and synced with the real DOM.' },
  { title: 'Lifecycle Methods', body: 'Special methods that provide run-time hooks for a component.' },
  { title: 'Hooks', body: 'Functions that let you use state and other React features without writing a class.' },
  { title: 'useEffect', body: 'A Hook that lets you perform side effects in function components.' },
  { title: 'Context', body: 'A way to pass data through the component tree without having to pass props down manually at every level.' },
  { title: 'Redux', body: 'A predictable state container for JavaScript apps, often used with React.' },
  { title: 'Reducer', body: 'A function that determines changes to an application\'s state.' },
  { title: 'Dispatch', body: 'A function that lets you send actions to the Redux store.' },
  { title: 'Higher-Order Component', body: 'A function that takes a component and returns a new component.' },
  { title: 'Render Props', body: 'A technique for sharing code between React components using a prop whose value is a function.' },
  { title: 'React Router', body: 'A collection of navigational components that compose declaratively with your application.' }
];

const nodeJsTerms = [
  { title: 'Event-Driven Programming', body: 'A programming paradigm in which the flow of the program is determined by events such as user actions or sensor outputs.' },
  { title: 'Non-Blocking I/O', body: 'Input/output processing that allows other processing to continue before the transmission has finished.' },
  { title: 'Callback', body: 'A function passed as an argument to another function that is invoked after the first function completes.' },
  { title: 'Promise', body: 'An object representing the eventual completion or failure of an asynchronous operation.' },
  { title: 'Async/Await', body: 'Syntax for writing asynchronous code in a synchronous manner.' },
  { title: 'Middleware', body: 'Functions that execute during the lifecycle of a request to the server.' },
  { title: 'Express', body: 'A web application framework for Node.js.' },
  { title: 'NPM', body: 'Node Package Manager - a package manager for the JavaScript programming language.' },
  { title: 'Module', body: 'A file that contains code to be used by other parts of the application.' },
  { title: 'REPL', body: 'Read-Eval-Print Loop - an interactive shell that processes Node.js expressions.' },
  { title: 'Event Loop', body: 'A programming construct that waits for and dispatches events or messages in a program.' },
  { title: 'Buffer', body: 'A temporary holding spot for data being moved from one place to another.' },
  { title: 'Stream', body: 'An abstract interface for working with streaming data in Node.js.' },
  { title: 'Cluster', body: 'A module that allows running multiple Node.js processes that share the same server port.' },
  { title: 'Package.json', body: 'A file that contains metadata about a Node.js project and its dependencies.' }
];


const WWITerms = [
  // WWI Terms
  { title: 'Archduke Franz Ferdinand', body: 'The assassination of Archduke Franz Ferdinand of Austria-Hungary in 1914 triggered the start of World War I.' },
  { title: 'Trench Warfare', body: 'A type of combat in which opposing troops fight from trenches facing each other, leading to a stalemate on the Western Front.' },
  { title: 'Treaty of Versailles', body: 'The peace treaty that ended World War I, imposing heavy reparations and territorial losses on Germany.' },
  { title: 'Allies', body: 'The alliance of Great Britain, France, and Russia, and later joined by the United States and others, during World War I.' },
  { title: 'Central Powers', body: 'The alliance of Germany, Austria-Hungary, the Ottoman Empire, and Bulgaria during World War I.' },
  { title: 'Lusitania', body: 'A British ocean liner torpedoed and sunk by a German U-boat in 1915, contributing to the US entering World War I.' },
  { title: 'League of Nations', body: 'An international organization established after World War I to promote peace and cooperation among nations.' },
  { title: 'Woodrow Wilson', body: 'The President of the United States during World War I, who proposed the Fourteen Points and played a key role in the Treaty of Versailles negotiations.' },
  { title: 'Militarism', body: 'The belief or desire of a government or people that a country should maintain a strong military capability and be prepared to use it aggressively to defend or promote national interests.' },
  { title: 'Nationalism', body: 'A strong feeling of pride in and devotion to one\'s country, often accompanied by a belief that it is superior to others.' },
  { title: 'Assassination of Archduke Franz Ferdinand', body: 'The event that sparked the beginning of World War I, when the Archduke of Austria-Hungary and his wife were assassinated in Sarajevo on June 28, 1914.' },
  { title: 'War Guilt Clause', body: 'A clause in the Treaty of Versailles by which Germany acknowledged that it alone was responsible for World War I.' },
  { title: 'No Man\'s Land', body: 'The area between the trenches of opposing forces on the Western Front during World War I, often devastated by artillery bombardments and difficult to cross.' },
  { title: 'Great War', body: 'An alternative name for World War I, coined before the occurrence of World War II.' },
  { title: 'Schlieffen Plan', body: 'The German military plan developed before World War I that aimed to quickly defeat France in the west and then move east to face Russia.' }
];

const WWIITerms = [
  // WWII Terms
  { title: 'Blitzkrieg', body: 'A method of warfare where the attacker uses rapid and overwhelming force, including air raids and fast-moving ground troops, to quickly defeat the enemy.' },
  { title: 'Holocaust', body: 'The genocide during World War II in which Nazi Germany, aided by collaborators, systematically murdered six million Jews and millions of others.' },
  { title: 'D-Day', body: 'The Allied invasion of Normandy on June 6, 1944, which was a turning point in World War II leading to the liberation of Western Europe from Nazi control.' },
  { title: 'Adolf Hitler', body: 'The dictator of Nazi Germany during World War II, responsible for orchestrating the Holocaust and leading his country into war against the Allied powers.' },
  { title: 'Pearl Harbor', body: 'The surprise military strike by the Imperial Japanese Navy Air Service against the United States naval base at Pearl Harbor, Hawaii, on December 7, 1941, which led to the United States\' entry into World War II.' },
  { title: 'Axis Powers', body: 'The alliance of Germany, Italy, and Japan during World War II.' },
  { title: 'Allied Powers', body: 'The alliance of Great Britain, the United States, the Soviet Union, and other nations during World War II.' },
  { title: 'Nazi Party', body: 'The political party led by Adolf Hitler that ruled Germany from 1933 to 1945 and was responsible for the Holocaust and other atrocities during World War II.' },
  { title: 'The Final Solution', body: 'The Nazi plan for the genocide of Jews during World War II.' },
  { title: 'Atomic Bomb', body: 'A bomb that derives its destructive power from nuclear reactions and was used by the United States against Japan in 1945, leading to the end of World War II.' },
  { title: 'The Battle of Stalingrad', body: 'A major battle of World War II in which Nazi Germany and its allies fought the Soviet Union for control of the city of Stalingrad (now Volgograd) in Southern Russia.' },
  { title: 'The Manhattan Project', body: 'The research and development project during World War II that produced the first nuclear weapons, leading to the bombings of Hiroshima and Nagasaki.' },
  { title: 'V-E Day', body: 'Victory in Europe Day, May 8, 1945, the date when the Allies formally accepted the unconditional surrender of Nazi Germany, ending World War II in Europe.' },
  { title: 'V-J Day', body: 'Victory over Japan Day, August 15, 1945, the date when the Allied forces claimed victory over Japan, effectively ending World War II.' },
  { title: 'Winston Churchill', body: 'The Prime Minister of the United Kingdom during most of World War II, who led Britain to victory against Nazi Germany.' }
];

const romanEmpireTerms = [
  // Roman Empire Terms
  { title: 'Julius Caesar', body: 'A Roman general and statesman who played a critical role in the events leading to the demise of the Roman Republic and the rise of the Roman Empire.' },
  { title: 'Pax Romana', body: 'A period of relative peace and stability across the Roman Empire lasting from 27 BC to AD 180.' },
  { title: 'Augustus', body: 'The first Roman emperor, who established the Pax Romana and significantly expanded the Roman Empire.' },
  { title: 'Colosseum', body: 'An ancient amphitheater in Rome, known for its gladiatorial contests and other public spectacles.' },
  { title: 'Roman Senate', body: 'The advisory body of the Roman Republic and Empire, composed of appointed representatives from Rome\'s various social classes.' },
  { title: 'Roman Republic', body: 'The period of ancient Roman civilization before the establishment of the Roman Empire, characterized by a republican form of government.' },
  { title: 'Julius Caesar', body: 'A Roman general and statesman who played a critical role in the events leading to the demise of the Roman Republic and the rise of the Roman Empire.' },
  { title: 'Pax Romana', body: 'A period of relative peace and stability across the Roman Empire lasting from 27 BC to AD 180.' },
  { title: 'Augustus', body: 'The first Roman emperor, who established the Pax Romana and significantly expanded the Roman Empire.' },
  { title: 'Colosseum', body: 'An ancient amphitheater in Rome, known for its gladiatorial contests and other public spectacles.' },
  { title: 'Roman Senate', body: 'The advisory body of the Roman Republic and Empire, composed of appointed representatives from Rome\'s various social classes.' },
  { title: 'Roman Republic', body: 'The period of ancient Roman civilization before the establishment of the Roman Empire, characterized by a republican form of government.' }
];

const greekEmpireTerms = [
  // Greek Empire Terms
  { title: 'Alexander the Great', body: 'King of Macedonia who conquered an empire that stretched from the Balkans to modern-day Pakistan.' },
  { title: 'Peloponnesian War', body: 'A protracted conflict between Athens and Sparta, along with their respective allies, that lasted from 431 to 404 BC.' },
  { title: 'Socrates', body: 'A classical Greek philosopher credited as one of the founders of Western philosophy, known for his contributions to ethics and the Socratic method.' },
  { title: 'Aristotle', body: 'A Greek philosopher and scientist who was Plato\'s student and the tutor of Alexander the Great.' },
  { title: 'Ancient Greece', body: 'The period in Greek history lasting from the Archaic period of the 8th to 6th centuries BC to the end of antiquity (c. 600 AD).' },
  { title: 'City-State (Polis)', body: 'An independent city, often consisting of a city and its surrounding territory, functioning as an autonomous political unit in ancient Greece.' },
  { title: 'Athenian Democracy', body: 'A system of direct democracy practiced in ancient Athens, in which decision-making power rested with the assembly of all eligible citizens.' },
  { title: 'Greek Philosophy', body: 'The philosophical activities and inquiries of the Greek civilizations, spanning from the 6th century BC to the end of antiquity (c. 600 AD).' },
  { title: 'Greek Gods and Goddesses', body: 'The deities and divine figures of ancient Greek mythology, including Zeus, Hera, Athena, Apollo, and many others.' },
  { title: 'Pericles', body: 'An influential Athenian statesman, orator, and general during the Golden Age of Athens, known for his promotion of democracy and the Athenian Empire.' },
  { title: 'Sparta', body: 'A prominent city-state in ancient Greece, known for its military prowess and its emphasis on austerity, discipline, and a strong military ethos.' },
  { title: 'Ancient Greek Art and Architecture', body: 'The artistic and architectural achievements of ancient Greek civilization, including sculpture, pottery, and iconic architectural styles such as the Doric, Ionic, and Corinthian orders.' },
  { title: 'Battle of Marathon', body: 'A pivotal battle in the Greco-Persian Wars, fought between the citizens of Athens and the Persian Empire in 490 BC, resulting in a decisive Athenian victory.' },
  { title: 'Olympic Games', body: 'A series of athletic competitions held in ancient Greece, primarily in Olympia, in honor of the gods and as part of a festival celebrating Greek culture and religion.' }
];

const egyptianHistoryTerms = [
  // Egyptian History Terms
  { title: 'Pharaoh', body: 'The common title of the monarchs of ancient Egypt from the First Dynasty (c. 3150 BCE) until the annexation of Egypt by the Roman Empire in 30 BCE.' },
  { title: 'Pyramids of Giza', body: 'A complex of ancient monuments in Egypt, including three pyramid complexes and the Great Sphinx, built during the Fourth Dynasty.' },
  { title: 'Nile River', body: 'The longest river in the world, flowing through northeastern Africa, and a significant factor in the development of ancient Egyptian civilization.' },
  { title: 'Hieroglyphics', body: 'A system of writing using symbols or pictures, used in ancient Egypt.' },
  { title: 'King Tutankhamun', body: 'An Egyptian pharaoh of the 18th dynasty, during the New Kingdom of Egyptian history, known for his intact tomb, discovered in the Valley of the Kings.' },
  { title: 'Rosetta Stone', body: 'An ancient stone slab inscribed with a decree issued at Memphis, Egypt, in 196 BC, written in three scripts: hieroglyphic, demotic, and Greek, providing the key to deciphering ancient Egyptian hieroglyphs.' },
  { title: 'The Great Sphinx', body: 'A large statue of a reclining sphinx, a mythical creature with the body of a lion and the head of a human, located near the pyramids of Giza in Egypt.' },
  { title: 'Old Kingdom', body: 'The period in ancient Egyptian history, spanning from the 27th century BC to the 22nd century BC, known for the construction of the Great Pyramids.' },
  { title: 'New Kingdom', body: 'The period in ancient Egyptian history, spanning from the 16th century BC to the 11th century BC, known for its military expansion and the construction of grand temples and monuments.' },
  { title: 'Valley of the Kings', body: 'A valley in Egypt where, for a period of nearly 500 years from the 16th to 11th century BC, tombs were constructed for the Pharaohs and powerful nobles of the New Kingdom.' },
  { title: 'Hatshepsut', body: 'One of the most successful pharaohs of ancient Egypt, ruling as regent for her stepson, Thutmose III, and later as pharaoh herself during the 18th dynasty.' },
  { title: 'The Book of the Dead', body: 'A collection of ancient Egyptian funerary texts, intended to guide the deceased through the afterlife and ensure a safe passage to the realm of the dead.' },
  { title: 'Hyksos', body: 'A people of mixed origins who infiltrated Egypt and ended the Thirteenth Dynasty, initiating the Second Intermediate Period.' },
  { title: 'The Nile Delta', body: 'The delta formed in Northern Egypt where the Nile River spreads out and drains into the Mediterranean Sea.' },
  { title: 'Heliopolis', body: 'An ancient city located in the northeastern part of present-day Cairo, Egypt, known for its significance in ancient Egyptian religious and intellectual life.' }
];

const earlyAmericanHistoryTerms = [
  // Early American History Terms
  { title: 'Declaration of Independence', body: 'The document declaring the thirteen American colonies\' independence from British rule, adopted on July 4, 1776.' },
  { title: 'Boston Tea Party', body: 'A political protest by the Sons of Liberty in Boston, on December 16, 1773, against the British government and the East India Company, in which they destroyed an entire shipment of tea.' },
  { title: 'American Revolution', body: 'The colonial revolt that took place between 1765 and 1783, leading to the independence of the thirteen American colonies from British rule.' },
  { title: 'Constitution of the United States', body: 'The supreme law of the United States, drafted in 1787, which established the framework of the federal government, the separation of powers, and the rights of citizens.' },
  { title: 'George Washington', body: 'The first President of the United States, serving from 1789 to 1797, and the Commander-in-Chief of the Continental Army during the American Revolutionary War.' },
  { title: 'Thomas Jefferson', body: 'One of the Founding Fathers of the United States, the principal author of the Declaration of Independence, and the third President of the United States, serving from 1801 to 1809.' },
  { title: 'American Civil War', body: 'A civil war fought in the United States between 1861 and 1865, primarily over issues of slavery and states\' rights, resulting in the abolition of slavery and the preservation of the Union.' },
  { title: 'Abraham Lincoln', body: 'The 16th President of the United States, serving from 1861 until his assassination in 1865, who led the country through the Civil War and played a crucial role in the abolition of slavery.' },
  { title: 'The Louisiana Purchase', body: 'The acquisition of the Louisiana Territory by the United States from France in 1803, nearly doubling the size of the country.' },
  { title: 'Lewis and Clark Expedition', body: 'An expedition led by Meriwether Lewis and William Clark from May 1804 to September 1806, to explore the territory acquired in the Louisiana Purchase and to find a route to the Pacific Ocean.' },
  { title: 'The War of 1812', body: 'A conflict fought between the United States and the United Kingdom from June 1812 to February 1815, primarily over trade restrictions, impressment, and British support for Native American tribes.' },
  { title: 'Manifest Destiny', body: 'The 19th-century belief that the United States was destined to expand across the North American continent, from the Atlantic Ocean to the Pacific Ocean.' },
  { title: 'Trail of Tears', body: 'The forced relocation and movement of Native American nations from their ancestral homelands in the Southeastern United States to Indian Territory (present-day Oklahoma) in the 1830s, following the Indian Removal Act of 1830.' },
  { title: 'Emancipation Proclamation', body: 'A presidential proclamation issued by Abraham Lincoln on January 1, 1863, that declared all enslaved people in Confederate-held territory to be forever free.' },
  { title: 'American Revolutionary War', body: 'The war between Great Britain and its thirteen colonies in America, which lasted from 1775 to 1783, resulting in the independence of the colonies and the formation of the United States of America.' }
];


const psychologyTerms = [
   // Psychology Terms
   { title: 'Psychology', body: 'The scientific study of the human mind and behavior.' },
   { title: 'Sigmund Freud', body: 'An Austrian neurologist and the founder of psychoanalysis, who proposed the theory of the unconscious mind and the Oedipus complex.' },
   { title: 'Classical Conditioning', body: 'A learning process that occurs through associations between an environmental stimulus and a naturally occurring stimulus.' },
   { title: 'Operant Conditioning', body: 'A method of learning that occurs through rewards and punishments for behavior.' },
   { title: 'B.F. Skinner', body: 'An American psychologist known for his work in behaviorism and his development of the operant conditioning chamber, often called the "Skinner Box".' },
   { title: 'Cognitive Psychology', body: 'The branch of psychology that focuses on mental processes such as "attention, language use, memory, perception, problem-solving, creativity, and thinking."' },
   { title: 'Abraham Maslow', body: 'An American psychologist best known for creating Maslow\'s hierarchy of needs, a theory of psychological health predicated on fulfilling innate human needs in priority, culminating in self-actualization.' },
   { title: 'Stanley Milgram', body: 'An American social psychologist known for his controversial experiments on obedience conducted in the 1960s during his professorship at Yale University.' },
   { title: 'Developmental Psychology', body: 'The scientific study of how and why human beings change over the course of their life.' },
   { title: 'Cognitive Dissonance', body: 'The mental discomfort (psychological stress) experienced by a person who holds two or more contradictory beliefs, values, or attitudes.' },
   { title: 'Erik Erikson', body: 'A German-American developmental psychologist and psychoanalyst known for his theory on psychosocial development of human beings.' },
   { title: 'Biopsychosocial Model', body: 'A model that suggests that biological, psychological, and social factors all play a significant role in human functioning in the context of disease or illness.' },
   { title: 'Social Psychology', body: 'The scientific study of how people\'s thoughts, feelings, and behaviors are influenced by the actual, imagined, or implied presence of others.' },
   { title: 'Nature vs. Nurture', body: 'A longstanding debate in psychology concerning the relative importance of an individual\'s innate qualities (nature) versus personal experiences (nurture) in determining individual differences in physical and behavioral traits.' },
   { title: 'Self-Actualization', body: 'The realization or fulfillment of one\'s talents and potentialities, especially considered as a drive or need present in everyone.' },

]


const anthropologyTerms = [
  { title: 'Anthropology', body: 'The scientific study of human beings and their ancestors through time and space and in relation to physical character, environmental and social relations, and culture.' },
  { title: 'Cultural Anthropology', body: 'The branch of anthropology that focuses on the study of cultural variation among humans.' },
  { title: 'Archaeology', body: 'The study of human history and prehistory through the excavation of sites and the analysis of artifacts and other physical remains.' },
  { title: 'Biological Anthropology', body: 'The branch of anthropology that studies the physical development of the human species.' },
  { title: 'Linguistic Anthropology', body: 'The branch of anthropology that studies language and its relation to culture.' },
  { title: 'Cultural Relativism', body: 'The principle that an individual human\'s beliefs and activities should be understood by others in terms of that individual\'s own culture.' },
  { title: 'Ethnography', body: 'The scientific description of the customs of individual peoples and cultures.' },
  { title: 'Ethnology', body: 'The study and analysis of different cultures from a comparative or historical point of view, utilizing ethnographic accounts and developing anthropological theories.' },
]

const sociologyTerms = [
  { title: 'Sociology', body: 'The study of society, patterns of social relationships, social interaction, and culture.' },
  { title: 'Social Structure', body: 'The patterned social arrangements in society that are both emergent from and determinant of the actions and interactions of the individuals.' },
  { title: 'Socialization', body: 'The lifelong process through which individuals learn the norms, values, and behaviors of a given society.' },
  { title: 'Social Institution', body: 'A system of behavioral and relationship patterns that are densely interwoven and enduring, and function across an entire society.' },
  { title: 'Social Stratification', body: 'The hierarchical arrangement of individuals or groups within a society based on various factors such as socioeconomic status, race, and gender.' },
  { title: 'Culture', body: 'The shared beliefs, values, customs, behaviors, and artifacts that members of a society use to cope with their world and with one another.' },
  { title: 'Social Identity', body: 'The way individuals define themselves in terms of their group memberships.' },
  { title: 'Social Norms', body: 'The unwritten rules or expectations for behavior within a particular society or social group.' },
  { title: 'Social Control', body: 'The mechanisms, strategies, and procedures that social groups use to maintain order and conformity within a society.' },
  { title: 'Social Change', body: 'The transformation over time of the institutions and culture of a society.' },
  { title: 'Deviance', body: 'Behavior that violates social norms, including both formal and informal rules of society.' },
  { title: 'Social Conflict', body: 'The struggle for power and resources within a society.' },
  { title: 'Social Mobility', body: 'The movement of individuals or groups within the hierarchical system of social classes.' },
  { title: 'Social Constructionism', body: 'The theory that reality is socially constructed and that meaning is created through social interaction.' },
  { title: 'Social Theory', body: 'A set of interrelated ideas that provide a systematic explanation of the social world, including the relationships between individuals and society.' },
  { title: 'Gender Roles', body: 'The socially constructed roles, behaviors, activities, and attributes that a particular society considers appropriate for men and women.' },
  { title: 'Race and Ethnicity', body: 'Categories used to classify humans based on physical characteristics and cultural heritage, often leading to social stratification and inequality.' },
  { title: 'Socialization', body: 'The process by which individuals learn and internalize the values, beliefs, and norms of their culture.' },
  { title: 'Social Order', body: 'The arrangement of practices and behaviors on which societys members base their daily lives.' },
  { title: 'Social Cohesion', body: 'The willingness of members of a society to cooperate with each other in order to survive and prosper.' }
];

const geographyTerms = [
  { title: 'Geography', body: 'The study of the Earth\'s landscapes, environments, and the relationships between people and their environments.' },
  { title: 'Physical Geography', body: 'The branch of geography dealing with natural features and processes.' },
  { title: 'Human Geography', body: 'The branch of geography dealing with the spatial aspects of human existence.' },
  { title: 'Cartography', body: 'The study and practice of making maps.' },
  { title: 'GIS (Geographic Information System)', body: 'A system designed to capture, store, manipulate, analyze, manage, and present spatial or geographic data.' },
  { title: 'Topography', body: 'The arrangement of the natural and artificial physical features of an area.' },
  { title: 'Climate', body: 'The long-term patterns of temperature, humidity, wind, and precipitation in an area.' },
  { title: 'Biogeography', body: 'The branch of geography that studies the distribution of plants and animals across the Earth\'s surface.' },
  { title: 'Cultural Geography', body: 'The study of cultural products and norms and their variations across and relations to spaces and places.' },
  { title: 'Urban Geography', body: 'The study of cities, their geographical distribution, economic functions, and relationships with the environment.' },
  { title: 'Physical Landscape', body: 'The natural environment of a region, including its topography, vegetation, and climate.' },
  { title: 'Human Landscape', body: 'The human-modified environment of a region, including its settlements, infrastructure, and cultural features.' },
  { title: 'Geomorphology', body: 'The study of the origin and evolution of the topographic and bathymetric features of the Earth\'s surface.' },
  { title: 'Biome', body: 'A large naturally occurring community of flora and fauna occupying a major habitat.' },
  { title: 'Hydrology', body: 'The study of the movement, distribution, and quality of water on Earth.' },
  { title: 'Population Geography', body: 'The study of the distribution, composition, and growth of populations.' },
  { title: 'Economic Geography', body: 'The study of the spatial distribution of economic activities and their impacts on regions.' },
  { title: 'Political Geography', body: 'The study of the spatial distribution of political processes and their impacts on regions.' },
  { title: 'Environmental Geography', body: 'The study of the spatial aspects of interactions between humans and the natural world.' },
  { title: 'Remote Sensing', body: 'The scanning of the Earth by satellite or high-flying aircraft in order to obtain information about it.' }
];

const politicalScienceTerms = [
  { title: 'Political Science', body: 'The systematic study of government, politics, and political behavior.' },
  { title: 'Democracy', body: 'A system of government in which power is vested in the people, who rule either directly or through freely elected representatives.' },
  { title: 'Republic', body: 'A form of government in which the country is considered a "public matter", not the private concern or property of the rulers.' },
  { title: 'Monarchy', body: 'A form of government in which a single person, the monarch, holds supreme authority in governance.' },
  { title: 'Oligarchy', body: 'A form of government in which power is vested in a small group of individuals, often distinguished by wealth, family, or military power.' },
  { title: 'Totalitarianism', body: 'A system of government that is centralized and dictatorial and requires complete subservience to the state.' },
  { title: 'Authoritarianism', body: 'A system of government characterized by strong central power and limited political freedoms.' },
  { title: 'Federalism', body: 'A system of government in which power is divided between a central authority and constituent political units.' },
  { title: 'Separation of Powers', body: 'The division of governmental responsibilities into distinct branches to limit any one branch from exercising the core functions of another.' },
  { title: 'Checks and Balances', body: 'A system that allows each branch of government to limit the powers of the other branches in order to prevent abuse of power.' },
  { title: 'Constitution', body: 'A body of fundamental principles or established precedents according to which a state or other organization is acknowledged to be governed.' },
  { title: 'Political Party', body: 'An organized group of people who have the same ideology, or who otherwise have the same political positions, and who field candidates for elections, in an attempt to get them elected and thereby implement the party\'s agenda.' },
  { title: 'Lobbying', body: 'The act of attempting to influence decisions made by officials in the government, most often legislators or members of regulatory agencies.' },
  { title: 'Interest Group', body: 'An organized group of individuals or organizations that tries to influence the policies or decisions of government in a particular field.' },
  { title: 'Public Policy', body: 'The principled guide to action taken by the administrative executive branches of the state with regard to a class of issues in a manner consistent with law and institutional customs.' }
];




// Create decks and cards
 createDeckWithCards(newUser, 'Microeconomics', 'Social Science', microeconomicsTerms, false);
 createDeckWithCards(newUser, 'Macroeconomics', 'Social Science', macroeconomicsTerms, false);
 createDeckWithCards(historyBuff, 'World War I', 'History', WWITerms, false);
 createDeckWithCards(humanitiesGuy, 'Geography', 'Social Science',geographyTerms, true);
 createDeckWithCards(newUser, 'Early American History', 'History',earlyAmericanHistoryTerms, false);
 createDeckWithCards(newUser, 'Accounting', 'Social Science', accountingTerms, true);
 createDeckWithCards(newUser, 'Marketing', 'Social Science', marketingTerms, true);
 createDeckWithCards(historyBuff, 'World War II', 'History', WWIITerms, false);
 createDeckWithCards(scienceUser, 'Physics', 'Science', physicsTerms, true);
 createDeckWithCards(humanitiesGuy, 'Political Science', 'Social Science',politicalScienceTerms, false);
 createDeckWithCards(scienceUser, 'Biology', 'Science', biologyTerms, true);
 createDeckWithCards(humanitiesGuy, 'Sociology', 'Social Science',sociologyTerms, false);
 createDeckWithCards(scienceUser, 'Chemistry', 'Science', chemistryTerms, true);
 createDeckWithCards(languageUser, 'Languages', 'Language', languageTerms, true);
 createDeckWithCards(historyBuff, 'Roman Empire', 'History', romanEmpireTerms, false);
 createDeckWithCards(historyBuff, 'Egyptian Empire', 'History', egyptianHistoryTerms, false);
 createDeckWithCards(techUser, 'JavaScript', 'Technology', javascriptTerms, false);
 createDeckWithCards(techUser, 'HTML & CSS', 'Technology', htmlCssTerms, true);
 createDeckWithCards(techUser, 'React', 'Technology', reactTerms, true);
 createDeckWithCards(historyBuff, 'Greek Empire', 'History', greekEmpireTerms, false);
 createDeckWithCards(techUser, 'Node.js', 'Technology', nodeJsTerms, true);
 createDeckWithCards(humanitiesGuy, 'Psychology', 'Social Science',psychologyTerms, true);
 createDeckWithCards(humanitiesGuy, 'Anthropology', 'Social Science',anthropologyTerms, false);


// const favorites = [];
// const fav1 = new Favorite({
//   owner: newUser.id,
//   deck: decks[5]._id
// })

// favorites.push(fav1)


// const fav2 = new Favorite({
//   owner: newUser.id,
//   deck: decks[6]._id
// })

// favorites.push(fav2)

// const fav3 = new Favorite({
//   owner: newUser.id,
//   deck: decks[7]._id
// })

// favorites.push(fav3)

// const fav4 = new Favorite({
//   owner: newUser.id,
//   deck: decks[8]._id
// })

// favorites.push(fav4)

// const fav5 = new Favorite({
//   owner: newUser.id,
//   deck: decks[9]._id
// })

// favorites.push(fav5)


// const newDeck1 = new Deck({
//   name: 'Micro Topics 1',
//   category: 'Economics',
//   cards: [],
//   author: newUser.id
// })

// const newDeck2 = new Deck({
//   name: 'Macro Topics 1',
//   category: 'Economics',
//   cards: [],
//   author: newUser.id
// })

// const newDeck3 = new Deck({
//   name: 'Physics',
//   category: 'Science',
//   cards: [],
//   author: newUser.id
// })

// const cards = [];
// const card1 = new Card({
//   title: 'Demand',
//   body: 'Quantity purchased in a market at different prices',
//   author: newUser.id,
//   category: 'Economics'
// })

// newDeck1.cards.push(card1);
// cards.push(card1);

// const card2 = new Card({
//   title: 'PED',
//   body: 'Percentage change in quantity demanded over percentage change in prices.',
//   author: newUser.id,
//   category: 'Economics'
// })

// newDeck1.cards.push(card2);
// cards.push(card2);

// const card3 = new Card({
//   title: 'PPF',
//   body: 'Production possibilities frontier - shows all combinations of two goods an economy is capable of producing, given scarce available resources.',
//   author: newUser.id,
//   category: 'Economics'
// })

// newDeck1.cards.push(card3)
// cards.push(card3);

// const card4 = new Card({
//   title: 'MPC',
//   body: 'Marginal propensity to consume - percentage change in quantity consumed over percentage change in income',
//   author: newUser.id,
//   category: 'Economics'
// })

// newDeck1.cards.push(card4);
// cards.push(card4);

// const card5 = new Card({
//   title: 'Inflation',
//   body: 'The sustained increase in price levels',
//   author: newUser.id,
//   category: 'Economics'
// })

// newDeck2.cards.push(card5);
// cards.push(card5);

// const card6 = new Card({
//   title: 'CPI',
//   body: 'Consumer Price Index - tracks a basket of goods and reflects a percentage change in a weighted average of the cost of goods in the basket',
//   author: newUser.id,
//   category: 'Economics'
// })

// newDeck2.cards.push(card6);
// cards.push(card6);

// const card7 = new Card({
//   title: 'Aggregate Demand',
//   body: 'Total output demanded in an economy at different price levels.  C + I + G + (Ex - Im)',
//   author: newUser.id,
//   category: 'Economics'
// })

// newDeck2.cards.push(card7);
// cards.push(card7);

// const card8 = new Card({
//   title: 'Investment',
//   body: 'Part of Aggregate Demand. Includes purchase of physical capital by business, purchase of new homes by households, and changes to inventory',
//   author: newUser.id,
//   category: 'Economics'
// })

// newDeck2.cards.push(card8);
// cards.push(card8);

// const card9 = new Card({
//   title: 'Acceleration',
//   body: 'The rate at which velocity changes',
//   author: newUser.id,
//   category: 'Science'
// })

// newDeck3.cards.push(card9);
// cards.push(card9);

// const card10 = new Card({
//   title: 'Archimedes Principle',
//   body: 'The rule that the buoyant force on an object is equal to the wieght of the fluid the object displaces',
//   author: newUser.id,
//   category: 'Science'
// })

// newDeck3.cards.push(card10);
// cards.push(card10);

// const card11 = new Card({
//   title: 'Chemical Energy',
//   body: 'The potential energy stored in chemical bonds',
//   author: newUser.id,
//   category: 'Science'
// })

// newDeck3.cards.push(card11);
// cards.push(card11);

// const card12 = new Card({
//   title: 'Joule',
//   body: 'Unit used to measuer electrical energy',
//   author: newUser.id,
//   category: 'Science'
// })

// newDeck3.cards.push(card12);
// cards.push(card12);


// decks.push(newDeck1);
// decks.push(newDeck2);
// decks.push(newDeck3);

// const newDeck4 = new Deck({
//   name: 'Biology',
//   category: 'Science',
//   cards: [],
//   author: scienceUser.id
// })





// const card13 = new Card({
//   title: 'Hymenoptera',
//   body: 'An orer of insects including: beex',
//   author: scienceUser.id,
//   category: 'Science'
// })

// newDeck4.cards.push(card13);
// cards.push(card13);

// const card14 = new Card({
//   title: 'Prokaryotic Cell',
//   body: 'Primitve, lack membrane-bound internal organelles',
//   author: scienceUser.id,
//   category: 'Science'
// })

// newDeck4.cards.push(card14);
// cards.push(card14);

// const card15 = new Card({
//   title: 'Autotrophic Nutrition',
//   body: 'Source of carbon is simple, such as carbon dioxide',
//   author: scienceUser.id,
//   category: 'Science'
// })

// newDeck4.cards.push(card15);
// cards.push(card15);

// const card16 = new Card({
//   title: 'Isotopes',
//   body: 'Elements that have the same number of protons and behave the same in chemical reactions, but they have a different number of neutrons',
//   author: scienceUser.id,
//   category: 'Science'
// })

// newDeck4.cards.push(card16);
// cards.push(card16);

// const newDeck5 = new Deck({
//   name: 'Chemistry',
//   category: 'Science',
//   cards: [],
//   author: scienceUser.id
// })


// const card17 = new Card({
//   title: 'Specific Gravity',
//   body: 'The ratio of the density of a given liquid to the density of water at 4 degrees celcius',
//   author: scienceUser.id,
//   category: 'Science'
// })

// newDeck5.cards.push(card17);
// cards.push(card17);

// const card18 = new Card({
//   title: 'Elements',
//   body: 'Substances that cannot be broken down into simpler substances by chemical reactions.',
//   author: scienceUser.id,
//   category: 'Science'
// })

// newDeck5.cards.push(card18);
// cards.push(card18);

// const card19 = new Card({
//   title: 'Distillation',
//   body: 'The method for separating the components of a liquid mixture that depends on differences in the ease of vaporization of the components',
//   author: scienceUser.id,
//   category: 'Science'
// })

// newDeck5.cards.push(card19);
// cards.push(card19);

// const card20 = new Card({
//   title: 'Anion',
//   body: 'Ions that have a negative charge.  Form when an atom gains electrons.',
//   author: scienceUser.id,
//   category: 'Science'
// })

// newDeck5.cards.push(card20);
// cards.push(card20);

// const newDeck6 = new Deck({
//   name: 'Astrophysics',
//   category: 'Science',
//   cards: [],
//   author: scienceUser.id
// })

// const card21 = new Card({
//   title: 'Galactic Bulge',
//   body: 'The spheroidal distribution of stars toward the center of the Milky Way that are intermediate in age between the disk stars and halo stars.',
//   author: scienceUser.id,
//   category: 'Science'
// })

// newDeck6.cards.push(card21);
// cards.push(card21);


// const card22 = new Card({
//   title: 'Isotropic',
//   body: 'The same in all directions',
//   author: scienceUser.id,
//   category: 'Science'
// })

// newDeck6.cards.push(card22);
// cards.push(card22);

// const card23 = new Card({
//   title: 'Mass-luminosity relation',
//   body: 'The mathematical relationship between the mass of main-sequence stars and their total emission. More massive stars have far higher values of luminosity.',
//   author: scienceUser.id,
//   category: 'Science'
// })

// newDeck6.cards.push(card23);
// cards.push(card23);

// const card24 = new Card({
//   title: 'Oort cloud',
//   body: 'The swarm of comets surrounding the solar system.',
//   author: scienceUser.id,
//   category: 'Science'
// })

// newDeck6.cards.push(card24);
// cards.push(card24);

// decks.push(newDeck4);
// decks.push(newDeck5);
// decks.push(newDeck6);


// const newDeck7 = new Deck({
//   name: 'Organic Chemistry',
//   category: 'Science',
//   cards: [],
//   author: scienceUser.id
// })

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Reset and seed db
const insertSeeds = () => {
  console.log("Resetting db and seeding users...");

  User.collection.drop()
    .then(()=>Card.collection.drop())
    .then(()=>Deck.collection.drop())
    .then(()=>Favorite.collection.drop())
    .then(() => User.insertMany(users))
    .then(()=>Card.insertMany(cards))
    .then(()=>Deck.insertMany(decks))
    // .then(()=>Favorite.insertMany(favorites))
    .then(() => {
      console.log("Done!");
      mongoose.disconnect();
    })
    .catch(err => {
      console.error(err.stack);
      process.exit(1);
    });
};
