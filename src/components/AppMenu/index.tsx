import { DownOutlined } from '@ant-design/icons'
import { Menu, Drawer } from 'antd'
import React, { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { KCC } from '../../constants/index'
import { MENU_LIST, NavItemChildrenType, NavItemGroupType, NavItemType } from '../../constants/menuList'
import { theme } from '../../constants/theme'
import { changeMobileMenuShow } from '../../state/application/actions'
import { useResponsive } from '../../utils/responsive'
import { useMobileMenuShow } from '../../state/application/hooks'
import Column from '../Column'
import { BrowserView, MobileView } from '../Common'
import Row, { RowBetween } from '../Row/index'
import './index.less'

export interface AppMenuProps {
  style?: CSSProperties
}

const MenuWrap = styled.div`
  margin-left: 40px;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    margin-left: 0px;
    position: absolute;
    top: 70px;
    left: 0px;
    width: 100%;
    margin-left: 0;
    background: #000;
  }
`

const { SubMenu } = Menu

const NavTitle = styled.span`
  font-family: 'Arial';
  font-size: 14px;
  color: #fff;
  letter-spacing: 0;
  text-align: center;
  padding: 0;
  margin: 0px;
`

const NavSubTitle = styled.div`
  opacity: 0.6;
  font-size: 12px;
  color: ${() => theme.colors.primary};
  letter-spacing: 0;
  text-align: center;
  padding: 0;
  margin: 0;
  width: auto;
  max-width: 245px;
  word-wrap: wrap;
  white-space: wrap !important;
  text-align: left;
`

const NavItemWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`

const NavIcon = styled.img`
  width: 32px;
  height: auto;
`

const TitleWrap = styled(Column)`
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 16px;
`

const Title = styled.div`
  color: #00d092;
  font-size: 16px;
  text-align: center;
  margin-top: 36px;
`

const NavItem: React.FunctionComponent<NavItemChildrenType> = (props) => {
  const { t, i18n } = useTranslation()
  const { isMobile } = useResponsive()

  const getNavRoute = (route: string) => {
    if (route === KCC.EXPLORER) {
      if (i18n.language === 'zh-CN') {
        return `${route}/cn`
      }
      return `${route}/en`
    }
    return route
  }

  const dispatch = useDispatch()

  const router = useHistory()

  const nav2Target = (route: string | undefined) => {
    if (route) {
      if (route.startsWith('/')) {
        router.push(route)
      }
      if (route.startsWith('http')) {
        const route1 = getNavRoute(route)
        window.open(route1, '_blank')
      }
      if (isMobile) {
        dispatch(changeMobileMenuShow({ show: false }))
      }
    }
  }

  return (
    <NavItemWrap onClick={nav2Target.bind(null, props.route)}>
      <NavIcon src={props.icon}></NavIcon>
      <TitleWrap>
        <NavTitle>{t(`${props.title}`)}</NavTitle>
        <NavSubTitle style={{ whiteSpace: 'normal' }}>{t(`${props.subTitle}`)}</NavSubTitle>
      </TitleWrap>
    </NavItemWrap>
  )
}

const AppMenu: React.FunctionComponent<AppMenuProps> = ({ style }) => {
  const { t, i18n } = useTranslation()

  const { isMobile } = useResponsive()

  const dispatch = useDispatch()

  const [openKeys, setOpenKeys] = React.useState<string[]>([])

  const show = useMobileMenuShow()

  const showSubMenu = (navItem: any) => {
    if (openKeys.length && openKeys[0] === navItem.name) {
      setOpenKeys(() => [])
    } else {
      setOpenKeys(() => [navItem.name])
    }
  }

  const getNavRoute = (route: string) => {
    if (route === KCC.EXPLORER) {
      if (i18n.language === 'zh-CN') {
        return `${route}/cn`
      }
      return `${route}/en`
    }
    return route
  }

  // mobile
  const renderMenu = (navItem) => {
    return (
      <NavLink
        onClick={() => {
          dispatch(changeMobileMenuShow({ show: false }))
        }}
        to={navItem.route.startsWith('http') ? { pathname: navItem.route } : getNavRoute(navItem.route)}
        key={navItem?.name}
        target={navItem.route.startsWith('http') ? '_blank' : '_self'}
        replace={navItem.route.startsWith('http') ? true : false}
      >
        <Title>{t(navItem?.name)}</Title>
      </NavLink>
    )
  }

  const genNavList = (navItem: NavItemType) => {
    // no children
    if (!navItem.hasChildren && navItem?.route) {
      if (navItem.route.startsWith('http') && typeof navItem.name === 'string') {
        return (
          <Menu.Item key={navItem.name}>
            <a
              onClick={() => {
                dispatch(changeMobileMenuShow({ show: false }))
              }}
              href={navItem.route}
              style={{ color: '#fff', position: 'relative', top: '-5px' }}
              target="_blank"
            >
              <NavTitle>{t(`${navItem.name}`)}</NavTitle>
            </a>
          </Menu.Item>
        )
      }

      return (
        <Menu.Item key={navItem.name}>
          <NavLink
            to={getNavRoute(navItem.route)}
            onClick={() => {
              dispatch(changeMobileMenuShow({ show: false }))
            }}
            activeClassName="selected"
            style={{ color: theme.colors.primary, cursor: 'pointer', position: 'relative', top: '-5px' }}
          >
            <NavTitle>{t(`${navItem.name}`)}</NavTitle>
          </NavLink>
        </Menu.Item>
      )
    }

    // has children & not group menu
    if (navItem?.hasChildren && !navItem?.hasGroup) {
      const subMenuList = navItem.childrens as NavItemChildrenType[]

      const lists = subMenuList?.map((item) => {
        return (
          <Menu.Item key={item.title} style={{ height: 'auto', lineHeight: '25px', color: theme.colors.primary }}>
            <NavItem {...item} setOpenKeys={setOpenKeys} />
          </Menu.Item>
        )
      })

      return (
        <SubMenu
          key={navItem.name}
          className="sub-menu"
          title={
            <Row style={{ alignItems: 'center' }} onClick={showSubMenu.bind(null, navItem)}>
              <NavTitle>
                {t(`${navItem.name}`)}{' '}
                <DownOutlined className="arrow-icon" style={{ fontSize: '10px', paddingTop: '-6px' }} />
              </NavTitle>
            </Row>
          }
        >
          {lists}
        </SubMenu>
      )
    }

    // gourp menu &  has children
    if (navItem?.hasGroup) {
      const groupList = navItem.childrens as NavItemGroupType[]
      const groupDom = groupList?.map((group, index) => {
        const groupMember = group.groupMember

        const groupItemDom = groupMember.map((groupChild) => {
          return (
            <Menu.Item key={groupChild.title} style={{ height: 'auto', lineHeight: '25px' }}>
              <NavItem {...groupChild} setOpenKeys={setOpenKeys} />
            </Menu.Item>
          )
        })

        return (
          <Menu.ItemGroup key={index} title={<NavTitle>{t(`${group.groupName}`)}</NavTitle>}>
            {groupItemDom}
            {groupList.length - 1 !== index ? (
              <RowBetween>{/*    <DivideLine style={{ background: ' #F1F4F7', margin: '12px' }} /> */}</RowBetween>
            ) : null}
          </Menu.ItemGroup>
        )
      })
      return (
        <SubMenu
          key={navItem.name}
          className="sub-menu"
          title={
            <Row style={{ alignItems: 'center' }} onClick={showSubMenu.bind(null, navItem)}>
              <NavTitle>
                {t(`${navItem.name}`)}{' '}
                <DownOutlined className="arrow-icon" style={{ fontSize: '10px', paddingTop: '-10px' }} />
              </NavTitle>
            </Row>
          }
        >
          {groupDom}
        </SubMenu>
      )
    }

    return null
  }

  const MenuListDom = MENU_LIST.map((item) => {
    return genNavList(item)
  })

  React.useEffect(() => {
    if (isMobile) {
      setOpenKeys(() => ['Developers'])
    } else {
      setOpenKeys(() => [])
    }
  }, [isMobile])

  return (
    <MenuWrap>
      <MobileView>
        <Drawer
          placement={'left'}
          closable={false}
          onClose={() => {
            dispatch(changeMobileMenuShow({ show: false }))
          }}
          visible={show}
          key={'left'}
        >
          <>{MENU_LIST.map((item) => renderMenu(item))}</>
        </Drawer>
      </MobileView>
      <BrowserView>
        <Menu
          selectedKeys={[]}
          mode="horizontal"
          style={{ background: 'transparent', color: theme.colors.primary, border: 'none', ...style }}
        >
          {MenuListDom}
        </Menu>
      </BrowserView>
    </MenuWrap>
  )
}

export default AppMenu
