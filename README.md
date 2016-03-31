# KnowItAllBot

KnowItAllBot is a chat bot that answers (most) of your questions, through the magic of the Wolfram Alpha REST API.
Integration with the [MessageBird Chat API](https://www.messagebird.com/en/chat-api) makes it possible to ask the bot questions via WeChat, SMS, Telegram and WhatsApp.

## Demo

[Add the KnowItAllBot on Telegram](https://telegram.me/KnowItAllBot) or sms your question to +31612345678.

## Requirements

* [Node.js](https://nodejs.org/)
* An access token from MessageBird for the Chat API. [Get in touch for beta access](https://www.messagebird.com/en/chat-api#try).
* An API id from Wolfram Alpha. [Sign up for a free development account](http://developer.wolframalpha.com/portal/apisignup.html).

## Installation & usage

Clone the repository:
```
$ git clone git@github.com:dstotijn/knowitallbot.git
```

Change the working directory and install project dependencies
```
$ cd knowitallbot
$ npm install
```

Set the environment variables for the MessageBird and WolframAlpha access tokens:
```
$ export CHAT_API_ACCESS_TOKEN="your-access-token-goes-here"
$ export WOLFRAM_ALPHA_APP_ID="your-app-id-goes-here"
```

Run the Node application:
```
$ node .
```

## License

[MIT](/LICENSE.md)
