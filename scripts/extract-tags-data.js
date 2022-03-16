const INPUT_FILE = "proposals"
const challengesJson = require(`./${INPUT_FILE}.json`);
const fs = require('fs');
var set = new Set()
challengesJson.forEach(proposal => {
    proposal.tags.forEach(t => set.add(t))
})

fs.writeFileSync(`./scripts/tags.json`, JSON.stringify([...set]))
