
it('chunky.json logo should be different', () => {
	cy.readFile('challenges/define-your-brand/challenge1/challenge.json').then (json => {
		let errMessage = ''
		errMessage = json[`task${1}ErrorMessage`]
		cy.readFile('chunky.json').then( json => {
			const { theme } = json
			const { logoImage, logoLightImage } = theme
			expect(logoImage, errMessage).to.not.equal('carmel-logo-white.png')
			expect(logoLightImage, errMessage).to.not.equal('carmel-logo.png')
		})
	})
})