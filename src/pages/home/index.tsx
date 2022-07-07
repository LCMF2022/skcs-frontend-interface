import React from 'react'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchStakerPublicDataAsync } from 'state/staker'
import FAQTip from './components/FAQTip'
import FollowUs from './components/FollowUs'
import HomeBanner from './components/HomeBanner'
import StakeBenefit from './components/StakeBenefit'
import StakeProcess from './components/StakeProcess'
import StakeReward from './components/StakeReward'
import { useTranslation } from 'react-i18next'

const HomeWrap = styled.div`
  height: auto;
  min-height: calc(100vh - 320px);
  background: #000;
  padding-bottom: 160px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 0;
  }
`

const bannerBg = require('../../assets/images/home/banner.png').default
const bannerBgH5 = require('../../assets/images/home/banner-h5.png').default

const Banner = styled.div`
  box-sizing: border-box;
  height: 600px;
  width: 100%;
  background: url(${bannerBg}) bottom center no-repeat;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 768px) {
    background: url(${bannerBgH5}) bottom center no-repeat;
    height: 320px;
    background-size: contain;
  }
`

const FaqWarp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
`

const HomePage: React.FunctionComponent = () => {
  // const { isMobile, isTablet, isPC } = useResponsive()
  // const { t, i18n } = useTranslation()

  const { t } = useTranslation()
  const { account } = useWeb3React()
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    if (account) {
      dispatch(fetchStakerPublicDataAsync(account))
    }
  }, [account, dispatch])

  return (
    <>
      <Helmet>
        <title>KCS Staking | sKCS</title>
        <meta
          name="description"
          content="Stake KCS and get sKCS to accrue staking rewards over time and earn additional yields with high APY"
        />
        <meta name="keywords" content="KCS staking, sKCS, stake KCS" />
        <meta
          name="twitter:description"
          content="Stake KCS and get sKCS to accrue staking rewards over time and earn additional yields with high APY"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="KCS Staking | sKCS" />
      </Helmet>
      <HomeWrap>
        <HomeBanner />
        <StakeBenefit />
        <StakeProcess />
        <StakeReward />
        <FaqWarp>
          <FAQTip title={t('HOME_60')} desc={t('HOME_61')} />
          <FollowUs />
        </FaqWarp>
      </HomeWrap>
    </>
  )
}

export default HomePage
