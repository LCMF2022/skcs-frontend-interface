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
        <title>{t('HOME_62')}</title>
        <meta name="description" content={t('HOME_63')} />
        <meta name={t('STAKE_86')} content={t('HOME_64')} />
        <meta name="twitter:description" content={t('HOME_63')} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('HOME_62')} />
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
