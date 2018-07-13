import { projectPath } from '../../constants';


describe('Testing first challenge', () => {
	it('chunky.json logo should be different', () => {
		cy.readFile('chunky.json').then( json => {
			const { theme } = json
			const { logoImage, logoLightImage } = theme
			expect(logoImage).to.not.equal('carmel-logo-white.png')
			expect(logoLightImage).to.not.equal('carmel-logo.png')
		})
	})
	it('navigation color should be changed', () => {
		cy.readFile('chunky.json').then( json => {
			const { theme } = json
			const { navigationColor } = theme
			expect(navigationColor).to.not.equal('#FFFFFF')
		})
	})
})