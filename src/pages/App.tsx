import { useSafeAppConnection, SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react'
import FullLoading from 'components/FullLoading'
import WalletListModal from 'components/WalletListModal'
import Web3ReactManager, { getLibrary } from 'components/Web3ReactManager'
import { useStakeApr } from 'hooks/useStakerApr'
import AppLayout from 'layouts/AppLayout'
import DeFiMarket from 'pages/defimarket'
import NotFound from 'pages/error'
import Home from 'pages/home/'
import Staking from 'pages/staking'
import { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useFetchStakerPublicData } from 'state/hooks'
import { useConnectWalletModalShow } from 'state/wallet/hooks'
import { useFetchPriceList } from 'utils/prices'

const safeMultisigConnector = new SafeAppConnector()

export default function App() {
  useFetchStakerPublicData()
  useFetchPriceList()
  useStakeApr()

  const walletListModalShow = useConnectWalletModalShow()

  const triedToConnectToSafe = useSafeAppConnection(safeMultisigConnector)

  useEffect(() => {
    if (triedToConnectToSafe) {
      // fallback to other providers
      console.log('failed load gnosis')
    }
  }, [triedToConnectToSafe])

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
