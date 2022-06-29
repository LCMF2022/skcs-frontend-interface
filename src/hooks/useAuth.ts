import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { connectorLocalStorageKey } from '../constants/wallet'
import { ConnectorNames, connectorsByName, injected } from '../connectors'
import { updateErrorInfo } from '../state/wallet/actions'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import i18next from 'i18next'
import StyledNotification from 'components/StyledNotification'

/*  */
const useAuth = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { activate, deactivate } = useWeb3React()

  const login = useCallback((connectorID: ConnectorNames) => {
    console.log('connectorID', connectorID)

    const connector = connectorsByName[connectorID]
    if (connector) {
      dispatch(updateErrorInfo({ hasError: false, errorInfo: '' }))
      window.localStorage.removeItem(connectorLocalStorageKey)
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          // error modal
          dispatch(updateErrorInfo({ hasError: true, errorInfo: 'Unsupported Network' }))
        } else if (error instanceof NoEthereumProviderError) {
          StyledNotification.error({
            message: i18next.t('Provider Error'),
            description: i18next.t('No provider was found'),
          })
          dispatch(updateErrorInfo({ hasError: true, errorInfo: 'Provider Error' }))
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          if (connector instanceof WalletConnectConnector) {
            const walletConnector = connector as WalletConnectConnector
            walletConnector.walletConnectProvider = undefined
          }
          StyledNotification.error({
            message: i18next.t('Authorization Error'),
            description: i18next.t('Please authorize to access your account'),
          })
          dispatch(updateErrorInfo({ hasError: true, errorInfo: 'Authorization Error' }))
        } else {
          StyledNotification.error({
            message: i18next.t(`Unknown error`),
            description: i18next.t(`${error.message}`),
          })
          dispatch(updateErrorInfo({ hasError: true, errorInfo: t(`Unknown error`) }))
        }
      })
    } else {
      StyledNotification.error({
        message: i18next.t("Can't find connector"),
        description: i18next.t('The connector config is wrong'),
      })
      dispatch(updateErrorInfo({ hasError: true, errorInfo: "Can't find connector" }))
    }
  }, [])

  return { login, logout: deactivate }
}

export default useAuth
