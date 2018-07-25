import React from 'react'
import { Screen } from 'react-dom-chunky'

import SearchBar from '../components/searchBar'

export default class MainIntroScreen extends Screen {
  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  get renderSearchBar () {
    return (
      <SearchBar>

      </SearchBar>
    )
  }

  components () {
    return super.components()
          .concat([this.renderSearchBar])
  }
}
