require('dotenv').config();
const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const bcrypt = require('bcryptjs');
const cardModule = require('../models/Card')
const Card = cardModule.model
const Deck = require('../models/Deck')
const User = require('../models/User');

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


//create Decks and Cards

const decks = [];
const cards = [];

const createDeckWithCards = async (user, deckName, category, terms) => {
  const deck =  new Deck({
    name: deckName,
    category,
    author: user.id
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

// Create decks and cards
 createDeckWithCards(newUser, 'Microeconomics', 'Social Science', microeconomicsTerms);
 createDeckWithCards(newUser, 'Macroeconomics', 'Social Science', macroeconomicsTerms);
 createDeckWithCards(newUser, 'Accounting', 'Social Science', accountingTerms);
 createDeckWithCards(newUser, 'Marketing', 'Social Science', marketingTerms);
 createDeckWithCards(scienceUser, 'Physics', 'Science', physicsTerms);
 createDeckWithCards(scienceUser, 'Biology', 'Science', biologyTerms);
 createDeckWithCards(scienceUser, 'Chemistry', 'Science', chemistryTerms);
 createDeckWithCards(languageUser, 'Languages', 'Language', languageTerms);
 createDeckWithCards(techUser, 'JavaScript', 'Technology', javascriptTerms);
 createDeckWithCards(techUser, 'HTML & CSS', 'Technology', htmlCssTerms);
 createDeckWithCards(techUser, 'React', 'Technology', reactTerms);
 createDeckWithCards(techUser, 'Node.js', 'Technology', nodeJsTerms);


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
    .then(() => User.insertMany(users))
    .then(()=>Card.insertMany(cards))
    .then(()=>Deck.insertMany(decks))
    .then(() => {
      console.log("Done!");
      mongoose.disconnect();
    })
    .catch(err => {
      console.error(err.stack);
      process.exit(1);
    });
};
