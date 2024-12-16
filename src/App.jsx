import { NextUIProvider } from '@nextui-org/react'
import { Route, Routes, useNavigate, useHref } from 'react-router-dom'

import Layout from './Layout.jsx'
import Home from './Home.jsx'
import Amis from './Amis.jsx'
import X6 from './X6.jsx'
import Dataset from './Dataset.jsx'
import GDP from './GDP.jsx'
import Echarts from './Echarts.jsx'
import JsonUi from './JsonUi.jsx'

export default function App() {

  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <Routes>
        <Route path="/" Component={Layout} >
          <Route index Component={Home} />
        </Route>
        <Route path="/x6" Component={Layout} >
          <Route index Component={X6} />
        </Route>
        <Route path="/echarts" Component={Layout} >
          <Route index Component={Echarts} />
        </Route>
        <Route path="/echarts-dataset" Component={Layout} >
          <Route index Component={Dataset} />
        </Route>
        <Route path="/gdp" Component={Layout} >
          <Route index Component={GDP} />
        </Route>
        <Route path="/amis" Component={Layout} >
          <Route index Component={Amis} />
        </Route>
        <Route path="/json-ui" Component={Layout} >
          <Route index Component={JsonUi} />
        </Route>
      </Routes>
    </NextUIProvider>
  )
}