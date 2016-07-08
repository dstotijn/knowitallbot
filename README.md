# KnowItAllBot

KnowItAllBot is a chat bot that answers (most) of your questions, through the magic of the Wolfram Alpha REST API.
Integration with the [MessageBird Chat API](https://www.messagebird.com/en/chat-api) makes it possible to ask the bot questions via Facebook Messenger, WeChat, Telegram LINE and SMS.

## Demo

[Add the KnowItAllBot on Telegram](https://telegram.me/KnowItAllBot) and ask it anything.

## Requirements

* [Node.js](https://nodejs.org/)
* An access token from MessageBird for the Chat API. [Get in touch for beta access.](https://www.messagebird.com/en/chat-api#try)
* An API id from Wolfram Alpha. [Sign up for a free development account.](http://developer.wolframalpha.com/portal/apisignup.html)

## Installation & usage

Clone the repository:
```
$ git clone git@bitbucket.org:messagebird/knowitallbot.git
```

Change the working directory and install project dependencies:
```
$ cd knowitallbot
$ npm install
```

Set the environment variables for the access credentials:
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
