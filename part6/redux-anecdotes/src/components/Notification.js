import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const notificationStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const style = notification === '' ? {} : notificationStyle

  return (
    <div style={style}>
      { notification }
    </div>
  )
}

export default Notification