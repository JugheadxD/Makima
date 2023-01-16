const TelegramAPi = require('node-telegram-bot-api')
const {againOptions,gameOptions} = require ('./options')

const token = '5803620172:AAGqIGMZTq2npgmY1S4N1uIQqxuM_6h2fjw'
const bot = new TelegramAPi(token, {polling: true})



const chats = {}

const startGame = async (chatId) => {
    bot.sendMessage(chatId, `Мой пупсик захотел поиграть? Давай я загадаю число, а ты будешь отгадывать, если не угадаешь, то ты будешь наказан.`)

    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    setTimeout(() => {
       return bot.sendMessage(chatId, 'Я загадала, пора отгадывать)', gameOptions)
    }, 3000)
}

const startGameAgain = async (chatId) => {
    bot.sendMessage(chatId, `Серьезно? ты будешь пытаться дальше? ладно...`)

    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    setTimeout(() => {
       return bot.sendMessage(chatId, 'Ладно, так уж и быть, давай еще раз...', gameOptions)
    }, 3000)
}


bot.setMyCommands([
    {command: "/start", description: "Начальное приветствие"},
    {command: "/info", description: "Информация о вас"},
    {command: "/game", description: "Сыграть с хозяйкой в 'Угадай число' "},
])

const start = () => {
    bot.on("message", msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start') {
            bot.sendSticker(chatId, "https://d16u9y6cg00afk.cloudfront.net/makimathegod_by_fStikBot/4939254.512.webp")
            
            setTimeout(() => {
                bot.sendMessage(chatId, "Привет, я Макима. Мне платят деньги за то, что я убиваю демонов, ну вообщем-то работа такая.")
             }, 200)
    
            setTimeout(() => {
               return bot.sendMessage(chatId, "Ах, да... Надеюсь ты хорошо мне послужишь, теперь ты мой питомец.")
            }, 3000)
        } else if (text == "/info") {
            return bot.sendMessage(chatId, `Имя моего любимого питомца - ${msg.chat.first_name}.`)
        } else if (text == "/game") {
            return startGame(chatId);
        } else {
            return bot.sendMessage(chatId, 'Мой питомец должен говорить только то, что ему позволила Госпожа Макима.')
        }
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGameAgain(chatId);
        }
        if (data === chatId) {
            bot.sendMessage(chatId, `Какой ты у меня молодец)`)
        } else {
            bot.sendMessage(chatId, `Видимо наказание неизбежно... Ладно даю еще попытку.`, againOptions)
        }
    })
}
    
start();