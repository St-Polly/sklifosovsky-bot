const { VK } = require('vk-io')
const config = require('./config')
const cheerio = require('cheerio')
const request = require('request')
const { HearManager } = require('@vk-io/hear')
const vk = new VK({
  token: config.TOKEN,
  pollingGroupId: config.poolingGroupID
})

const hearManager = new HearManager()

vk.updates.on('message_new', hearManager.middleware)

require('http').createServer().listen(process.env.PORT || 5000).on('request', function (res) {
  res.end('')
})

hearManager.hear('/start', async (context) => {
  await context.send(`
📌 Мои команды 📌
/дз - отправляет все д/з большим списком

Возможно список команд увеличится, но не факт)        
Сделал бота @sashafromlibertalia. Зовите его на свои пьянки ;)
`)
})

request(config.homeworkParserURL, async function (err, res, body) {
  if (err) throw err
  const $ = cheerio.load(body)

  const ANATOMY_H = $('#LC5').text()
  const VAR_ANATOMY_H = $('#LC8').text()
  const LATIN_H = $('#LC11').text()
  const CHEMISTRY_H = $('#LC14').text()
  const STUDY_PRACTICE_H = $('#LC17').text()
  const HISTORY_H = $('#LC20').text()
  const PSYCHO_H = $('#LC23').text()
  const ECONOMY_H = $('#LC26').text()
  const MED_COMPSCIENCE_H = $('#LC29').text()
  const BIO_H = $('#LC32').text()
  const ADAPTATION_H = $('#LC35').text()
  const ENGLISH_H = $('#LC38').text()
  const PHYSICS_H = $('#LC41').text()
  const MATHS_H = $('#LC44').text()

  const ANATOMY_V = $('#LC6').text()
  const VAR_ANATOMY_V = $('#LC9').text()
  const LATIN_V = $('#LC12').text()
  const CHEMISTRY_V = $('#LC15').text()
  const STUDY_PRACTICE_V = $('#LC18').text()
  const HISTORY_V = $('#LC21').text()
  const PSYCHO_V = $('#LC24').text()
  const ECONOMY_V = $('#LC27').text()
  const MED_COMPSCIENCE_V = $('#LC30').text()
  const BIO_V = $('#LC33').text()
  const ADAPTATION_V = $('#LC36').text()
  const ENGLISH_V = $('#LC39').text()
  const PHYSICS_V = $('#LC42').text()
  const MATHS_V = $('#LC45').text()

  const line = $('#LC7').text()

  const list = new Array(14)
  list[0] = ANATOMY_H + ANATOMY_V + `\n${line}`
  list[1] = VAR_ANATOMY_H + VAR_ANATOMY_V + `\n${line}`
  list[2] = LATIN_H + LATIN_V + `\n${line}`
  list[3] = CHEMISTRY_H + CHEMISTRY_V + `\n${line}`
  list[4] = STUDY_PRACTICE_H + STUDY_PRACTICE_V + `\n${line}`
  list[5] = HISTORY_H + HISTORY_V + `\n${line}`
  list[6] = PSYCHO_H + PSYCHO_V + `\n${line}`
  list[7] = ECONOMY_H + ECONOMY_V + `\n${line}`
  list[8] = MED_COMPSCIENCE_H + MED_COMPSCIENCE_V + `\n${line}`
  list[9] = BIO_H + BIO_V + `\n${line}`
  list[10] = ADAPTATION_H + ADAPTATION_V + `\n${line}`
  list[11] = ENGLISH_H + ENGLISH_V + `\n${line}`
  list[12] = PHYSICS_H + PHYSICS_V + `\n${line}`
  list[13] = MATHS_H + MATHS_V + `\n${line}`

  hearManager.hear('/дз', async (context) => {
    await context.send(list.join('\n'))
  })
})

vk.updates.start().catch(console.error)
