import okxWeb3 from '@okwallet/extension'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [wallet, setWallet] = useState()
  const [okxInstalled, setOkxInstalled] = useState(false)

  const success = (wallet) => {
    // return wallet account information
    console.log(wallet)
    setWallet(wallet)
    setOkxInstalled(true)
    window.my_modal_1.showModal()
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
    if (typeof window.okxwallet !== 'undefined') {
      setOkxInstalled(true)
    }

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

  let btnText = ''
  if (!okxInstalled) btnText = 'Install OKX Wallet'
  else if (okxInstalled && !wallet) btnText = 'Connect'
  else if (okxInstalled && wallet) btnText = 'Connected'
  return (
    <>
      <div className=''>
        {/* <button className='btn' onClick={() => window.my_modal_1.showModal()}>
          open modal
        </button> */}
        <dialog id='my_modal_1' className='modal h-max'>
          <form method='dialog' className='modal-box bg-[#9d5c3e]'>
            <h3 className='font-bold text-lg'>BIG BENISES ONLY</h3>
            <button
              className='btn w-full bg-[#71422d] text-[#f4e89c] font-bold text-[28px]'
              onClick={() =>
                window.open(
                  'https://www.okx.com/es-la/web3/dex-swap#inputChain=1&inputCurrency=ETH&outputChain=1&outputCurrency=0x59c6766de1dc50a9c9db86cb0461b5ce07408ab7',
                  '_blank'
                )
              }>
              BUY $SPURDO
            </button>
            {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
            <div className='modal-action'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn'>Close</button>
            </div>
          </form>
        </dialog>
        <button
          onClick={() => {
            if (!okxInstalled)
              window.open(
                'https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge/',
                '_blank'
              )
            else if (!wallet) connectWallet()
            // else disconnectWallet()
            else window.my_modal_1.showModal()
          }}
          className='bg-[#71422d] text-[#f4e89c] font-bold text-[28px]'>
          {btnText}
        </button>
      </div>
    </>
  )
}

export default App
