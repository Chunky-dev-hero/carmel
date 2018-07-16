
it('subtitle should also differ', () => {
	cy.readFile('challenges/define-your-brand/challenge1/challenge.json').then (json => {
		let errMessage = ''
		errMessage = json[`task${5}ErrorMessage`]
		cy.readFile('chunks/intro/chunk.json').then( json => {
			const { routes } = json
			const { main } = routes
			const { cover } = main
			const { subtitle } = cover
			expect(subtitle, errMessage).to.not.equal('The Leading Tech Education Platform On Blockchain')
		})
	})
})