import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import NewWorkspaceForm from '../components/newWorkspace'
import { Typography } from 'rmwc/Typography'
import { Card, CardActions, CardMedia, CardActionButtons } from 'rmwc/Card'
import { Button, ButtonIcon } from 'rmwc/Button'
import { Icon } from 'antd'
import { Data } from 'react-chunky'
import Shell from '../components/shell'
import chokidar from 'chokidar'

export default class WorkspaceScreen extends Screen {
  constructor (props) {
    super(props)
    this._shell = new Shell()
    this.state = { ...this.state, loadingWorkspace: true, create: false }
    this._onCancel = this.onCancel.bind(this)
    this._onStart = this.onStart.bind(this)
    this._onSwitch = this.onSwitch.bind(this)
    this._onCreate = this.onCreate.bind(this)
    this._homeDir = this._calculateHomeDir()
  }

  componentDidMount () {
    super.componentDidMount()

    this.loadWorkspace()
  }

  get shell () {
    return this._shell
  }

  get homeDir () {
    return this._homeDir
  }

  _calculateHomeDir () {
    if (os.userInfo && os.userInfo().homedir) {
      return os.userInfo().homedir
    }

    if (os.homedir) {
      return os.homedir()
    }

    return process.env.HOME
  }

  get workspaceContext () {
    return Data.Cache.retrieveCachedItem('_carmel_context')
  }

  get watcher () {
    return this._watcher
  }

  onStart () {
    if (this.state.started) {
      this.stopProduct()
      return
    }

    this.startProduct(this.state.workspace)
  }

  onSwitch () {
  }

  onCancel () {
    // this.setState({ create: false })
  }

  loadProduct (workspace) {
    try {
      var product = path.resolve(this.homeDir, '.carmel', 'products', workspace.id, 'chunky.json')
      product = JSON.parse(fs.readFileSync(product, 'utf8'))
      this.setState({ workspace, product, timestamp: `${Date.now()}`, loadingWorkspace: false, create: false })
    } catch (e) {
      console.log(e)
    }
  }

  refreshProduct () {
    const root = this.rootProductDir
  }

  get rootProductDir () {
    if (!this.state.workspace) {
      return
    }

    return path.resolve(this.homeDir, '.carmel', 'products', this.state.workspace.id)
  }

  get productAssetsDir () {
    if (!this.state.workspace) {
      return
    }

    return path.resolve(this.rootProductDir, 'assets')
  }

  productAsset (name) {
    if (!this.state.workspace) {
      return
    }

    return path.resolve(this.productAssetsDir, name)
  }

  productFileAdded (file) {
    const root = this.rootProductDir
    const relativePath = file.substring(root.length + 1)
    const type = path.dirname(relativePath)
    this.setState({ timestamp: `${Date.now()}`})
  }

  productFileChanged (file) {
    const root = this.rootProductDir
    const relativePath = file.substring(root.length + 1)
    const type = path.dirname(relativePath)
    this.setState({ timestamp: `${Date.now()}`})
  }

  productFileRemoved (file) {
    const root = this.rootProductDir
    const relativePath = file.substring(root.length + 1)
    const type = path.dirname(relativePath)
    this.setState({ timestamp: `${Date.now()}` })
  }

  stopProduct () {
    this.setState({ stopping: true })
    setTimeout(() => {
      this.shell.exec('stopProduct', { type: 'web', id: this.state.workspace.id }, ({ log }) => {
        this.setState({ log })
      })
      .then((data) => {
        this.setState({ started: false, stopping: false })
        this.watcher && this.watcher.close()
      })
      .catch(error => {
        this.setState({ error })
      })
    }, 500)
  }

  startProduct (workspace) {
    this.setState({ starting: true })
    setTimeout(() => {
      this.shell.exec('startProduct', { type: 'web', id: workspace.id }, ({ log }) => {
        this.setState({ log })
      })
      .then((data) => {
        this.setState({ started: true, starting: false })
        this._watcher = chokidar.watch(path.resolve(this.homeDir, '.carmel', 'products', workspace.id), { persistent: true })
                                .on('add', file => this.productFileChanged(file))
                                .on('change', file => this.productFileChanged(file))
                                .on('unlink', file => this.productFileRemoved(file))
      })
      .catch(error => {
        this.setState({ error })
      })
    }, 500)
  }

  onCreate (workspace) {
    try {
      const context = Object.assign({}, this.workspaceContext, { workspace })
      Data.Cache.cacheItem('_carmel_context', context).then(() => {
        this.loadProduct(workspace)
        this.startProduct(workspace)
      })
    } catch (e) {
      console.log(e)
    }
  }

  loadWorkspace () {
    this.setState({ loadingWorkspace: true, create: false })
    this.workspaceContext
        .then((context) => {
          if (!context || !context.workspace) {
            this.setState({ loadingWorkspace: false, create: true })
            return
          }

          this.loadProduct(context.workspace)
          this.startProduct(context.workspace)
        })
        .catch(() => {
          this.setState({ loadingWorkspace: false, create: true })
        })
  }

  renderMenu () {
    return [<Button
      raised
      key='add'
      onClick={this._onSwitch}
      >
      <ButtonIcon use='repeat' />
        Switch Workspace
      </Button>]
  }

  renderProductCover () {
    const cover = this.productAsset('hero.jpg')

    if (!cover) {
      return <div />
    }

    return <CardMedia
      sixteenByNine
      style={{
        backgroundImage: `url(${cover})`
      }} />
  }
  renderActions () {
    if (this.state.stopping || this.state.starting) {
      return <Components.Loading message={`${this.state.starting ? 'Starting' : 'Stopping'}`} />
    }
    return [<Button
      key='start'
      raised
      style={{ backgroundColor: (this.state.started ? '#f44336' : '#4CAF50') }}
      onClick={this._onStart}>
      <ButtonIcon use={`${this.state.started ? 'pause' : 'play'}_circle_outline`} />
      { this.state.started ? 'Stop' : 'Start' }
    </Button>]
  }
  renderWorkspace (width, padding) {
    if (!this.state.workspace || !this.state.product) {
      return <div />
    }

    return <div style={{
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      width: '80vw'
    }}>
      <div style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: '0px',
        width: '100%',
        marginBottom: '20px'
      }}>
        { this.renderMenu() }
      </div>

      <Card style={{ width, margin: '0px', padding }}>
        { this.renderProductCover() }

        <div style={{ padding: '4px', textAlign: 'center', marginBottom: '20px' }}>
          <Icon type='phonelink' style={{
            fontSize: '64px',
            padding: '10px'
          }} />
          <Typography use='title' tag='h2'>
            { this.state.product.info.title }
          </Typography>
        </div>

        <CardActions style={{ justifyContent: 'center', margin: '20px' }}>
          <CardActionButtons>
            { this.renderActions() }
          </CardActionButtons>
        </CardActions>
      </Card>
    </div>
  }

  renderMainContent () {
    if (this.state.create) {
      return <NewWorkspaceForm
        cancel
        onCancel={this._onCancel}
        onCreate={this._onCreate} />
    }

    if (this.state.loadingWorkspace) {
      return <Components.Loading message='Loading Your Carmel Learning Workspace ...' />
    }

    const width = '400px'
    const padding = this.props.isSmallScreen ? '2px' : '5px'
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          padding: '30px',
          margin: '40px',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        { this.renderWorkspace(width, padding)}
      </div>
    )
  }

  components () {
    return [this.renderMainContent()]
  }
}
