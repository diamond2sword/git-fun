
import { MVPFlipCard, DragItem, GalleryItem, QuizData, Badge, Quest } from './types';

export const BADGES: Badge[] = [
  { id: 'api_master', name: 'API Master', icon: '🔓', desc: 'Unlocked all APIE secrets!' },
  { id: 'secret_keeper', name: 'Secret Keeper', icon: '🛡️', desc: 'Protected the sensitive data.' },
  { id: 'code_ninja', name: 'Code Ninja', icon: '⚔️', desc: 'Got the quiz right on first try.' },
  { id: 'builder', name: 'Object Builder', icon: '🛠️', desc: 'Created your first custom Class.' },
  { id: 'lvl1_complete', name: 'Level 1 Complete', icon: '🏅', desc: 'Finished the Warm-Up!' },
  { id: 'python_novice', name: 'Python Novice', icon: '🐍', desc: 'Completed the first Python Quest.' },
  { id: 'logic_wizard', name: 'Logic Wizard', icon: '🧠', desc: 'Mastered If/Else statements.' },
  { id: 'loop_lord', name: 'Loop Lord', icon: '🔄', desc: 'Conquered the Loops.' }
];

export const MASCOT_MSG = {
  intro: "Yo! Welcome sa OOP World! Dito, you build heroes and monsters. Let's level up your skills!",
  quizCorrect: "Sheesh! Ang galing mo, Lods! 🔥",
  quizWrong: "Oof! Try again, kaya mo yan! 💪",
  cardUnlock: "Nice! You unlocked a secret concept! 🔓",
  final: "Grabe, coding beast ka na! Claim your badge!"
};

export const APIE_LORE: string[] = [
    "Okay, listen up explorers. Object-Oriented Programming (OOP) is basically how we model the real world inside our computers. Instead of writing a chaotic list of instructions, we create 'Objects'. Imagine building a game—you don't script every single pixel movement manually. You create a 'Player' object with stats and moves. That’s OOP in a nutshell.",
    
    "Before OOP, code was often like 'spaghetti'—messy, intertwined, and hard to fix. OOP straightens that out. It organizes code into neat little boxes called Classes (the blueprints) and Objects (the actual houses built from blueprints). This makes your code cleaner, easier to read, and way simpler to debug when things go south.",
    
    "First up in the APIE squad is **Abstraction**. Think of it like driving a car. You step on the gas, and the car moves. Do you need to know how the fuel injection system works or how the pistons fire? No. That complex stuff is 'abstracted' away. In coding, we hide the messy logic behind a simple button or function name, so you focus on *what* it does, not *how* it does it.",
    
    "Why do we care about Abstraction? Because if you had to understand every single line of code in a library just to use it, you’d never finish anything. Abstraction lets us use complex systems (like sending an email or rendering 3D graphics) with just one line of code. It keeps your brain from exploding by filtering out the noise.",
    
    "Next is **Encapsulation**. Imagine a capsule medicine—the medicine is safe inside the shell. In code, we wrap our data (variables) inside a class and protect it. We don't let just anyone change a Player's HP to 9999. We control access using 'private' variables. It’s like having a bouncer for your data.",
    
    "Encapsulation prevents bugs where one part of your code accidentally messes up another part. If you want to change the data, you have to ask politely through a 'method' (function). This keeps your code robust and secure, shielding sensitive info like passwords or game scores from hackers (or just clumsy developers).",
    
    "Third is **Inheritance**. This is literally passing down traits from parent to child. Say you have a generic class 'Monster'. It has HP and an Attack. Now you want a 'Zombie' and a 'Vampire'. Instead of rewriting HP and Attack code for both, they just 'inherit' from 'Monster'. They get all the free stats automatically!",
    
    "Inheritance saves you hours of typing. You write the common stuff once in the Parent class, and all the Child classes get it. If you fix a bug in the Parent, it’s fixed for the Zombie, the Vampire, and the Werewolf instantly. It’s the ultimate 'Don't Repeat Yourself' (DRY) hack that makes scaling your app super fast.",
    
    "Finally, **Polymorphism**. Poly means 'many', morph means 'forms'. It allows different objects to be treated as the same thing but behave differently. Think of a 'Speak' button. If you press it on a Dog object, it barks. On a Cat object, it meows. Same button (method name), different action.",
    
    "Put them all together—A.P.I.E.—and you have the superpower to build massive, complex worlds that are easy to manage. Abstraction simplifies, Encapsulation protects, Inheritance recycles, and Polymorphism adapts. Master these four, and you aren't just coding; you're architecting entire universes."
];

