import { Binary, TxCallData, TxFinalizedPayload } from "polkadot-api"
import { addressOf, addressOfSubstrate, publicKeyOf, toMultiAddress } from "../config/account"
import { Chain, magicApi } from "../config/api"
import { callAsProxy, createProxy, transferKeepAlive} from "../config/calls"


// Westend use SS58 address 42
const publicKey = publicKeyOf(process.env.PRIVATE_KEY)
const myAccount = addressOfSubstrate(publicKey)
console.log('My signer account:', myAccount)

const myDelegatePublicKey = publicKeyOf(process.env.DELEGATE_PRIVATE_KEY)
const myDelegateAddress = addressOfSubstrate(myDelegatePublicKey)
const { api, disconnect } = magicApi('west')
console.log('My delegate address:', myDelegateAddress)

// 0. convert to myAccount and my delegate multi address
const myMultiAddress = toMultiAddress(myAccount)
const myDelegateMultiAddress = toMultiAddress(myDelegateAddress)

const myReceiverMultiAddress = toMultiAddress('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY')
// 1. setup proxy account for it to your own
// Make sure your signer account have enough funds
const proxySetup = createProxy({ api }, myDelegateMultiAddress)

// 2. get transfer decoded call
const transferCall = transferKeepAlive({ api }, myReceiverMultiAddress, BigInt(1))

// 3. call as proxy with delegate signer 
const transferProxy = callAsProxy({ api }, { address: myMultiAddress, call: transferCall })

// disconnect();