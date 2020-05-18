import React from 'react'
import { connect } from 'react-redux' 

const Notification = (props) => {
  const notificationMsg = props.notification.message
  const notificationStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const style = notificationMsg === '' ? {} : notificationStyle

  return (
    <div style={style}>
      { notificationMsg }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)