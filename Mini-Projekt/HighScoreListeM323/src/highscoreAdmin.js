const fs = require('fs');
const HighScore = require('./highscore');

class HighScoreAdmin {
  constructor() {
    this.levels = ['Einfach', 'Mittel', 'Schwer', 'Genie'];
    this.scores = {};
    this.levels.forEach(level => {
      this.scores[level] = [];
    });
  }

// Fügt einen neuen HighScore-Eintrag hinzu und gibt Rang oder Ablehnung zurück
  insert(score) {
    const list = [...this.scores[score.level], score];
    // Liste nach benötigter Zeit aufsteigend sortieren
    const sorted = list.sort((a, b) => a.time - b.time);

    // Nur die besten 10 Einträge behalten
    if (sorted.length > 10) {
      sorted.pop();
    }

    if (!sorted.includes(score)) {
      return `HighScore entries only better than ${score.time} seconds.`;
    }

    // Rang des neuen Eintrags berechnen und zurückgeben
    this.scores[score.level] = sorted;
    const rank = sorted.indexOf(score) + 1;
    return `Your rank: ${rank}!`;
  }

  getScores(level) {
    return [...this.scores[level]].sort((a, b) => a.time - b.time);
  }

  loadFromFile(filepath) {
    if (!fs.existsSync(filepath)) return;
    const lines = fs.readFileSync(filepath, 'utf-8').trim().split('\n');
    lines.forEach(line => {
      const score = HighScore.fromCSV(line);
      if (this.levels.includes(score.level)) {
        this.scores[score.level].push(score);
      }
    });
    this.levels.forEach(level => {
      this.scores[level] = this.scores[level].sort((a, b) => a.time - b.time).slice(0, 10);
    });
  }

  saveToFile(filepath) {
    const allScores = this.levels.flatMap(level => this.scores[level]);
    const content = allScores.map(score => score.toCSV()).join('\n');
    fs.writeFileSync(filepath, content);
  }
}

module.exports = HighScoreAdmin;