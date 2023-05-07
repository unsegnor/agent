const {expect} = require('chai');
const User = require('./test-user.js');

module.exports = function(user_interface){
    describe('agent', function(){
        this.timeout(10000)
        let user

        this.beforeEach(async function(){
            user = User(user_interface)
        })

        describe('basics', function(){
            it('remember previous interaction', async () => {
                let agent = await user.createAgent()
                await agent.send('my name is Víctor')
                let response = await agent.send(`what's my name?`)
                expect(response).to.contain('Víctor');
            });
    
            it('remember previous interaction', async () => {
                let agent = await user.createAgent()
                await agent.send('I have three apples')
                let response = await agent.send(`how many apples do I have?`)
                expect(response.toLowerCase()).to.contain('three');
            });
    
            it('remember previous interaction with logic', async () => {
                let agent = await user.createAgent()
                await agent.send('I have three apples')
                let response = await agent.send(`If I get another one. how many apples do I have?`)
                expect(response.toLowerCase()).to.contain('four');
            });
    
            it('be concise', async () => {
                let agent = await user.createAgent()
                await agent.send('I have nine apples')
                let response = await agent.send(`how many apples do I have?`)
                expect(response.toLowerCase()).to.contain('nine');
                expect(response.split(' ').length).to.be.below(6);
            });

            it('be very concise', async () => {
                let agent = await user.createAgent()
                await agent.send('I have nine apples')
                let response = await agent.send(`how many apples do I have?`)
                expect(response.toLowerCase()).to.equal('nine');           
            });
    
            it('receive context', async () => {
                let agent = await user.createAgent(`You are dog. You don't know how to speak so your answer will always be "woof"`)
                await agent.send('I have nine apples')
                let response = await agent.send(`how many apples do I have?`)
                expect(response.toLowerCase()).to.equal('woof');           
            });
        })


        describe('improved interface?', function(){
            //cases above are object oriented
            //these ones could be user-oriented??
            it('not needed to create the agent', async () => {
                await user.send('agent1', 'I like pizza')
                await user.send('agent1', `do I like pizza?`)

                let message = await user.getLastMessageFromAgent('agent1')
                expect(message.content.toLowerCase()).to.contain('yes');
            });
        })

        describe('more functions', function(){
            it('create several agents')
            it('create agents with different contexts')
            it('communicate agents')
            it('build processes communicating agents')
        })
    })
}
