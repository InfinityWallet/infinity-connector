import { DeepLinker } from './deep-linker'

interface InfinityWalletEthereumProvider {
  isInfinityWallet?: boolean;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeAllListeners(event?: string | symbol): this;
}

interface Window {
  ethereum?: InfinityWalletEthereumProvider;
}

/**
 * Returns a Promise that resolves to the value of window.ethereum if it is
 * set within the given timeout, or null.
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param options - Options bag.
 * @param options.mustBeInfinityWallet - Whether to only look for InfinityWallet providers.
 * Default: false
 * @param options.silent - Whether to silence console errors. Does not affect
 * thrown errors. Default: false
 * @param options.timeout - Milliseconds to wait for 'ethereum#initialized' to
 * be dispatched. Default: 3000
 * @returns A Promise that resolves with the Provider if it is detected within
 * given timeout, otherwise null.
 */
export function detectEthereumProvider<T = InfinityWalletEthereumProvider>({
  mustBeInfinityWallet = false,
  silent = false,
  timeout = 3000,
} = {}): Promise<T | null> {

  _validateInputs();

  let handled = false;

  return new Promise((resolve) => {
    if ((window as Window).ethereum) {

      handleEthereum();

    } else {

      window.addEventListener(
        'ethereum#initialized',
        handleEthereum,
        { once: true },
      );

      setTimeout(() => {
        handleEthereum();
      }, timeout);
    }

    function handleEthereum() {

      if (handled) {
        return;
      }
      handled = true;

      window.removeEventListener('ethereum#initialized', handleEthereum);

      const { ethereum } = window as Window;

      if (ethereum && (!mustBeInfinityWallet || ethereum.isInfinityWallet)) {
        resolve(ethereum as unknown as T);
      } else {

        const message = mustBeInfinityWallet && ethereum
          ? 'Non-InfinityWallet window.ethereum detected.'
          : 'Unable to detect window.ethereum.';

        !silent && console.error('@InfinityWallet/infinity-connector:', message);
        resolve(null);
      }
    }
  });

  function _validateInputs() {
    if (typeof mustBeInfinityWallet !== 'boolean') {
      throw new Error(`@InfinityWallet/infinity-connector: Expected option 'mustBeInfinityWallet' to be a boolean.`);
    }
    if (typeof silent !== 'boolean') {
      throw new Error(`@InfinityWallet/infinity-connector: Expected option 'silent' to be a boolean.`);
    }
    if (typeof timeout !== 'number') {
      throw new Error(`@InfinityWallet/infinity-connector: Expected option 'timeout' to be a number.`);
    }
  }
}


/**
 * Handle for when no Ethereum Provider is present on the window. In case it has InfinityWallet
 * installed, it will use deeplink to open the current on the wallet dapp explorer. In case it's
 * not installed, it will go to wallet's download page.
 *
 * @param hostname - Hostname of the dapp.
 */
export function openInfinityWallet(hostname){
    const linker = new DeepLinker({
          onIgnored: function() {
            window.open("https://infinitywallet.io/download")
      }
    });
	if(hostname.includes('://'))
		hostname = hostname.split('://')[1]
    linker.openURL("infinity:?dapp="+hostname);
}
