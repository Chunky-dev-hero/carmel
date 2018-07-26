import React from 'react'
import { Screen, Components } from 'react-dom-chunky'

export default class ChallengeScreen extends Screen {

  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  components () {
    const variant = this._variant || {}
    return [
      <Components.Article {...variant.content} />
    ]
  }
}
