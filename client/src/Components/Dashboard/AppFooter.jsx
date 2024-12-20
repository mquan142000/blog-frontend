import { Typography } from 'antd'
import React from 'react'

export default function AppFooter() {
  return (
    <div className='AppFooter'>
      <Typography.Link href='tel: +123456789'>+123456789</Typography.Link>
      <Typography.Link href='https://www.google.com.vn' target={'_blank'}>Privacy Policy</Typography.Link>
      <Typography.Link href='https://www.google.com.vn' target={'_blank'}>Terms of Use</Typography.Link>
    </div>
  )
}
