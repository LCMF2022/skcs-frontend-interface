import FullLoading from 'components/FullLoading'
import WalletListModal from 'components/WalletListModal'
import Web3ReactManager, { getLibrary } from 'components/Web3ReactManager'
import AppLayout from 'layouts/AppLayout'
import NotFound from 'pages/error'
import Home from 'pages/home/'
import DeFiMarket from 'pages/defimarket'
import Staking from 'pages/staking'
import Test from 'pages/test'
import React, { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useFetchPoolsPublicData } from 'state/hooks'
import { useConnectWalletModalShow } from 'state/wallet/hooks'
import { getPoolAprList } from 'utils/getAprList'
import { useSortedPools } from '../state/hooks'

export default function App() {
  const walletListModalShow = useConnectWalletModalShow()

  useFetchPoolsPublicData()

  const pools = useSortedPools()
  useEffect(() => {
    setTimeout(() => {
      getPoolAprList()
    }, 100)
  }, [])

  return (
    <Suspense fallback={<FullLoading />}>
      <Web3ReactManager getLibrary={getLibrary}>
        <AppLayout>
          <WalletListModal visible={walletListModalShow} />
          <Switch>
            <Route path="/home" exact={true} component={Home} />
            <Route path="/staking" exact={true} component={Staking} />
            <Route path="/defi-market" exact={true} component={DeFiMarket} />
            <Route path="/" exact={true}>
              <Redirect to="/home" />
            </Route>
            <Route path="*" component={NotFound} />
          </Switch>
        </AppLayout>
      </Web3ReactManager>
    </Suspense>
  )
}
