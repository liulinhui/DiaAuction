/**
 * Created with IntelliJ IDEA.
 * User: liulinhui
 * Date: 2020/8/3
 * Time: 01:15
 * Description:
 */

const Web3 = require('web3');
const TX = require('ethereumjs-tx');
const d = require('domain').create();

class Auction {
    constructor(config) {
        let web3j = new Web3(new Web3.providers.HttpProvider(config.endpoint));
        web3j.eth.defaultAccount = config.address;
        this.web3 = web3j;
        this.config = config
        this.exchangeContract = new web3j.eth.Contract(config.abi, config.exchangeContractAddress);
    }

    hasToken(tokenAddress, cb) {
        this.exchangeContract.methods.hasToken(tokenAddress).call()
            .then(function (obj) {
                cb(null, obj)
            })
            .catch(error => {
                cb(error)
            })
    }

    tokenAddressToIdMap(tokenAddress, cb) {
        this.exchangeContract.methods.tokenAddressToIdMap(tokenAddress).call()
            .then(function (obj) {
                cb(null, obj)
            })
            .catch(error => {
                cb(error)
            })
    }

    /** @dev A user facing function used to place limit sell orders in auction with expiry defined by batchId
     * @param buyToken 购买的tokenID 这里需要是dia
     * @param sellToken 卖出的tokenID 这里需要是weth
     * @param validUntil 交易持续的周期  到第几轮结束
     * @param buyAmount 最小购买量 dia
     * @param sellAmount 最大卖出量 weth
     * @param cb 回掉函数
     * @return orderId 返回用户的所有交易ID
     *
     */
    placeOrder(buyToken, sellToken, validUntil, buyAmount, sellAmount, cb) {
        let self = this;
        let buyAmountValue = self.web3.utils.numberToHex(self.web3.utils.toWei(buyAmount));
        let sellAmountValue = self.web3.utils.numberToHex(self.web3.utils.toWei(buyAmount));
        const contractFunction = self.exchangeContract.methods.placeOrder(buyAmount, sellAmount, validUntil, buyAmountValue, sellAmountValue)
        const functionAbi = contractFunction.encodeABI();
        let txValue = self.web3.utils.numberToHex(self.web3.utils.toWei('0', 'ether'));
        let nonce;
        let estimatedGas;
        console.log("Getting gas estimate");
        contractFunction.estimateGas({
            from: self.config.account.address,
        }).then((gasAmount) => {
            estimatedGas = gasAmount.toString(16);
            console.log("Estimated gas: " + gasAmount);
            self.web3.eth.getTransactionCount(account).then(_nonce => {
                nonce = _nonce.toString(16);
                console.log("Nonce: " + nonce);
                self.web3.eth.getGasPrice(function (error, result) {
                    if (error) {
                        console.log('获取GasPrice失败', error);
                        return cb(error)
                    }
                    console.log('Gas Price: ' + result);
                    result = parseInt(result);
                    const txParams = {
                        gasPrice: self.web3.utils.numberToHex(Number(result + result * 0.8)),
                        gasLimit: self.web3.utils.numberToHex(1000000),
                        to: self.config.exchangeContractAddress,
                        data: functionAbi,
                        from: self.config.account.address,
                        value: txValue,
                        nonce: '0x' + nonce,
                    };
                    console.log('txParams=', JSON.stringify(txParams));
                    const tx = new TX(txParams);
                    tx.sign(self.config.account.privateKey);
                    const serializedTx = tx.serialize();
                    self.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                        .on('receipt', console.log);
                    return cb(null, 'success');
                });
            }).catch(error => {
                console.log('获取nonce失败', error);
                return cb(error)
            });
        }).catch(error => {
            console.log('获取Estimated gas 失败', error);
            return cb(error)
        });
    }

    /**
     * 获取当前周期
     * @param cb
     */
    getCurrentBatchId(cb) {
        this.exchangeContract.methods.getCurrentBatchId().call()
            .then(function (obj) {
                cb(null, obj)
            })
            .catch(error => {
                cb(error)
            })
    }
}

module.exports = Auction