export const MVP_CARDS: MVPFlipCard[] = [
  {
    id: 'abs',
    title: 'Abstraction',
    desc: 'Hide the messy stuff',
    emoji: '🟦',
    backTitle: 'ATM Mode',
    backCode: 'atm.withdraw() # Easy!',
    colorClass: 'bg-blue-500'
  },
  {
    id: 'poly',
    title: 'Polymorphism',
    desc: 'Same move, diff style',
    emoji: '🟪',
    backTitle: 'Shape Shift',
    backCode: 'dog.speak() # Woof\ncat.speak() # Meow',
    colorClass: 'bg-purple-500'
  },
  {
    id: 'inh',
    title: 'Inheritance',
    desc: 'Mana from parent',
    emoji: '🟩',
    backTitle: 'Super Class',
    backCode: 'class Dog(Animal):\n  pass',
    colorClass: 'bg-green-500'
  },
  {
    id: 'enc',
    title: 'Encapsulation',
    desc: 'Keep it safe',
    emoji: '🟥',
    backTitle: 'Private Data',
    backCode: '__password = "123"',
    colorClass: 'bg-red-500'
  }
];

export const DRAG_ITEMS: DragItem[] = [
  { id: '1', label: 'username', correctZone: 'show' },
  { id: '2', label: 'hp_bar', correctZone: 'show' },
  { id: '3', label: 'password', correctZone: 'hide' },
  { id: '4', label: 'level', correctZone: 'show' },
  { id: '5', label: 'secret_key', correctZone: 'hide' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'The Hero',
    desc: 'Stats: High HP',
    icon: '🦸‍♂️',
    codeSnippet: 'class Hero:\n  atk = 99',
    rarity: 'common',
    stats: { power: 80, defense: 50 }
  },
  {
    id: 'g2',
    title: 'The Mobile',
    desc: 'Speed: 100mph',
    icon: '🏎️',
    codeSnippet: 'class Car:\n  nitro = True',
    rarity: 'rare',
    stats: { power: 60, defense: 90 }
  },
  {
    id: 'g3',
    title: 'Doggo',
    desc: 'Loyalty: 100%',
    icon: '🐕',
    codeSnippet: 'class Dog:\n  good_boy = True',
    rarity: 'epic',
    stats: { power: 40, defense: 20 }
  }
];

export const MVP_QUIZ: QuizData = {
  question: 'Predict the output loot!',
  code: 'class Cat:\n  def sound(self):\n    print("Meow")\n\nCat().sound()',
  answer: 'meow'
};

