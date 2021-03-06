import random from "lodash/random"
import range from "lodash/range"
import uniq from "lodash/uniq"

import { useState } from "react"
import './App.css'

const beingTable = [
  "โ๐๐ฐ๐บ๐๐ฆ๐ฃ๐ฆด๐๐งน๐ชฒ๐ญ๐ฅ๐๐งชโ๐๐โโ๐งญ๐ค ๐๐๐ช๐๐ฅ๐ฒ๐๐๐ชถ๐๐ด๐ฅ๐ดโ",
  "๐๐ฅ๐ธ๐จ๐ป๐จโ๐ท๐งโคโณ๐ ๐ง โ๐๐ฆท๐ฆ๐๐ก๐๐๐ก๐ฉ๐ง๐งฒ๐๐งค๐ต๐๐ต๐๐โ๐ฒ๐๐ฉ",
  "๐๐พโ๐ถ๐งฉโข๐๐โ๐ฃ๐ฆ๐๐โโฝ๐งฆ๐ท๐ฅโญ๐ผโ๐๐๐ญ๐ก๐ช๐๐๐โ๐๐ง๐๐พ๐ง",
  // These emoji in the pile cause problems on Windows in browser
  "๐ชฒ", // Beetle
  "๐ช", // Screwdriver
].flatMap(s=> Array.from(s))

const doingTable = Array.from("๐ซ๐จโ๐ฏโโฌ=โโฆโฉ>โ๐โพโ โธ%๐โถยฑโโปโชโโโฎโใฐโด๐๐โโฌ")
.concat([
  "(๐บ๐ฉ๐ต)", "([ ][ ])", "(โโโ)", "(>|<)"
])

const randomIndex = <T extends unknown>(table: T[]) => random(1, table.length) -1

const pick = (table: string[]) => {
  return table.at(randomIndex(table)) as string
}

const uniqFill = <T extends unknown>(size: number, func: () => T) => {
  let arr: T[] = []
  while(arr.length < size) {
    arr.push(...range(0, size - arr.length).map(_ => func()))
    arr = uniq(arr)
  }
  return arr
}

const makeBeing = () => uniqFill(5, () => pick(beingTable))
const makeDoing = () => uniqFill(3, () => pick(doingTable) + " " + pick(beingTable))

function App() {
  const [being, setBeing] = useState(makeBeing())
  const [doing, setDoing] = useState(makeDoing())
  const newCharacter = () => {
    setBeing(makeBeing())
    setDoing(makeDoing())
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">๐๐ฆ</div>
        <ul>
          <li>{being.map(s=><span key={s}>{s}</span>)}</li>
          {doing.map((arr, i) => <li key={i}>{arr}</li>)}
        </ul>
        <button onClick={newCharacter}>
        ๐โ
        </button>
        <a style={{marginTop: "2em"}} href="https://penguinking.com/rotate-bird/">ยฉ๐ง๐</a>
      </header>
    </div>
  )
}

export default App;
