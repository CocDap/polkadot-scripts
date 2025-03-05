import { process } from "std-env"
import { ApiPromise, CHAIN, Chain, magicApi } from "./api"
import { Binary, Enum, Transaction, TxCallData, TxFinalizedPayload } from "polkadot-api"
import { buildAccountSigner, buildAccountDelegateProxySigner, toMultiAddress } from "./account"
import { MultiAddress } from "@polkadot-api/descriptors"


export function createProxy({ api }: ApiPromise, delegate: MultiAddress){

	api.tx.Proxy.add_proxy({
		delegate: delegate, proxy_type: {
			type: 'Any',
			value: undefined
		} as Enum<{ Any: undefined; NonTransfer: undefined; Governance: undefined; Staking: undefined; SudoBalances: undefined; IdentityJudgement: undefined; CancelProxy: undefined; Auction: undefined; NominationPools: undefined; ParaRegistration: undefined; }>, delay: 0
	}).signAndSubmit(buildAccountSigner())
}

type ProxyParams = {
	address: MultiAddress
	call: TxCallData

}
export function callAsProxy({ api }: ApiPromise, params: ProxyParams) {

	api.tx.Proxy.proxy({
		real: params.address,
		call: params.call,
		force_proxy_type: {
			type: 'Any',
			value: undefined
		} as Enum<{ Any: undefined; NonTransfer: undefined; Governance: undefined; Staking: undefined; SudoBalances: undefined; IdentityJudgement: undefined; CancelProxy: undefined; Auction: undefined; NominationPools: undefined; ParaRegistration: undefined; }>
	}).signAndSubmit(buildAccountDelegateProxySigner())
}


export function transferKeepAlive({ api }: ApiPromise, to: MultiAddress, amount: bigint) : TxCallData{

	return api.tx.Balances.transfer_keep_alive({
		dest: to,
		value: amount
	}).decodedCall
}