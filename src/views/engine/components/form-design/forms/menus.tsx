import React from 'react'
import Menu from './menu'

export default ({ menus }: any) => {
  return (
    <div className="categories">
      {
        menus.map(({ groupName, children }: any) => {
          return (
            <div className="category">
              <span className="title">{groupName}</span>
              <div className="menus">
                {
                  children.map((menu: any) => (
                    <Menu menu={menu} />
                  ))
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
