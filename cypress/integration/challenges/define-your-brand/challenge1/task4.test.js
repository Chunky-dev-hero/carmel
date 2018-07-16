
it('the image should differ from the initial one', () => {
	cy.readFile('challenges/define-your-brand/challenge1/challenge.json').then (json => {
		let errMessage = ''
		errMessage = json[`task${4}ErrorMessage`]
		cy.readFile('chunks/intro/chunk.json').then( json => {
			const { routes } = json
			const { main } = routes
			const { cover } = main
			const { image } = cover
			expect(image, errMessage).to.not.equal('chris.png')
		})
	})
})