// --- PYTHON QUESTS (Chapter 1) ---
export const PYTHON_QUESTS: Quest[] = [
    // ZONE 1: PRINTING & STRINGS
    { 
        id: 1, 
        title: "Say Hello", 
        desc: "Use print() to make the computer talk. Edit the code to print exactly 'Hello, World!' inside the quotes.", 
        codeTemplate: "print(\"___\")", 
        expected: "Hello, World!", 
        solution: "Hello, World!",
        xp: 5, 
        reward: "Badge: First Words",
        type: 'print',
        visualType: 'chat-bubble'
    },
    { 
        id: 2, 
        title: "Stick Strings Together", 
        desc: "You can glue text together using the '+' symbol. Replace the underscore to combine 'Iron' and 'Man' into 'IronMan'.", 
        codeTemplate: "print('Iron' + '___')", 
        expected: "IronMan", 
        solution: "Man",
        xp: 5, 
        reward: "Item: String Link Card",
        type: 'print',
        visualType: 'puzzle-snap'
    },
    { 
        id: 3, 
        title: "Ask for Input", 
        desc: "Programs are boring if they don't ask you things. Set the variable `name` to 'User' so the program greets them.", 
        codeTemplate: "name = '___'\nprint('Welcome ' + name)", 
        expected: "Welcome User", 
        solution: "User",
        xp: 10, 
        reward: "Unlock: Custom Theme",
        type: 'print',
        visualType: 'avatar-input'
    },

    // ZONE 2: VARIABLES
    { 
        id: 4, 
        title: "Create a Variable", 
        desc: "A variable is a box for saving data. Assign the value 'Knight' to the `hero` variable below.", 
        codeTemplate: "hero = '___'\nprint(hero)", 
        expected: "Knight", 
        solution: "Knight",
        xp: 5, 
        reward: "Icon: Variable Holder",
        type: 'var',
        visualType: 'variable-blocks'
    },
    { 
        id: 5, 
        title: "Swap the Values", 
        desc: "Imagine you have two boxes, A and B. Use Python's magic tuple unpacking to swap them in one line.", 
        codeTemplate: "a = 1\nb = 2\na, b = ___\nprint(a, b)", 
        expected: "2 1", 
        solution: "b, a",
        xp: 10, 
        reward: "Bonus: +2 XP Streak",
        type: 'var',
        visualType: 'liquid-swap'
    },
    { 
        id: 6, 
        title: "Changing Types", 
        desc: "The variable `num_str` is text ('5'). Use `int()` to convert it to a number so you can add 5 to it.", 
        codeTemplate: "num_str = '5'\nresult = int(___) + 5\nprint(result)", 
        expected: "10", 
        solution: "num_str",
        xp: 7, 
        reward: "Icon: Calculator",
        type: 'var',
        visualType: 'number-morph'
    },

    // ZONE 3: MATH
    { 
        id: 7, 
        title: "Basic Math", 
        desc: "Python is a calculator. Multiply (10 + 5) by 2 to get 30.", 
        codeTemplate: "print((10 + 5) * ___)", 
        expected: "30", 
        solution: "2",
        xp: 10, 
        reward: "Reward: Fire Animation",
        type: 'math',
        visualType: 'calculator'
    },
    { 
        id: 8, 
        title: "Remainders", 
        desc: "The percent symbol (%) gives the remainder. 10 divided by 3 is 3 with a remainder of 1. Complete the code.", 
        codeTemplate: "print(10 % ___)", 
        expected: "1", 
        solution: "3",
        xp: 5, 
        reward: "Badge: Remainder Master",
        type: 'math',
        visualType: 'pizza-slice'
    },
    { 
        id: 9, 
        title: "Exponents", 
        desc: "Use double stars (**) for powers. Raise 2 to the power of 3 (2 * 2 * 2) to get 8.", 
        codeTemplate: "print(2 ** ___)", 
        expected: "8", 
        solution: "3",
        xp: 7, 
        reward: "Effect: Power Surge",
        type: 'math',
        visualType: 'power-stack'
    },

    // ZONE 4: LOGIC
    { 
        id: 10, 
        title: "Simple Check", 
        desc: "Code makes decisions using 'if'. Change the blank so the condition (10 > ___) is True.", 
        codeTemplate: "if 10 > ___:\n    print('Pass')", 
        expected: "Pass", 
        solution: "5",
        xp: 5, 
        reward: "Sticker: Positive Vibes",
        type: 'logic',
        visualType: 'logic-gate'
    },
    { 
        id: 11, 
        title: "Even or Odd", 
        desc: "If a number % 2 is 0, it's even. Complete the check to see if 4 is even.", 
        codeTemplate: "if 4 % 2 == ___:\n    print('Even')", 
        expected: "Even", 
        solution: "0",
        xp: 5, 
        reward: "Badge: Number Judge",
        type: 'logic',
        visualType: 'pair-dots'
    },
    { 
        id: 12, 
        title: "Double Check", 
        desc: "Use 'and' to check two things. Set `key` to True so both conditions pass.", 
        codeTemplate: "hp = 100\nkey = ___\nif hp > 0 and key:\n    print('Enter')", 
        expected: "Enter", 
        solution: "True",
        xp: 10, 
        reward: "Icon: Vault Open",
        type: 'logic',
        visualType: 'venn-diagram'
    },

    // ZONE 5: LOOPS
    { 
        id: 13, 
        title: "For Loops", 
        desc: "Use `range()` to loop 3 times. Remember, range(3) counts 0, 1, 2.", 
        codeTemplate: "for i in range(___):\n    print(i)", 
        expected: "2", 
        solution: "3",
        xp: 10, 
        reward: "Badge: Loop Lord",
        type: 'loop',
        visualType: 'loop-tiles'
    },
    { 
        id: 14, 
        title: "While Loops", 
        desc: "This loop runs while x > 0. Decrease `x` by 1 each step so it counts down (3, 2, 1) and stops.", 
        codeTemplate: "x = 3\nwhile x > 0:\n    print(x)\n    x -= ___", 
        expected: "1", 
        solution: "1",
        xp: 10, 
        reward: "Sound: Timer Tick",
        type: 'loop',
        visualType: 'countdown'
    },
    { 
        id: 15, 
        title: "Breaking Out", 
        desc: "Stop the loop early! Use the `break` keyword when `i` equals 2.", 
        codeTemplate: "for i in range(5):\n    if i == 2:\n        ___\n    print(i)", 
        expected: "1", 
        solution: "break",
        xp: 7, 
        reward: "Anim: Door Escape",
        type: 'loop',
        visualType: 'runner-stop'
    },

    // ZONE 6: LISTS
    { 
        id: 16, 
        title: "Making a List", 
        desc: "Lists hold multiple items. Add 'Shield' to the list so it contains both items.", 
        codeTemplate: "gear = ['Sword', '___']\nprint(gear)", 
        expected: "Sword", 
        solution: "Shield",
        xp: 5, 
        reward: "Icon: Fruit Basket",
        type: 'list',
        visualType: 'fruit-basket'
    },
    { 
        id: 17, 
        title: "Adding Items", 
        desc: "Add new items to a list using the `.append()` method.", 
        codeTemplate: "gear = ['Sword']\ngear.___('Helmet')\nprint(gear)", 
        expected: "Helmet", 
        solution: "append",
        xp: 7, 
        reward: "Icon: Plus Badge",
        type: 'list',
        visualType: 'append-drop'
    },
    { 
        id: 18, 
        title: "Reading Lists", 
        desc: "Loop through the `items` list. Replace the blank with the list name.", 
        codeTemplate: "items = ['Potion', 'Map']\nfor i in ___:\n    print(i)", 
        expected: "Map", 
        solution: "items",
        xp: 10, 
        reward: "Badge: List Navigator",
        type: 'list',
        visualType: 'list-highlight'
    }
];

// --- CHAPTER 2 QUESTS (MOCK MODE DATA) ---
export const CHAPTER_2_CHALLENGES = [
    {
        id: 101,
        title: "Abstraction Quest",
        codeTemplate: "class Hero:\n    def greet(self):\n        print(\"I am ready!\")\n\n# Create the hero\nmy_hero = Hero()\nmy_hero.___()",
        solution: "greet",
        expected: "ready",
        fullCode: "class Hero:\n    def greet(self):\n        print(\"I am ready!\")\n\n# Create the hero\nmy_hero = Hero()\nmy_hero.greet()"
    },
    {
        id: 103,
        title: "Inheritance Lab",
        codeTemplate: "class Hero:\n    def move(self):\n        print(\"Moving...\")\n\nclass Mage(___):\n    def cast(self):\n        print(\"Fireball!\")\n\np1 = Mage()\np1.move() # Inherited!\np1.cast()",
        solution: "Hero",
        expected: "Moving",
        fullCode: "class Hero:\n    def move(self):\n        print(\"Moving...\")\n\nclass Mage(Hero):\n    def cast(self):\n        print(\"Fireball!\")\n\np1 = Mage()\np1.move() # Inherited!\np1.cast()"
    }
];