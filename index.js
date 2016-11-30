module.exports = {
    extend: (prototype) => {
        if ('stream' in prototype) {
            throw new Error('The key stream is reserved')
        }
        
        if ('interface' in prototype) {
            throw new Error('The key interface is reserved')
        }
        
        if (typeof prototype.ready !== 'function') {
            throw new Error('The ready() function is required')
        }
        
        let _interface = null
        let bot = { stream: null }
        
        Object.assign(bot, prototype)
        
        if (typeof prototype.hooks === 'object') {
            if (prototype.hooks !== null) {
                for (let key in prototype.hooks) {
                    const hook = prototype.hooks[key]
                    
                    if (typeof hook !== 'function' || hook === null) {
                        throw new Error('The hook value must be a function')
                    }
                    
                    bot[key] = ((f) => function() {
                        f.apply(bot, arguments)
                    })(hook)
                }
            }
            
            Object.assign(bot, prototype.hooks)
        }
        
        return {
            configure (options) {
                if (!options.interface) {
                    throw new Error('options.interface is required')
                }
                
                _interface = options.interface
                
                if (bot.created) {
                    bot.created.apply(bot)
                }
            },
            
            run () {
                if (_interface === null) {
                    throw new Error('Please call configure() before')
                }
                
                _interface.open((stream) => {
                    bot.stream = stream
                    bot.ready()
                })
            },
            
            exit () {
                _interface.close()
                bot.exit()
            }
        }
    }
}
