'use strict';

module.exports = {
    /**
     * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
     * Make sure the first answer is the correct one. Set at least ANSWER_COUNT answers, any extras will be shuffled in.
     */

     /**

     Of ____ and ____, who has more followers on ____?
     On ____, who has more followers: ____ or ____?
     Who has more ____ followers, ____ or ____?
     Between ____ and ____, who has the most ____ followers?
     Does ____ or ____ have more followers ____?
     Does ____ or ____ have more ____ followers?

     */
     "QUESTION_TEMPLATES" : [
       "Of NAME_ONE and NAME_TWO, who has more followers on SOCIAL_NETWORK?",
       "On SOCIAL_NETWORK, who has more followers: NAME_ONE or NAME_TWO?",
       "Who has more SOCIAL_NETWORK followers, NAME_ONE or NAME_TWO?",
       "Between NAME_ONE and NAME_TWO, who has the most SOCIAL_NETWORK followers?",
       "Does NAME_ONE or NAME_TWO have more followers on SOCIAL_NETWORK?",
       "Does NAME_ONE or NAME_TWO have more SOCIAL_NETWORK followers?"
     ],
     "ACCOUNTS" : [
       {
         "name" : "Katy Perry",
         "Instagram" : { "Count" : "66,700,000", "Description" : "66.7 Million" },
         "Twitter" : { "Count" : "101,000,000", "Description" : "101 Million" }
       },
       {
         "name" : "Taylor Swift",
         "Instagram" : { "Count" : "102,000,000", "Description" : "102 Million" },
         "Twitter" : { "Count" : "85,400,000", "Description" : "85.4 Million" }
       },
       {
         "name" : "Selena Gomez",
         "Instagram" : { "Count" : "123,000,000", "Description" : "123 Million" },
         "Twitter" : { "Count" : "49,400,000", "Description" : "49.4 Million" }
       },
       {
         "name" : "Ariana Grande",
         "Instagram" : { "Count" : "111,000,000", "Description" : "111 Million" },
         "Twitter" : { "Count" : "49,100,000", "Description" : "49.1 Million" }
       },
       {
         "name" : "Justin Bieber",
         "Instagram" : { "Count" : "89,900,000", "Description" : "89.9 Million" },
         "Twitter" : { "Count" : "98,600,000", "Description" : "98.6 Million" }
       },
       {
         "name" : "Lady Gaga",
         "Instagram" : { "Count" : "24,800,000", "Description" : "24.8 Million" },
         "Twitter" : { "Count" : "67,700,000", "Description" : "67.7 Million" }
       },
       {
         "name" : "Rihanna",
         "Instagram" : { "Count" : "54,700,000", "Description" : "54.7 Million" },
         "Twitter" : { "Count" : "75,500,000", "Description" : "75.5 Million" }
       },
       {
         "name" : "Shakira",
         "Instagram" : { "Count" : "40,600,000", "Description" : "40.6 Million" },
         "Twitter" : { "Count" : "46,100,000", "Description" : "46.1 Million" }
       },
       {
         "name" : "Miley Cyrus",
         "Instagram" : { "Count" : "69,900,000", "Description" : "69.9 Million" },
         "Twitter" : { "Count" : "34,400,000", "Description" : "34.4 Million" }
       },
       {
         "name" : "Jennifer Lopez",
         "Instagram" : { "Count" : "67,700,000", "Description" : "67.7 Million" },
         "Twitter" : { "Count" : "41,900,000", "Description" : "41.9 Million" }
       },
       {
         "name" : "Lil Wayne",
         "Instagram" : { "Count" : "6,200,000", "Description" : "6.2 Million" },
         "Twitter" : { "Count" : "30,900,000", "Description" : "30.9 Million" }
       },
       {
         "name" : "Wiz Khalifa",
         "Instagram" : { "Count" : "16,700,000", "Description" : "16.7 Million" },
         "Twitter" : { "Count" : "30,700,000", "Description" : "30.7 Million" }
       },
       {
         "name" : "Drake",
         "Instagram" : { "Count" : "37,500,000", "Description" : "37.5 Million" },
         "Twitter" : { "Count" : "36,200,000", "Description" : "36.2 Million" }
       },
       {
         "name" : "Justin Timberlake",
         "Instagram" : { "Count" : "45,500,000", "Description" : "45.5 Million" },
         "Twitter" : { "Count" : "61,600,000", "Description" : "61.6 Million" }
       },
       {
         "name" : "Demi Lovato",
         "Instagram" : { "Count" : "59,500,000", "Description" : "59.5 Million" },
         "Twitter" : { "Count" : "45,800,000", "Description" : "45.8 Million" }
       },
       {
         "name" : "Adele",
         "Instagram" : { "Count" : "29,800,000", "Description" : "29.8 Million" },
         "Twitter" : { "Count" : "28,500,000", "Description" : "28.5 Million" }
       },
       {
         "name" : 
       }
       /**
       50 Cent, Calvin Harris, Kendrick Lamar, 2 Chainz, J Cole, Daft Punk, Pharrel, Chris Brown,
       Big Sean, Trey Songz, Beyonce, Nicki Minaj, The Weeknd, Chance the Rapper, John Legend, Bruno Mars,
       Tim Mcgraw, Carrie Underwood, Miranda Lambert, Garth Brooks, Blake Shelton, Gwen Stefani, Adam Levine,
       Kenny Chesney, Brad Paisley, Toby Keith, Alicia Keys, Sam Hunt, Luke Bryan, Keith Urban, Madonna,
       Kelly Clarkson, Britney Spears, John Mayer, ASAP Rocky, Jason Aldean, Eric Church, Pink, DJ Khaled,
       Ed Sheeran, Ellie Goulding, Shawn Mendes, Kylie Minogue, Future, David Guetta, Mac Miller, Mariah Carey,
       Macklemore, Iggy Azalea, Harry Styles, Zayn, Wale, Meek Mill, Frank Ocean, Lana Del Rey, Sia, Josh Groban,
       Diplo, Steve Aoki, Lil Yachty, Damian Marley, Ice Cube, Blink 182, Coldplay, Radiohead, Fall Out Boy,
       The Chainsmokers, Imagine Dragons, Skrillex, Pearl Jam, U2, Tyga, Paramore, Metallica, Michael Buble,
       Solange, One Direction,
       */
     ],
     "SOCIAL_NETWORKS" : [
       "Instagram", "Twitter"
     ],
     "QUESTIONS_EN_US" : [
         {
             "Reindeer have very thick coats, how many hairs per square inch do they have?": [
                 "13,000",
                 "1,200",
                 "5,000",
                 "700",
                 "1,000",
                 "120,000"
             ]
         },
         {
             "The 1964 classic Rudolph The Red Nosed Reindeer was filmed in. ": [
                 "Japan",
                 "United States",
                 "Finland",
                 "Germany",
                 "Canada",
                 "Norway",
                 "France"
             ]
         },
         {
             "Santas reindeer are cared for by one of the Christmas elves, what is his name?": [
                 "Wunorse Openslae",
                 "Alabaster Snowball",
                 "Bushy Evergreen",
                 "Pepper Minstix"
             ]
         },
         {
             "If all of Santas reindeer had antlers while pulling his Christmas sleigh, they would all be": [
                 "Girls",
                 "Boys",
                 "Girls and boys",
                 "No way to tell"
             ]
         },
         {
             "What do Reindeer eat?": [
                 "Lichen",
                 "Grasses",
                 "Leaves",
                 "Berries"
             ]
         },
         {
             "What of the following is not true?": [
                 "Caribou live on all continents",
                 "Both reindeer and Caribou are the same species",
                 "Caribou are bigger than reindeer",
                 "Reindeer live in Scandinavia and Russia"
             ]
         },
         {
             "In what year did Rudolph make his television debut?": [
                 "1964",
                 "1979",
                 "2000",
                 "1956"
             ]
         },
         {
             "Who was the voice of Rudolph in the 1964 classic?": [
                 "Billie Mae Richards",
                 "Burl Ives",
                 "Paul Soles",
                 "Lady Gaga"
             ]
         },
         {
             "In 1939 what retailer used the story of Rudolph the Red Nose Reindeer?": [
                 "Montgomery Ward",
                 "Sears",
                 "Macys",
                 "Kmart"
             ]
         },
         {
             "Santa\'s reindeer named Donner was originally named what?": [
                 "Dunder",
                 "Donny",
                 "Dweedle",
                 "Dreamy"
             ]
         },
         {
             "Who invented the story of Rudolph?": [
                 "Robert May",
                 "Johnny Marks",
                 "Santa",
                 "J.K. Rowling"
             ]
         },
         {
             "In what location will you not find reindeer?": [
                 "North Pole",
                 "Lapland",
                 "Korvatunturi mountain",
                 "Finland"
             ]
         },
         {
             "What Makes Santa\'s Reindeer Fly?": [
                 "Magical Reindeer Dust",
                 "Fusion",
                 "Amanita muscaria",
                 "Elves"
             ]
         },
         {
             "Including Rudolph, how many reindeer hooves are there?": [
                 "36",
                 "24",
                 "16",
                 "8"
             ]
         },
         {
             "Santa only has one female reindeer. Which one is it?": [
                 "Vixen",
                 "Clarice",
                 "Cupid",
                 "Cupid"
             ]
         },
         {
             "In the 1964 classic Rudolph The Red Nosed Reindeer, what was the snowman narrators name?": [
                 "Sam",
                 "Frosty",
                 "Burl",
                 "Snowy"
             ]
         },
         {
             "What was Rudolph\'s father\'s name?": [
                 "Donner",
                 "Dasher",
                 "Blixen",
                 "Comet"
             ]
         },
         {
             "In the 1964 movie, What was the name of the coach of the Reindeer Games?": [
                 "Comet",
                 "Blixen",
                 "Donner",
                 "Dasher"
             ]
         },
         {
             "In the 1964 movie, what is the name of the deer that Rudolph befriends at the reindeer games?": [
                 "Fireball",
                 "Clarice",
                 "Jumper",
                 "Vixen"
             ]
         },
         {
             "In the 1964 movie, How did Donner, Rudolph\'s father, try to hide Rudolph\'s nose?": [
                 "Black mud",
                 "Bag",
                 "Pillow case",
                 "Sock"
             ]
         },
         {
             "In the 1964 movie, what does the Misfit Elf want to be instead of a Santa Elf?": [
                 "Dentist",
                 "Reindeer",
                 "Toy maker",
                 "Candlestick maker"
             ]
         },
         {
             "In the 1964 movie,what was the Bumble\'s one weakness?": [
                 "Could not swim",
                 "Always hungry",
                 "Candy canes",
                 "Cross eyed"
             ]
         },
         {
             "In the 1964 movie, what is Yukon Cornelius really in search of?": [
                 "Peppermint",
                 "Gold",
                 "India",
                 "Polar Bears"
             ]
         },
         {
             "In the 1964 movie, why is the train on the Island of Misfit Toys?": [
                 "Square wheels",
                 "No Engine",
                 "Paint does not match",
                 "It does not toot"
             ]
         },
         {
             "In the 1964 movie, what is the name of the Jack in the Box?": [
                 "Charlie",
                 "Sam",
                 "Billy",
                 "Jack"
             ]
         },
         {
             "In the 1964 movie, why did Santa Claus almost cancel Christmas?": [
                 "Storm",
                 "No snow",
                 "No toys",
                 "The Reindeer were sick"
             ]
         },
         {
             "In the 1964 movie, what animal noise did the elf make to distract the Bumble?": [
                 "Oink",
                 "Growl",
                 "Bark",
                 "Meow"
             ]
         },
         {
             "In the 1964 movie, what is the name of the prospector?": [
                 "Yukon Cornelius",
                 "Slider Sam",
                 "Bumble",
                 "Jack"
             ]
         },
         {
             "How far do reindeer travel when they migrate?": [
                 "3000 miles",
                 "700 miles",
                 "500 miles",
                 "0 miles"
             ]
         },
         {
             "How fast can a reindeer run?": [
                 "48 miles per hour",
                 "17 miles per hour",
                 "19 miles per hour",
                 "14 miles per hour",
                 "52 miles per hour",
                 "41 miles per hour"
             ]
         }
     ]
};
