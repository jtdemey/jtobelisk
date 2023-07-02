# Imposter
Imposter is a game played in your web browser designed to be played with 4-10 people in the same room.
Use deception, subtlety, and improvisation to identify the Imposter among you.
Imposter is heavily inspired by Spyfall (https://spyfall.crabhat.com/).

### Rules
Each round, you are either a bystander or the sole Imposter.
The bystanders are given a scenario, and a role.
The Imposter lacks this information and needs to deduce the scenario and stall until time runs out.

### Gameplay
The player designated as first asks someone else a question about their role in the scenario. It's important to be vague enough so as not to tip off the Imposter.
Then, the player who answered asks someone else a question, and so on.
At any time, anyone can accuse another player of being the Imposter. This will start a vote.
The game ends when time runs out a vote to accuse someone succeeds.

### How It Works
I started Imposter with the intent to design a real-time web application that supports multiple clients and has very low latency.
Imposter's frontend is made with React using Redux for state management and sagas for handling asynchronous actions.
The backend uses the WebSocket protocol for game events and Node.js for managing and storing game data.
