import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../state/action-creators'

export function Message(props) {
  const { infoMessage } = props
  return <div id="message">{ infoMessage }</div>
}

export default connect(st => st, actions)(Message);