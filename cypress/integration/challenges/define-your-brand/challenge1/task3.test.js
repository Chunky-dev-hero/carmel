
it('change the title to a new one', () => {
	cy.readFile('challenges/define-your-brand/challenge1/challenge.json').then (json => {
		let errMessage = ''
		errMessage = json[`task${3}ErrorMessage`]
		cy.readFile('chunks/intro/chunk.json').then( json => {
			const { routes } = json
			const { main } = routes
			const { cover } = main
			const { title } = cover
			expect(title, errMessage).to.not.equal('The Fastest Way To Future-Proof Your Career.')
		})
	})
})