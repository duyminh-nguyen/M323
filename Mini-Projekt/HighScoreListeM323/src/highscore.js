class HighScore {
    constructor(name, date, level, time) {
      this.name = name;
      this.date = date;
      this.level = level;
      this.time = time;
    }
  
    // Wandelt ein HighScore-Objekt in eine CSV-Zeile um :)
    toCSV() {
      return `${this.name},${this.date},${this.level},${this.time}`;
    }
  
    // Erzeugt ein HighScore-Objekt aus einer CSV-Zeile
    static fromCSV(csvLine) {
      const [name, date, level, time] = csvLine.split(',');
      return new HighScore(name, date, level, parseInt(time));
    }
  }
  
  module.exports = HighScore;