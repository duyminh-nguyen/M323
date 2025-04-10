const readline = require('readline');
const HighScore = require('./highscore');
const HighScoreAdmin = require('./highscoreAdmin');
const admin = new HighScoreAdmin();

// Datei laden
const FILEPATH = './data/highscores.csv';
//const FILEPATH = './test/sample-data.csv';
admin.loadFromFile(FILEPATH);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Hilfsfunktion, um Fragen zu stellen und Benutzereingaben als Promise zurückzugeben
function prompt(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function menu() {
  console.log('\n🎮 Sudoku HighScore List');
  console.log('1. Add HighScore');
  console.log('2. Show HighScores');
  console.log('3. Save & Exit');

  const choice = await prompt('Choose an option: ');

  if (choice === '1') {
    const name = await prompt('Player name: ');
    const date = await prompt('Date (YYYY-MM-DD): ');
    const level = await prompt('Level (Einfach, Mittel, Schwer, Genie): ');
    const time = parseInt(await prompt('Time in seconds: '));

    const result = admin.insert(new HighScore(name, date, level, time));
    console.log(result);
    return menu();

  } else if (choice === '2') {
    const level = await prompt('Level to show (Einfach, Mittel, Schwer, Genie): ');
    const scores = admin.getScores(level);
    console.log(`\n🏆 HighScores for ${level}:`);
    scores.forEach((s, i) => {
      console.log(`${i + 1}. ${s.name} | ${s.date} | ${s.time}s`);
    });
    return menu();

  } else if (choice === '3') {
    admin.saveToFile(FILEPATH);
    console.log('✅ Highscores saved. Goodbye!');
    rl.close();
  } else {
    console.log('❌ Invalid option');
    return menu();
  }
}

menu();