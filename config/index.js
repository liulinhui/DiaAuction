/**
 * Created with IntelliJ IDEA.
 * User: liulinhui
 * Date: 2020/8/3
 * Time: 01:15
 * Description:
 */

module.exports = {
    abi: require('./BatchExchange.json'), //abi文件
    endpoint: 'https://mainnet.infura.io/v3/12c3f7a597904e8ba58247acfde9545a',  //infra接口地址
    exchangeContractAddress: '0x6F400810b62df8E13fded51bE75fF5393eaa841F',  //gnosis dex交易所合约地址
    diaTokenAddress: '0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419',
    tokenList: {
        weth: 1,
        dia: 79,
        tusd: 3,
    },
    account: {
        privateKey: 'ca29d3de0dec8a67153c72b7a6939c16f45005e090acf9f1ea6c81b155b4009b', //用户私钥
        address: '0xE9C6F61b80505b211027955Df0D45F9C12009da4', //用户地址
    },
    auction: {
        buyAmount: '11',
        sellAmount: '11',
        batchLast: 100  //订单存留周期  5分钟一个周期
    }
}
