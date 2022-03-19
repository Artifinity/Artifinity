import { ethers } from 'ethers'

export const blockchainUtils = {
    isUserSignature: (nonce: string, signedMessage: string, userAddress: string): boolean => {
        const signerAddress = ethers.utils.verifyMessage(nonce, signedMessage).toLowerCase()
        return signerAddress === userAddress.toLowerCase()
    }
}
