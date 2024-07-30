import { h, render } from "vue"
import CopyTag from "./CopyTag.vue"

console.log("this is content ts file")
// console.log(`output->document`, document)
// Array.from(menuItems).forEach(it => {
//   console.log(it)
//  })


setTimeout(() => {
  console.log("vue-chrome扩展已载入")
  const dom = document.querySelector(
    "#app > div > section > aside > div > div > ul"
  )
  const menuItems = dom?.childNodes
  console.log(`output->menuItems`, menuItems)
  menuItems?.forEach((item) => {
    console.log(`output->item`, item)
    const div = document.createElement("div")
    const CopyTagDOM = h(CopyTag)
    render(CopyTagDOM, div)
    item.appendChild(div)
  })
}, 2000)