import React, { useEffect } from 'react'
import QRCode from 'react-qr-code'

const QRCodeGenerator = () => {
  
  

  return (
    <div>
        <h1>QRCodeGenerator</h1>
        <QRCode value="hey" />
    </div>
  )
}

export default QRCodeGenerator