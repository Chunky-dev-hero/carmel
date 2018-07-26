import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import { LinearProgress } from 'rmwc/LinearProgress'
import {
  Card,
  CardMedia,
  CardMediaItem,
  CardPrimary,
  CardTitle,
  CardActions,
  CardActionButtons,
  CardAction,
  CardPrimaryAction,
  CardActionIcons,
  CardSubtitle,
  CardSupportingText,
  CardHorizontalBlock
} from 'rmwc/Card'
import { Typography } from 'rmwc/Typography'
import { ListDivider } from 'rmwc/List'

export default class MainChallengesScreen extends Screen {
  constructor(props) {
    super(props)
    this.state = { ...this.state, loading: true }
  }

  componentDidMount() {
    super.componentDidMount()
    this.importRemoteData(this.props.index).then(challenges => {
      const newChallenges = challenges.map(challenge => {
        return Object.assign({},challenge,{
          actionTitle:"See more details",
          action:{handler:`local://challenges/${challenge.path}`}
        })
      })
      this.setState({
        challenges:newChallenges,
        loading: false
      })
    })
  }

  renderContent() {
    if (this.state.loading) {
      return <Components.Loading message='Loading Your challenges ...' />
    }

    return (
      <Components.Collection
        id="challenges"
        type="challenges"
        categories={this.state.challenges}
      />
    )
  }

  components() {
    return [this.renderContent()]
  }
}
