import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarBrand
} from '@nextui-org/react'
import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {

  const location = useLocation();

  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <NavbarItem>
            <Link href="/" className={`text-lg text-purple-700 font-bold hover:font-bold`}>
              Demo
            </Link>
          </NavbarItem>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>
            <Link href="/x6" className={`text-lg hover:font-bold ${location.pathname === '/x6' ? 'font-bold' : ''}`}>
              x6绘图
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/echarts" className={`text-lg hover:font-bold ${location.pathname === '/echarts' ? 'font-bold' : ''}`}>
              ECharts图表
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/echarts-dataset" className={`text-lg hover:font-bold ${location.pathname === '/echarts-dataset' ? 'font-bold' : ''}`}>
              ECharts数据集
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/gdp" className={`text-lg hover:font-bold ${location.pathname === '/gdp' ? 'font-bold' : ''}`}>
              ECharts-GDP
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/amis" className={`text-lg hover:font-bold ${location.pathname === '/amis' ? 'font-bold' : ''}`}>
              Amis数据驱动UI
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/json-ui" className={`text-lg hover:font-bold ${location.pathname === '/json-ui' ? 'font-bold' : ''}`}>
              自研JSON UI
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className='container p-4 flex justify-center mx-auto'>
        <Outlet />
      </main>
    </>
  )
}
