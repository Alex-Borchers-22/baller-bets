/**
 * Service to get and store all lines on a set interval
 */
const axios = require("axios");
const { ODDS_API_KEY } = process.env;
const db = require("../configs/db");

// Get most recent lines
async function getRecentLine() {
  try {
    // Get most recent lines
    const query = `SELECT * FROM daily_lines ORDER BY time_entered DESC LIMIT 1`;
    const results = await db.executeQuery(query);

    // If no lines, report error
    if (!results.length) {
      throw new Error("No lines found");
    }

    // Parse lines
    const lines = JSON.parse(results[0].json_lines);
    return lines;
  } catch (err) {
    console.error(err);
  }
}

// Check if new line is required (has line been updated in the last 24 hours)
async function readyForUpdate() {
  try {
    // Get most recent lines
    const recentLine = await getRecentLine();

    // Get most recent time entered
    const timeEntered = new Date(recentLine.time_entered).getTime();
    const currentTime = new Date().getTime();

    // If time entered is more than 24 hours ago, return true
    if (currentTime - timeEntered > 86400000) {
      return true;
    }

    // Otherwise, return false
    return false;
  } catch (err) {
    console.error(err);
  }
}

// Get all sports for a given day
async function getSports() {
  try {
    let res = await axios.get("https://api.the-odds-api.com/v4/sports", {
      params: {
        apiKey: "5b55b5b1ef1f66b2766429c766a9660b",
      },
    });
    // Get array of keys
    const keys = res.data.map((sport) => sport.key);
    console.log(keys);

    // Set keys that we're interested in at this time
    const searchKeys = ["americanfootball_ncaaf", "americanfootball_nfl"];
    // const match = keys.find((key) => searchKeys.includes(key));
    return searchKeys;

    // console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}

// Get all lines
async function getApiLines(sports = ["upcoming"]) {
  try {
    // Initialize lines object
    let lines = [];

    // Get all lines
    console.log("Getting lines for", sports);

    // Get lines for each sport
    for (let sport of sports) {
      const response = await axios.get(
        `https://api.the-odds-api.com/v4/sports/${sport}/odds`,
        {
          params: {
            apiKey: "5b55b5b1ef1f66b2766429c766a9660b",
            regions: "us",
            markets: "spreads",
            oddsFormat: "american",
            dateFormat: "iso",
          },
        }
      );

      // Check usage
      console.log(
        "Remaining requests",
        response.headers["x-requests-remaining"]
      );
      console.log("Used requests", response.headers["x-requests-used"]);

      // If no data, continue
      if (!response.data) {
        continue;
      }
      lines = [...lines, ...response.data];
    }

    // Return lines
    return lines;
  } catch (err) {
    console.error(err);
  }
}

// Handles storing most recent lines
async function updateLines() {
  try {
    // Check if ready for update
    const ready = await readyForUpdate();
    // const ready = true;
    console.log("Ready for update:", ready);
    if (!ready) {
      return;
    }

    // Get all lines
    // const sports = await getSports();
    const sports = ["americanfootball_ncaaf", "americanfootball_nfl"];
    const lines = await getApiLines(sports);
    // console.log("Lines:", lines);

    // If no lines, report error
    if (!lines) {
      throw new Error("No lines found");
    }

    // Store as a JSON string
    const linesString = JSON.stringify(lines);
    const query = `INSERT INTO daily_lines (json_lines, time_entered) 
                VALUES (?, NOW())`;
    await db.executeQuery(query, [linesString]);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getRecentLine,
  readyForUpdate,
  getSports,
  getApiLines,
  updateLines,
};

// An api key is emailed to you when you sign up to a plan
// Get a free API key at https://api.the-odds-api.com/
// const apiKey = 'YOUR_API_KEY'

// const sportKey = 'upcoming' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports

// const regions = 'us' // uk | us | eu | au. Multiple can be specified if comma delimited

// const markets = 'h2h' // h2h | spreads | totals. Multiple can be specified if comma delimited

// const oddsFormat = 'decimal' // decimal | american

// const dateFormat = 'iso' // iso | unix

// /*
//     First get a list of in-season sports
//         the sport 'key' from the response can be used to get odds in the next request

// */
// axios.get('https://api.the-odds-api.com/v4/sports', {
//     params: {
//         apiKey
//     }
// })
// .then(response => {
//     console.log(response.data)
// })
// .catch(error => {
//     console.log('Error status', error.response.status)
//     console.log(error.response.data)
// })

// /*
//     Now get a list of live & upcoming games for the sport you want, along with odds for different bookmakers
//     This will deduct from the usage quota
//     The usage quota cost = [number of markets specified] x [number of regions specified]
//     For examples of usage quota costs, see https://the-odds-api.com/liveapi/guides/v4/#usage-quota-costs

// */
// axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
//     params: {
//         apiKey,
//         regions,
//         markets,
//         oddsFormat,
//         dateFormat,
//     }
// })
// .then(response => {
//     // response.data.data contains a list of live and
//     //   upcoming events and odds for different bookmakers.
//     // Events are ordered by start time (live events are first)
//     console.log(JSON.stringify(response.data))

//     // Check your usage
//     console.log('Remaining requests',response.headers['x-requests-remaining'])
//     console.log('Used requests',response.headers['x-requests-used'])

// })
// .catch(error => {
//     console.log('Error status', error.response.status)
//     console.log(error.response.data)
// })
