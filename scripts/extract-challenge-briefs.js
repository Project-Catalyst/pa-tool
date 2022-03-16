const { transform } = require('./bin/helper')
const { Value } = require('@gitbook/slate')
const fs = require('fs')
const challengesJson = require("./f8-challenges.json")

var challengeBriefs = []
challengesJson.forEach(challenge => {
    transform(document => {
        const state = Value.create({ document });
        const raw = state.toJS();

        var result = {}
        var currentTitle = ""
        raw.document.nodes.forEach(x => {
            const maybeRootText = x.nodes?.[0]?.leaves?.[0]?.text
            const maybeRootType = x.nodes?.[0]?.leaves?.[0]?.marks?.[0]?.type
            if (maybeRootText) {
                if (maybeRootType === 'BOLD') {
                    result[maybeRootText] = {
                        description: [],
                        list: []
                    }
                    currentTitle = maybeRootText
                } else {
                    if (!currentTitle) {
                        currentTitle = "NO_TITLE"
                        result[currentTitle] = {
                            description: [],
                            list: []
                        }
                    }
                    result[currentTitle].description.push(maybeRootText)
                }
            }
            if (x.type === 'unordered_list') {
                x.nodes?.forEach(listItem => {
                    result[currentTitle].list.push(listItem?.nodes?.[0]?.nodes[0]?.leaves?.[0]?.text)
                })
            }
        })

        // result.challengeName = challenge.name
        // result.challengeId = challenge.id
        challengeBriefs.push(result)

        // Object.keys(result).map(key => {
        //     console.log(result[key].list)
        // })
        var fileJson = {
            text: challenge.description,
            tabs: Object.keys(result).map(key => {
                return {
                    title: key,
                    content: [result[key].description, result[key].list.join("\n\t")].join("\n\n").trim("\n\n")
                }
            })
        }
        fs.writeFileSync(`./briefs/${challenge.id}.json`, JSON.stringify(fileJson))

    }, challenge.summary);

})
