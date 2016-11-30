# ibot



## Install

```sh
npm install --save ibot
```

## Usage

The `bot.js` module:

```js
const ibot = require('ibot')

module.exports = ibot.extend({
    created () {
        console.log('created')
    },
    
    ready () {
        this.hello()
    },
    
    exit () {
        this.stream.println('See you!')
    },
    
    hooks: {
        hello () {
            this.stream.println('Hello!')
            this.getUserName()
        },
        getUserName () {
            this.stream.ask('What is your name?', /\w+/)
                .then((anwser) => this.sayHelloUser(anwser))
                .catch((e) => {
                    this.stream.println('Sorry, I didn\'t catch what you write')
                    this.getUserName()
                })
        },
        sayHelloUser (username) {
            this.stream.println(`Nice to meet you ${username}`)
        }
    }
})
```

Then use an `ibot interface` to run your bot:
- [ibot-interface-console](https://github.com/demsking/ibot-interface-console)
- [ibot-interface-socket](https://github.com/demsking/ibot-interface-socket)
- [ibot-interface-socket.io](https://github.com/demsking/ibot-interface-socket.io)

## License

Under the MIT license. See [LICENSE](https://github.com/demsking/bot-interface-socket.io/blob/master/LICENSE) file for more details.
