const INPUT_FILE = "f8-challenges"
const challengesJson = require(`./${INPUT_FILE}.json`);
const fs = require('fs');

var extractedEssentialChallengeData = challengesJson.map(challenge => {
    const necessaryFields = {
        id: challenge.id,
        count: challenge.ideaCount,
        title: challenge.name
    }
    return necessaryFields
})

const proposalsCountObject = extractedEssentialChallengeData.reduce((prev, current) => {
    return {
        id: 0,
        title: "All",
        count: (prev.count + current.count)
    }
})
extractedEssentialChallengeData.unshift(proposalsCountObject)

fs.writeFileSync(`./${INPUT_FILE}.extracted.json`, JSON.stringify(extractedEssentialChallengeData))
