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
    console.log("blabal",this.variants)
    return [
      <Components.Article {...this.variant.content} />
    ]
  }
}
