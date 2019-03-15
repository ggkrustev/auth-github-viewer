import 'mocha'
import { expect } from 'chai'
import { HomeController } from '../../src/controllers/home.controller'

describe('HomeController', () => {
    it('should give back `Home sweet home`', () => {
        const controller = new HomeController()

        expect(controller.get()).to.equal('Home sweet home')
    })
})
