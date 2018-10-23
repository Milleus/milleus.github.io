---
layout: post
title: "Telegram bot recording chat group messages"
date: 2018-05-06
---

While having morning shower, I started to wonder how easy would it be to set up a Telegram bot to listen and store all chat group messages. Why I had this thought? I'm not sure, but I went ahead with the "collect first and think later" mentality just like any other data hoarder would.

My plan was simple..

1. Create new bot with obscure name called w47c11312
2. ???
3. PROFIT

And thus, my journey begins!

**9 AM** - while travelling on the bus, I started fiddling with Telegram @BotFather. I created a simple bot and set the necessary configurations, which is basically disabling privacy mode. Bots by default have privacy mode enabled, processing messages that start with a slash '/' (basically bot commands). Turning off privacy mode would mean that the bot would receive all messages like any other ordinary user.

**10 AM** - I hooked up my bot to Google Apps Script and Google Spreadsheets. When my bot receives any messages, it will send the messages to apps script, which then processes the messages and store whatever content of interest into a Google spreadsheet.

**11 AM** - I added the bot to multiple chat groups telling people that I'm "testing something" which technically I am, and then I sit back, relax, look at the data flowing into my spreadsheet, and contemplate on what to do with this new found power.

I could do a lot of simple statistical analysis to find out shit like who sends the most messages, what is the most used words, what is the trending topic over a period of time, but why think so small? So I started to wonder if I could do some kind of natural language processing on all the shit people say.

Some bigger ideas..

1. Can I detect if someone subconciously dislikes another person based on the words used when conversing with or about said person? or inversly detect if seomeone is secretly in love that person.. Oooo!!
2. Can I identify individual or group sentiments towards a certain topics like "team restructuring" or a "new HR policy"?
3. Since I have data over multiple groups, can I hook up individuals that are subconciously looking for help in domain X with others who do have knowledge in domain X?

I have strong suspicion that sentiment analysis may not result in anything useful, simply because work chat groups are rather neutral. But who knows, maybe the results might surprise me. Either way, I'll still need a lot more data so we'll see how it goes.

Also, quite surprised that disabling privacy mode of a bot doesn't inform any users. Individual privacy security flaw? grey area of user consent? Shrugs.

P.S. w 4 7 c 11 3 12 = w a t c h e r
