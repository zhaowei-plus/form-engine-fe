import string from './input'
import textarea from './textarea'
import number from './number'
import password from './password'
import radio from './radio'
import checkbox from './checkbox'
import select from './select'
import date from './date'
import time from './time'
import daterange from './daterange'
import rating from './rating'
import color from './color'
import boolean from './boolean'
import range from './range'
import upload from './upload'
import js from './js'
import xml from './xml'
import cascader from './cascader'

import layout from './layout'
import card from './card'
import block from './block'
import grid from './grid'
import textbox from './textbox' // TODO
import table from './table' // TODO
import link from './link' // TODO
import carousel from './carousel' // TODO

import btn from './btn'
import submit from './submit'
import reset from './reset'
import text from './text'
import img from './img'
import html from './html'

import position from './position'
import tree from './tree'
import map from './map'

export const fieldsMap = {
  string,
  textarea,
  number,
  password,
  radio,
  checkbox,
  select,
  date,
  time,
  daterange,
  color,
  boolean,
  range,
  upload,
  rating,
  js,
  xml,
  cascader,
  // tree, // TODO
  // map, // TODO

  layout,
  card,
  block,
  grid,
  textbox,
  // slot, // TODO
  table, // TODO
  link,
  carousel,
  // object // TODO
  // array // TODO

  btn,
  submit,
  reset,
  text,
  img,
  html,
  position,
  map

}

// const categoryEnum: any = {
//   input: '输入',
//   block: '区块',
//   container: '容器'
// }
let arr: any = [
  {
    group: 'container',
    groupName: '布局容器',
    children: []
  },
  {
    group: 'input',
    groupName: '信息输入',
    children: []
  },
  {
    group: 'select',
    groupName: '选择器',
    children: []
  },
  {
    group: 'view',
    groupName: '数据展示',
    children: []
  },
  {
    group: 'file',
    groupName: '附件',
    children: []
  },
  {
    group: 'act',
    groupName: '操作',
    children: []
  },
  {
    group: 'other',
    groupName: '其他',
    children: []
  }
]

Object.values(fieldsMap).forEach((config) => {
  if (config.available) {
    let group: any = arr.find((item: any) => item.group === config.group)
    if (group) {
      const _obj: any = {
        title: config.title,
        name: config.name,
        icon: config.icon,
        category: config.category,
        parent: []
      }
      if (config.category === block.category) {
        _obj.children = []
      }
      group.children.push(_obj)
    }
  }
})
export const fieldsArray = arr
