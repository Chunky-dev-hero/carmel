
it('navigation color should be changed', () => {
	cy.readFile('challenges/define-your-brand/challenge1/challenge.json').then (json => {
		let errMessage = ''
		errMessage = json[`task${2}ErrorMessage`]
		cy.readFile('chunky.json').then( json => {
			const { theme } = json
			const { navigationColor } = theme
			expect(navigationColor, errMessage).to.not.equal('#FFFFFF')
		})
	})
})