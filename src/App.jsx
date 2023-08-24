import './App.css'

import okxWeb3 from '@okwallet/extension'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [wallet, setWallet] = useState()

  const success = (wallet) => {
    // return wallet account information
    console.log(wallet)
    setWallet(wallet)
  }
  const changed = (wallet) => {
    // return wallet account information
    // if there is no wallet is connecting, it will be null
    console.log(wallet)
  }
  const error = (error) => {
    // Error returned when rejected
    console.error(error)
  }
  const uninstall = () => { }

  const connectWallet = () => {
    okxWeb3
      .init({
        success,
        changed,
        error,
        uninstall,
      })
      .then((wallet) => {
        // return wallet account information
        console.log(wallet)
      })
      .catch((error) => {
        // Error returned when rejected
        console.error(error)
      })
  }

  const disconnectWallet = () => {
    okxWeb3.disconnect()
    setWallet(null)
  }

  useEffect(() => {
    okxWeb3.addListener('connect', (isConnected) => {
      console.log(isConnected) // boolean
    })

    okxWeb3.addListener('disconnect', () => { })

    okxWeb3.addListener('connectWallet', (wallet) => {
      console.log(wallet)
      // [
      //   {
      //     keyringName: 'WalletA',
      //     name: 'Account01',
      //     address: [
      //       {
      //         address: '0x81Fc6F6E44a2313743bCAA060681d24597aDbDfB',
      //         coinType: '60',
      //         name: 'okc',
      //       }
      //     ]
      //   }
      //   ...
      // ]
    })

    okxWeb3.addListener('walletChanged', (wallet) => {
      console.log(wallet)
    })

    okxWeb3.addListener('accountChanged', (wallet) => {
      console.log(wallet)
    })

    okxWeb3.addListener('networkChanged', (chainId) => {
      console.log(chainId)
    })

    okxWeb3.addListener('streamFailed', () => { })

    return () => {
      okxWeb3.removeListener('connect', (isConnected) => {
        console.log(isConnected) // boolean
      })

      okxWeb3.removeListener('disconnect', () => { })

      okxWeb3.removeListener('connectWallet', (wallet) => {
        console.log(wallet)
        // [
        //   {
        //     keyringName: 'WalletA',
        //     name: 'Account01',
        //     address: [
        //       {
        //         address: '0x81Fc6F6E44a2313743bCAA060681d24597aDbDfB',
        //         coinType: '60',
        //         name: 'okc',
        //       }
        //     ]
        //   }
        //   ...
        // ]
      })

      okxWeb3.removeListener('walletChanged', (wallet) => {
        console.log(wallet)
      })

      okxWeb3.removeListener('accountChanged', (wallet) => {
        console.log(wallet)
      })

      okxWeb3.removeListener('networkChanged', (chainId) => {
        console.log(chainId)
      })

      okxWeb3.removeListener('streamFailed', () => { })
    }
  }, [])

  return (
    <>
      <div className='card'>
        <button
          onClick={() => {
            if (!wallet) connectWallet()
            else disconnectWallet()
          }}>
          {wallet ? 'Disconnect wallet' : 'Connect'}
        </button>
      </div>
    </>
  )
}

export default App
